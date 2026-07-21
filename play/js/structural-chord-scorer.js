/**
 * PHASE C — Structural Chord Suggestion Scorer (DRAFT, unwired)
 * ---------------------------------------------------------------
 * Confirmed against real code, this round:
 * - getExpectedFunctionAt is NOT a bare global -- it's a method,
 *   ORUMI_CATALOG.structure.getExpectedFunctionAt(markers, beat), which uses
 *   this.getActiveMarkerAt internally. Same bug class as classifyProgression
 *   turned out to have. Fixed below: called via ORUMI_CATALOG.structure.
 * - classifyProgression is now ORUMI_CATALOG.harmonicClassification.
 *   classifyProgression, relocated there in Phase C prep. It's also a method
 *   (uses this.getActiveKeyAt, this.chordRootPc, etc. internally) -- calling
 *   it detached from harmonicClassification would silently break every
 *   internal this.xxx call. Rather than push a "remember to .bind() it"
 *   requirement onto whoever wires this in, this file just calls it through
 *   ORUMI_CATALOG.harmonicClassification directly (same reasoning as
 *   getExpectedFunctionAt above) instead of accepting it as an injected
 *   parameter -- one less footgun, one less thing the caller has to get
 *   right.
 * - getExpectedFunctionAt(markers, beat) does NOT return a bare function
 *   name string -- it returns { boundary, valid, default, actual, feign }.
 *   `actual` is what the arranger explicitly set on that marker (or null if
 *   they didn't); `default` is the boundary's baseline expectation when
 *   nothing was explicitly set. The scorer needs actual || default, not the
 *   whole object -- verified this by testing against the real function with
 *   two markers forming a valid boundary pair (return->tag) and seeing what
 *   came back, rather than assuming the shape from the name alone.
 * - getExpectedFunctionAt wants a BEAT (a musical beat position), not a
 *   progression-array index. Those only coincide when every chord is
 *   exactly 1 beat long -- confirmed they diverge for any progression with
 *   real, non-uniform durations (which DS-authored chords already have --
 *   we saw durationBeats: 0.5 earlier this session). So `position` (an
 *   array index, needed for progression.slice() when reconstructing a
 *   candidate's classification) and `beat` (needed for the structural
 *   lookup) are now two separate parameters -- silently reusing one for the
 *   other would ask about the wrong point in the song without erroring.
 * - Root identity is a NAME STRING (e.g. "F", "Bb"), not an integer 0-11 --
 *   confirmed via ORUMI_CATALOG.pitchClasses / numberToPitchClass, and how
 *   classifyProgression and Chord Factory's chordPitchClasses() both key off
 *   chord.root. generateChordCandidates now iterates
 *   ORUMI_CATALOG.numberToPitchClass (the 12 real names) instead of 0-11.
 * - Quality vocabulary: 17 real names (not 15 -- corrected a miscount that
 *   had propagated through earlier in this conversation; Object.keys()
 *   against the real object confirms 17), now living at
 *   ORUMI_CATALOG.harmonicClassification.chordQualityIntervals since the
 *   Phase C prep relocation. Chord Factory's own `qualities` object has the
 *   same 17 names in a different shape ({label, symbol, intervals} vs a bare
 *   interval array) -- either works as a source of the name strings, since
 *   that's all the scorer needs, but don't assume the shape if this code
 *   ever needs interval data directly.
 * - There is no standalone pairwise classifier. classifyProgression(progression)
 *   takes the ENTIRE progression array, walks it with running state
 *   (establishedTonicsSeen, recentPairs, getActiveKeyAt), and returns a
 *   parallel `results` array (results[0] is always null). So scoring one
 *   candidate chord means building a temporary progression --
 *   [...progression.slice(0, position), candidate] -- classifying THAT, and
 *   reading its last entry. Handled below in classifyCandidateTransition().
 * - Pin compatibility: there is no reusable pinFitsQuality(root, quality).
 *   Chord Factory's real pinFitsCurrentQuality(midi) checks one MIDI note
 *   against CF's own currently-selected chord (selectedRoot/selectedQuality
 *   globals) -- it doesn't generalize to an arbitrary candidate. The real
 *   reusable primitive is chordPitchClasses(rootName, qualityKey) (returns
 *   an array of pitch-class numbers) plus CF's voicePins object
 *   ({ [laneId]: { midi, displayName } }). buildPinCompatibilityCheck()
 *   below builds the (root, quality) => boolean function the scorer needs,
 *   from those two real pieces -- this is what CF's wiring code should call,
 *   not something that already exists to just plug in.
 *
 * THE ONE REAL DESIGN DECISION THIS FILE MAKES (still open, still a guess):
 * -----------------------------------------------------------------
 * FUNCTION_TO_CLASSIFIER_AFFINITY bridges structural functions to harmonic
 * categories. The affinity numbers (including the Modulate column) are a
 * first draft grounded in classifyProgression's real trigger conditions and
 * ORUMI_CATALOG.structure's real function definitions -- better-grounded
 * than a pure guess, but still unverified against any real arrangement.
 * Treat as something to argue with, not a conclusion.
 */

// Confirmed exact match against classifyProgression()'s output strings,
// plus the eighth outcome: "Modulate", triggered by a chord carrying a
// .modulation marker. Any code that checks category membership needs to
// account for this eighth case or it'll silently mishandle modulating
// candidates.
const CLASSIFIER_CATEGORIES = [
  'Solid', 'Activated', 'Resolved', 'Shadowed', 'Returned', 'Kindred', 'Tinted', 'Modulate'
];

// Confirmed against ORUMI_CATALOG.structure.transitionFunctions -- these are
// lowercase in the real catalog, unlike CLASSIFIER_CATEGORIES which are
// capitalized. Getting this wrong means getExpectedFunctionAt()'s return
// value silently fails to match FUNCTION_TO_CLASSIFIER_AFFINITY's keys below.
const STRUCTURAL_FUNCTIONS = [
  'bloom', 'escalate', 'settle', 'homecoming', 'suspend'
];

/**
 * Bridge table: how well does each harmonic transition category serve each
 * structural function? Scale: 0 (wrong feeling entirely) to 1 (textbook
 * match). Grounded in the real trigger conditions this round:
 *
 * - bloom ("low-stakes opening, minimal harmonic tension") -- Solid is the
 *   textbook match (stable/low-tension is Solid's own definition). Activated
 *   scores LOW here (it explicitly introduces dominant-function pull, the
 *   opposite of minimal tension) -- this flips an earlier wrong guess.
 * - escalate ("builds density/tension, rising energy") -- Activated leads,
 *   Shadowed and Tinted support (unresolved/colored both read as tension).
 * - settle ("resolution, not the final one") -- Resolved leads (its own
 *   definition is literally "resolves as expected"), Solid supports.
 * - homecoming ("return... recognition") -- Returned leads, not Resolved --
 *   Returned's own trigger condition ("tonic, already established earlier")
 *   is almost verbatim Homecoming's definition. This flips an earlier wrong
 *   guess that had Resolved on top.
 * - suspend ("held or vamping, sustained tension without building further")
 *   -- Activated scores high for a DIFFERENT reason than on escalate:
 *   Activated's own trigger condition explicitly includes a vamp-repeat
 *   clause ("previous chord was dominant and this is a vamp-repeat back to
 *   it"), which is literally a held/vamping scenario. Kindred and Shadowed
 *   also support (staying in the same harmonic area / unresolved tension
 *   held, not advanced).
 */
const FUNCTION_TO_CLASSIFIER_AFFINITY = {
  bloom:      { Solid: 0.9, Kindred: 0.6, Returned: 0.4, Resolved: 0.4, Tinted: 0.3, Shadowed: 0.2, Modulate: 0.1, Activated: 0.1 },
  escalate:   { Activated: 1.0, Shadowed: 0.7, Tinted: 0.6, Modulate: 0.6, Kindred: 0.3, Returned: 0.2, Solid: 0.1, Resolved: 0.1 },
  settle:     { Resolved: 0.9, Solid: 0.6, Returned: 0.5, Kindred: 0.3, Tinted: 0.2, Shadowed: 0.1, Activated: 0.05, Modulate: 0.05 },
  homecoming: { Returned: 1.0, Resolved: 0.6, Solid: 0.4, Kindred: 0.2, Tinted: 0.1, Shadowed: 0.0, Activated: 0.0, Modulate: 0.0 },
  suspend:    { Activated: 0.8, Kindred: 0.7, Shadowed: 0.6, Tinted: 0.5, Modulate: 0.3, Returned: 0.2, Solid: 0.2, Resolved: 0.1 },
};

/**
 * Generates the full candidate space at a single progression position: all
 * 12 real root names x every quality name in `qualities`. Defaults to the
 * real 17-name vocabulary now living at
 * ORUMI_CATALOG.harmonicClassification.chordQualityIntervals, but accepts an
 * override (e.g. Chord Factory's own `qualities` object's keys) since both
 * are the same 17 names.
 */
function generateChordCandidates(
  qualities = Object.keys(ORUMI_CATALOG.harmonicClassification.chordQualityIntervals)
) {
  const candidates = [];
  for (const root of ORUMI_CATALOG.numberToPitchClass) {
    for (const quality of qualities) {
      candidates.push({ root, quality });
    }
  }
  return candidates;
}

/**
 * Builds the (root, quality) => boolean pin-compatibility check the scorer
 * needs, from Chord Factory's real primitives. Call this once per scoring
 * pass (voicePins doesn't change mid-pass) and hand the result to
 * generateStructuralChordSuggestions as pinFitsQuality.
 *
 * @param chordPitchClassesFn  Chord Factory's real chordPitchClasses(rootName, qualityKey)
 *                             => array of pitch-class numbers (0-11)
 * @param voicePins            Chord Factory's real voicePins object,
 *                             { [laneId]: { midi, displayName } }
 * @returns (root, quality) => boolean -- true if every pinned lane's note is
 *          actually in the candidate chord's pitch-class set. An unpinned
 *          lane (no entry, or non-finite midi) never blocks a candidate.
 */
function buildPinCompatibilityCheck(chordPitchClassesFn, voicePins) {
  return function pinFitsQuality(root, quality) {
    const candidatePcs = chordPitchClassesFn(root, quality);
    return Object.values(voicePins).every(pin => {
      if (!pin || !Number.isFinite(Number(pin.midi))) return true;
      const pc = ((Number(pin.midi) % 12) + 12) % 12;
      return candidatePcs.includes(pc);
    });
  };
}

/**
 * Classifies what a candidate chord WOULD be if placed at `position`.
 * There is no pairwise classifier -- classifyProgression() needs the whole
 * run (accumulated tonic state, active key per index) to produce a
 * meaningful label. So this builds a temporary progression up through the
 * candidate and reads off classifyProgression's last entry. Calls through
 * ORUMI_CATALOG.harmonicClassification directly (see file-level note above
 * on why this isn't an injected parameter).
 *
 * @param progression  the real progression so far (chords before `position`)
 * @param position     index the candidate would occupy
 * @param candidate     { root, quality } -- the hypothetical chord
 * @returns  one of CLASSIFIER_CATEGORIES, or null if position === 0
 *           (results[0] is always null -- nothing precedes the first chord)
 */
function classifyCandidateTransition(progression, position, candidate) {
  if (position === 0) return null;
  const tempProgression = [...progression.slice(0, position), candidate];
  const results = ORUMI_CATALOG.harmonicClassification.classifyProgression(tempProgression);
  const last = results[results.length - 1];
  return last ? last.stage : null;
}

/**
 * Scores one candidate at one position.
 *
 * @param candidate       { root, quality }
 * @param position        index into the progression array (for
 *                        reconstructing classification context via slice())
 * @param beat            the musical beat this candidate would start at --
 *                        NOT the same as `position`; see file header. Needed
 *                        for the structural-boundary lookup. Caller must
 *                        supply the real beat (e.g. from the chord this
 *                        candidate would replace, or the previous chord's
 *                        startBeat + durationBeats when appending).
 * @param progression     array of placed chords ({ root, quality, ... })
 * @param structuralMarkers  the project's marker array
 * @param pinFitsQuality  (root, quality) => boolean -- build with
 *                        buildPinCompatibilityCheck() above, don't reuse
 *                        Chord Factory's pinFitsCurrentQuality directly
 * @param options         { structuralWeight = 0.6, smoothnessWeight = 0.4 }
 */
function scoreStructuralChordCandidate(
  candidate,
  position,
  beat,
  progression,
  structuralMarkers,
  pinFitsQuality,
  options = {}
) {
  const { structuralWeight = 0.6, smoothnessWeight = 0.4 } = options;

  const reasons = [];

  // --- Harmonic transition classification ---
  // Rebuilds progression.slice(0, position) + candidate and classifies the
  // whole thing, since classifyProgression has no per-pair mode. Costly if
  // called once per candidate per position (12 roots x 17 qualities = 204
  // full re-classifications per position) -- worth profiling once this is
  // wired in and tried against a real arrangement. Deliberately NOT
  // pre-optimized with a state cache -- see prior discussion: the cost is
  // bounded by the cursor's current position, not the whole song, so it's
  // likely fine as-is, and the cache would mean refactoring
  // classifyProgression itself (a tested subsystem) for a problem not yet
  // confirmed to exist.
  const classifierCategory = classifyCandidateTransition(progression, position, candidate);

  // --- Structural fit component ---
  // getExpectedFunctionAt returns null when this beat isn't at a boundary
  // (or when there's no marker before the active one to diff against --
  // e.g. the very first marker in a song). Real return shape when it does
  // fire: { boundary, valid, default, actual, feign } -- actual is what the
  // arranger explicitly set on the marker, default is the boundary's
  // baseline expectation when they didn't. Using actual || default rather
  // than the whole object, since that's the single function name the
  // affinity table is keyed by. TODO: `feign` (a decoration on
  // terminal-adjacent boundaries, not a competing function) isn't factored
  // in yet -- deliberately left alone rather than guessing how it should
  // shift scoring.
  const expectedFunctionResult = ORUMI_CATALOG.structure.getExpectedFunctionAt(structuralMarkers, beat);
  const expectedFunction = expectedFunctionResult
    ? (expectedFunctionResult.actual || expectedFunctionResult.default)
    : null;
  let structuralScore = 0.5; // neutral baseline for non-boundary positions
  if (expectedFunction) {
    if (classifierCategory) {
      const affinity = FUNCTION_TO_CLASSIFIER_AFFINITY[expectedFunction]?.[classifierCategory] ?? 0;
      structuralScore = affinity;
      reasons.push(`${classifierCategory} transition ${affinity >= 0.6 ? 'supports' : 'undercuts'} expected ${expectedFunction}`);
    } else {
      // No prior chord to classify against (first chord in progression at a boundary) --
      // treat as neutral rather than penalizing.
      reasons.push(`opens at a ${expectedFunction} boundary`);
    }
  }

  // --- Harmonic smoothness component ---
  // Placeholder: without a prior chord there's nothing to smooth against.
  // TODO: decide if you want a "starts a phrase cleanly" heuristic here, or
  // if smoothness should just default neutral for position 0.
  let smoothnessScore = 0.5;
  if (classifierCategory) {
    // Rough first pass: treat Solid/Resolved/Kindred as inherently smooth,
    // Shadowed/Tinted as moderate, Activated/Returned/Modulate as more
    // disruptive. TODO: this is a placeholder ranking, not derived from
    // your Phase B data -- replace with whatever smoothness signal your
    // classifier already encodes, if any (e.g. voice-leading distance),
    // rather than a category lookup.
    const smoothnessByCategory = {
      Solid: 0.9, Resolved: 0.85, Kindred: 0.7, Tinted: 0.6,
      Shadowed: 0.5, Returned: 0.55, Activated: 0.4, Modulate: 0.35
    };
    smoothnessScore = smoothnessByCategory[classifierCategory] ?? 0.5;
  }

  const rawScore = (structuralWeight * structuralScore) + (smoothnessWeight * smoothnessScore);

  // --- Pin compatibility: flag, never filter ---
  const pinConflict = !pinFitsQuality(candidate.root, candidate.quality);
  if (pinConflict) {
    reasons.push('conflicts with a pinned note');
  }

  return {
    root: candidate.root,
    quality: candidate.quality,
    score: rawScore,
    pinConflict,
    reason: reasons.join('; ') || 'no strong structural or harmonic signal',
  };
}

/**
 * Top-level entry point: produces the full ranked list for one position.
 * Ties broken by root then quality index for stable, reproducible ordering --
 * change if you'd rather tie-break some other way.
 *
 * @param progression        the real progression array (chords before `position`)
 * @param position           array index the candidate would occupy
 * @param beat               musical beat the candidate would start at -- NOT
 *                           the same as `position`; see file header note.
 *                           Caller must compute the real value (e.g. from
 *                           the slot being replaced, or the previous
 *                           chord's startBeat + durationBeats).
 * @param structuralMarkers  the project's marker array
 * @param options
 *   qualities         optional override for the 17 quality names (defaults
 *                     to ORUMI_CATALOG.harmonicClassification.chordQualityIntervals's keys)
 *   pinFitsQuality    (root, quality) => boolean -- build with
 *                     buildPinCompatibilityCheck(chordPitchClasses, voicePins)
 *   structuralWeight, smoothnessWeight  scoring weights, default 0.6 / 0.4
 */
function generateStructuralChordSuggestions(
  progression,
  position,
  beat,
  structuralMarkers,
  { qualities, pinFitsQuality, structuralWeight, smoothnessWeight } = {}
) {
  const candidates = generateChordCandidates(qualities);

  const scored = candidates.map(c =>
    scoreStructuralChordCandidate(
      c, position, beat, progression, structuralMarkers,
      pinFitsQuality,
      { structuralWeight, smoothnessWeight }
    )
  );

  scored.sort((a, b) =>
    b.score - a.score || a.root.localeCompare(b.root) || a.quality.localeCompare(b.quality)
  );

  return scored.map((s, i) => ({ rank: i + 1, ...s }));
}

// --- UI wiring notes (not implemented here, next step after this is validated) ---
// Root grid badge  = min(rank) across all candidates sharing that root.
// Quality grid badge (after root selected) = that candidate's true rank, unrenumbered.
// Pin conflict glyph = separate visual flag from rank badge; badge shows rank
//   regardless of pinConflict -- per spec, conflicts stay visible and ranked.
// New CSS class needed for rank badges -- do not reuse .quality-square.recommended.

if (typeof module !== 'undefined') {
  module.exports = {
    generateStructuralChordSuggestions,
    scoreStructuralChordCandidate,
    classifyCandidateTransition,
    generateChordCandidates,
    buildPinCompatibilityCheck,
    FUNCTION_TO_CLASSIFIER_AFFINITY,
  };
}