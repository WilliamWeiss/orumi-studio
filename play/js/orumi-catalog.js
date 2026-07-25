// orumi-catalog.js
// Central musical catalog for Orumi / Sound Squares.
// Load before player.html or selection-control.html:
//
// <script src="js/orumi-catalog.js"></script>

const ORUMI_CATALOG = {
  systems: {
    western: {
      label: "Western",
      shortLabel: "WE",
      defaultRoot: "C",
      defaultFamily: "diatonic",
      defaultMode: "ionian",
      defaultVoice: "piano",
      defaultSet: "native",
      defaultOctaves: [2, 3, 4, 5],
      theme: "western",

      families: {
        diatonic: {
          label: "Diatonic",
          modes: {
            ionian: {
              label: "Major / Ionian",
              shortLabel: "Major",
              formula: [0, 2, 4, 5, 7, 9, 11],
              tint: "gold"
            },
            aeolian: {
              label: "Minor / Aeolian",
              shortLabel: "Minor",
              formula: [0, 2, 3, 5, 7, 8, 10],
              tint: "silverBlue"
            },
            dorian: {
              label: "Dorian",
              formula: [0, 2, 3, 5, 7, 9, 10],
              tint: "greenBlue"
            },
            mixolydian: {
              label: "Mixolydian",
              formula: [0, 2, 4, 5, 7, 9, 10],
              tint: "sunset"
            },
            lydian: {
              label: "Lydian",
              formula: [0, 2, 4, 6, 7, 9, 11],
              tint: "violetGold"
            },
            phrygian: {
              label: "Phrygian",
              formula: [0, 1, 3, 5, 7, 8, 10],
              tint: "ember"
            },
            locrian: {
              label: "Locrian",
              formula: [0, 1, 3, 5, 6, 8, 10],
              tint: "ash"
            }
          }
        },

        pentatonic: {
          label: "Pentatonic",
          modes: {
            majorPentatonic: {
              label: "Major Pentatonic",
              formula: [0, 2, 4, 7, 9],
              tint: "greenGold"
            },
            minorPentatonic: {
              label: "Minor Pentatonic",
              formula: [0, 3, 5, 7, 10],
              tint: "deepGreen"
            }
          }
        },

        blues: {
          label: "Blues",
          modes: {
            minorBlues: {
              label: "Minor Blues",
              formula: [0, 3, 5, 6, 7, 10],
              tint: "bluesBlue"
            },
            majorBlues: {
              label: "Major Blues",
              formula: [0, 2, 3, 4, 7, 9],
              tint: "brightBlues"
            }
          }
        },

        chromatic: {
          label: "Chromatic",
          modes: {
            chromatic: {
              label: "Chromatic",
              formula: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
              tint: "neutral"
            }
          }
        }
      }
    },

    japanese: {
      label: "Japanese",
      shortLabel: "JA",
      defaultRoot: "C",
      defaultFamily: "pentatonic",
      defaultMode: "hirajoshi",
      defaultVoice: "koto",
      defaultSet: "native",
      defaultOctaves: [2, 3, 4, 5],
      theme: "japanese",

      families: {
        pentatonic: {
          label: "Pentatonic",
          modes: {
            hirajoshi: {
              label: "Hirajōshi",
              formula: [0, 2, 3, 7, 8],
              tint: "indigoGold"
            },
            inSen: {
              label: "In Sen",
              formula: [0, 1, 5, 7, 10],
              tint: "inkBlue"
            },
            kumoi: {
              label: "Kumoi",
              formula: [0, 2, 3, 7, 9],
              tint: "mistViolet"
            },
            yo: {
              label: "Yo",
              formula: [0, 2, 5, 7, 9],
              tint: "warmParchment"
            }
          }
        }
      }
    },

    chinese: {
      label: "Chinese",
      shortLabel: "CH",
      defaultRoot: "C",
      defaultFamily: "pentatonic",
      defaultMode: "gong",
      defaultVoice: "bell",
      defaultSet: "native",
      defaultOctaves: [2, 3, 4, 5],
      theme: "chinese",

      families: {
        pentatonic: {
          label: "Pentatonic",
          modes: {
            gong: {
              label: "Gong",
              formula: [0, 2, 4, 7, 9],
              tint: "redGold"
            },
            shang: {
              label: "Shang",
              formula: [0, 2, 5, 7, 10],
              tint: "jade"
            },
            jue: {
              label: "Jue",
              formula: [0, 3, 5, 8, 10],
              tint: "springGreen"
            },
            zhi: {
              label: "Zhi",
              formula: [0, 2, 5, 7, 9],
              tint: "brightGold"
            },
            yu: {
              label: "Yu",
              formula: [0, 3, 5, 7, 10],
              tint: "moonJade"
            }
          }
        }
      }
    },

    andean: {
      label: "Andean",
      shortLabel: "AN",
      defaultRoot: "C",
      defaultFamily: "pentatonic",
      defaultMode: "andeanMinor",
      defaultVoice: "ocarina",
      defaultSet: "native",
      defaultOctaves: [2, 3, 4, 5],
      theme: "andean",

      families: {
        pentatonic: {
          label: "Pentatonic",
          modes: {
            andeanMinor: {
              label: "Andean Minor",
              formula: [0, 3, 5, 7, 10],
              tint: "earthSky"
            },
            andeanMajor: {
              label: "Andean Major",
              formula: [0, 2, 4, 7, 9],
              tint: "sunEarth"
            },
            sikuri: {
              label: "Sikuri",
              formula: [0, 2, 5, 7, 10],
              tint: "mountainBlue"
            }
          }
        }
      }
    },

    celtic: {
      label: "Celtic",
      shortLabel: "CE",
      defaultRoot: "C",
      defaultFamily: "modal",
      defaultMode: "dorian",
      defaultVoice: "whistle",
      defaultSet: "native",
      defaultOctaves: [2, 3, 4, 5],
      theme: "celtic",

      families: {
        modal: {
          label: "Modal",
          modes: {
            dorian: {
              label: "Dorian",
              formula: [0, 2, 3, 5, 7, 9, 10],
              tint: "celticGreen"
            },
            mixolydian: {
              label: "Mixolydian",
              formula: [0, 2, 4, 5, 7, 9, 10],
              tint: "fieldGold"
            },
            aeolian: {
              label: "Aeolian",
              formula: [0, 2, 3, 5, 7, 8, 10],
              tint: "mistBlue"
            }
          }
        },

        pentatonic: {
          label: "Pentatonic",
          modes: {
            folkPentatonic: {
              label: "Folk Pentatonic",
              formula: [0, 2, 4, 7, 9],
              tint: "mossGold"
            }
          }
        }
      }
    },

    blues: {
      label: "Blues",
      shortLabel: "BL",
      defaultRoot: "C",
      defaultFamily: "blues",
      defaultMode: "minorBlues",
      defaultVoice: "guitar",
      defaultSet: "native",
      defaultOctaves: [2, 3, 4, 5],
      theme: "blues",

      families: {
        blues: {
          label: "Blues",
          modes: {
            minorBlues: {
              label: "Minor Blues",
              formula: [0, 3, 5, 6, 7, 10],
              tint: "bluesBlue"
            },
            majorBlues: {
              label: "Major Blues",
              formula: [0, 2, 3, 4, 7, 9],
              tint: "brightBlues"
            },
            gospelBlues: {
              label: "Gospel Blues",
              formula: [0, 2, 3, 4, 7, 9, 10],
              tint: "deepGoldBlue"
            }
          }
        }
      }
    },

    maqam: {
      label: "Maqam",
      shortLabel: "MA",
      defaultRoot: "C",
      defaultFamily: "maqam",
      defaultMode: "hijaz",
      defaultVoice: "reed",
      defaultSet: "native",
      defaultOctaves: [2, 3, 4, 5],
      theme: "maqam",

      families: {
        maqam: {
          label: "Maqam",
          modes: {
            nahawand: {
              label: "Nahawand",
              formula: [0, 2, 3, 5, 7, 8, 10],
              tint: "violetSand"
            },
            hijaz: {
              label: "Hijaz",
              formula: [0, 1, 4, 5, 7, 8, 10],
              tint: "desertViolet"
            },
            rastApprox: {
              label: "Rast Approx.",
              formula: [0, 2, 4, 5, 7, 9, 10],
              tint: "sandGold"
            },
            bayatiApprox: {
              label: "Bayati Approx.",
              formula: [0, 1, 3, 5, 7, 8, 10],
              tint: "roseSand"
            },
            sabaApprox: {
              label: "Saba Approx.",
              formula: [0, 1, 3, 4, 7, 8, 10],
              tint: "shadowRose"
            }
          }
        }
      }
    },

    indian: {
      label: "Indian",
      shortLabel: "IN",
      defaultRoot: "C",
      defaultFamily: "raga",
      defaultMode: "bhupali",
      defaultVoice: "tambura",
      defaultSet: "native",
      defaultOctaves: [2, 3, 4, 5],
      theme: "indian",

      families: {
        raga: {
          label: "Raga",
          modes: {
            bhupali: {
              label: "Bhupali",
              formula: [0, 2, 4, 7, 9],
              tint: "saffronGold"
            },
            durga: {
              label: "Durga",
              formula: [0, 2, 5, 7, 9],
              tint: "lotusGold"
            },
            kafi: {
              label: "Kafi",
              formula: [0, 2, 3, 5, 7, 9, 10],
              tint: "greenSaffron"
            },
            yamanApprox: {
              label: "Yaman Approx.",
              formula: [0, 2, 4, 6, 7, 9, 11],
              tint: "violetSaffron"
            },
            bhairavApprox: {
              label: "Bhairav Approx.",
              formula: [0, 1, 4, 5, 7, 8, 11],
              tint: "dawnOrange"
            }
          }
        }
      }
    },

    african: {
      label: "African",
      shortLabel: "AF",
      defaultRoot: "C",
      defaultFamily: "pentatonic",
      defaultMode: "majorPentatonic",
      defaultVoice: "warm",
      defaultSet: "native",
      defaultOctaves: [2, 3, 4, 5],
      theme: "african",

      families: {
        pentatonic: {
          label: "Pentatonic",
          modes: {
            majorPentatonic: {
              label: "Major Pentatonic",
              formula: [0, 2, 4, 7, 9],
              tint: "earthRedGold"
            },
            minorPentatonic: {
              label: "Minor Pentatonic",
              formula: [0, 3, 5, 7, 10],
              tint: "deepEarth"
            }
          }
        }
      }
    }
  },

  voices: {
    pure: {
      label: "Pure",
      description: "Clean sine tone for interval learning."
    },
    warm: {
      label: "Warm",
      description: "Soft triangle-based general purpose voice."
    },
    piano: {
      label: "Piano",
      description: "Struck harmonic tone for chord clarity."
    },
    guitar: {
      label: "Guitar",
      description: "Plucked string-like decay."
    },
    koto: {
      label: "Koto",
      description: "Bright plucked zither-like tone."
    },
    ocarina: {
      label: "Ocarina",
      description: "Rounded breathy flute-like tone."
    },
    bell: {
      label: "Bell",
      description: "Shimmering overtone voice."
    },
    organ: {
      label: "Organ",
      description: "Sustained layered tone."
    },
    synth: {
      label: "Synth",
      description: "Bright electronic tone."
    },
    choir: {
      label: "Choir",
      description: "Soft vowel-like layered tone."
    },
    whistle: {
      label: "Whistle",
      description: "Breathy, focused tin-whistle-like tone."
    },
    reed: {
      label: "Reed",
      description: "Nasal, sustained double-reed-like tone."
    },
    tambura: {
      label: "Tambura",
      description: "Sustained drone-like plucked-string tone."
    }
  },

  pitchClasses: {
    C:  { number: 0,  display: "C",     className: "c"  },
    Db: { number: 1,  display: "C#/Db", className: "db" },
    D:  { number: 2,  display: "D",     className: "d"  },
    Eb: { number: 3,  display: "D#/Eb", className: "eb" },
    E:  { number: 4,  display: "E",     className: "e"  },
    F:  { number: 5,  display: "F",     className: "f"  },
    Gb: { number: 6,  display: "F#/Gb", className: "gb" },
    G:  { number: 7,  display: "G",     className: "g"  },
    Ab: { number: 8,  display: "G#/Ab", className: "ab" },
    A:  { number: 9,  display: "A",     className: "a"  },
    Bb: { number: 10, display: "A#/Bb", className: "bb" },
    B:  { number: 11, display: "B",     className: "b"  }
  },

  numberToPitchClass: [
    "C", "Db", "D", "Eb", "E", "F",
    "Gb", "G", "Ab", "A", "Bb", "B"
  ],

  // Barbershop song-structure vocabulary. Shared across Design Studio
  // (structural authority -- project.structuralMarkers / getActiveStructureAt)
  // and Progression Builder Phase C (getExpectedFunctionAt).
  structure: {
    sectionTypes: [
      "intro", "statement", "expansion", "transition",
      "return", "tag", "coda"
    ],

    transitionFunctions: [
      "bloom", "escalate", "settle", "homecoming", "suspend"
    ],

    // Keyed by "fromSectionType->toSectionType". Governs which
    // transitionFunction values are valid on a marker of "to" type when it
    // follows a marker of "from" type, and which one is the default.
    // "tag->tag" is not a new boundary type -- it's a repeat/lap on the Tag
    // marker itself (iteration N -> N+1); each lap can carry its own function.
    boundaries: {
      "intro->statement":      { valid: ["bloom"],                          default: "bloom" },
      "statement->expansion":  { valid: ["bloom", "escalate"],              default: "bloom" },
      "expansion->transition": { valid: ["escalate", "suspend"],            default: "escalate" },
      // A direct Chorus->Tag jump (skipping Transition/Return entirely) is
      // a common, simple song shape -- confirmed by "In the Good Old
      // Summer Time" itself. Escalate default: jumping straight from an
      // active Expansion into the Tag usually carries momentum forward
      // rather than settling first. Homecoming stays valid for cases where
      // the Expansion already felt like the arrival, and the Tag is a
      // richer second confirmation of it.
      "expansion->tag":        { valid: ["escalate", "homecoming"],         default: "escalate" },
      "transition->return":    { valid: ["settle", "homecoming"],          default: "homecoming" },
      "return->tag":           { valid: ["escalate", "homecoming", "settle"], default: "escalate" },
      "tag->tag":              { valid: ["escalate", "suspend"],            default: "escalate" },
      "tag->coda":             { valid: ["settle"],                         default: "settle" }
    },

    // Feign is a decoration, not a competing section/function type -- it
    // rides alongside sectionType/transitionFunction on the marker it
    // decorates. Never defaulted; always a deliberate, hand-placed override.
    // Scope is intentionally narrow: terminal-adjacent boundaries only
    // (Return->Tag, or an early Tag iteration pretending to be final).
    feign: {
      validTargets: ["coda", "tag"]
    },

    // Display layer for transitionFunctions above -- labels + plain-
    // language definitions for UI pickers (Progression Builder's "Declare
    // Section" panel, and Design Studio's timeline UI). Kept alongside
    // transitionFunctions itself, rather than as a separate constant
    // somewhere else, so the two can't drift out of sync with each other.
    functionInfo: {
      bloom: {
        label: "Bloom",
        definition: "A gentle, low-tension opening move -- the first step into a new section."
      },
      escalate: {
        label: "Escalate",
        definition: "Builds energy and tension -- used to rise toward a peak."
      },
      settle: {
        label: "Settle",
        definition: "Releases the tension, but isn't the final landing -- a stepping-stone resolution."
      },
      homecoming: {
        label: "Homecoming",
        definition: "A return to familiar harmony, richer this time -- recognition, not just resolution."
      },
      suspend: {
        label: "Suspend",
        definition: "Holds the tension in place -- a vamp or sustained moment, not a build."
      }
    },

    // Display layer for sectionTypes above -- same reasoning as functionInfo.
    sectionTypeLabels: [
      { value: "intro", label: "Intro" },
      { value: "statement", label: "Statement" },
      { value: "expansion", label: "Expansion" },
      { value: "transition", label: "Transition" },
      { value: "return", label: "Return" },
      { value: "tag", label: "Tag" },
      { value: "coda", label: "Coda" }
    ],

    // Pure query functions -- take a structuralMarkers array as an argument
    // rather than reaching into a global project, so any tool (Design
    // Studio, Progression Builder, or future tools) can call the exact same
    // logic once it has a structuralMarkers array of its own.

    getActiveMarkerAt(markers, beat) {
      if (!Array.isArray(markers) || markers.length === 0) return null;

      let active = null;

      for (const marker of markers) {
        if (marker.beat <= beat) {
          active = marker;
        } else {
          break;
        }
      }

      return active || markers[0];
    },

    getPreviousMarker(markers, markerId) {
      if (!Array.isArray(markers)) return null;

      const index = markers.findIndex(m => m.id === markerId);
      if (index <= 0) return null;

      return markers[index - 1];
    },

    // Returns { boundary, valid, default, actual, feign } describing the
    // boundary crossed to reach the active marker at this beat, or null if
    // there's no marker yet, or no boundary before the first marker.
    getExpectedFunctionAt(markers, beat) {
      const active = this.getActiveMarkerAt(markers, beat);
      if (!active) return null;

      const previous = this.getPreviousMarker(markers, active.id);
      if (!previous) return null;

      const boundaryKey = previous.sectionType + "->" + active.sectionType;
      const boundary = this.boundaries[boundaryKey];
      if (!boundary) return null;

      return {
        boundary: boundaryKey,
        valid: boundary.valid,
        default: boundary.default,
        actual: active.transitionFunction || null,
        feign: active.feign || null
      };
    }
  },

  // Phase B chord-transition classifier (Solid/Activated/Resolved/Shadowed/
  // Returned/Kindred/Tinted/Modulate). Relocated here from Progression
  // Builder so any tool (Progression Builder, Chord Factory) can call
  // classifyProgression() the same way DS/PB already share
  // ORUMI_CATALOG.structure. Ported originally from a validated Python
  // prototype (tested against 6 real barbershop pieces + ground-truth-
  // confirmed against a known notated key change). Pure -- touches only
  // ORUMI_CATALOG.pitchClasses and whatever progression array is passed
  // in, nothing tool-specific. Internal calls use this.xxx(...) since
  // these are now object methods, not flat globals.
  harmonicClassification: {
    chordQualityIntervals: {
      major: [0, 4, 7], minor: [0, 3, 7],
      major6: [0, 4, 7, 9], minor6: [0, 3, 7, 9],
      add9: [0, 2, 4, 7], dominant9: [0, 2, 4, 7, 10],
      major9: [0, 2, 4, 7, 11], minor9: [0, 2, 3, 7, 10],
      diminished: [0, 3, 6], augmented: [0, 4, 8],
      sus2: [0, 2, 7], sus4: [0, 5, 7],
      dominant7: [0, 4, 7, 10], major7: [0, 4, 7, 11],
      minor7: [0, 3, 7, 10], halfDiminished7: [0, 3, 6, 10],
      diminished7: [0, 3, 6, 9]
    },

    STABLE_QUALITIES: new Set([
      "major", "minor", "major6", "minor6", "major7", "minor7", "add9", "major9", "minor9"
    ]),

    DOMINANT_FUNCTION_QUALITIES: new Set([
      "dominant7", "dominant9", "diminished", "diminished7", "halfDiminished7", "augmented"
    ]),

    MAJOR_KEY_DIATONIC_QUALITY: { 0: "major", 2: "minor", 4: "minor", 5: "major", 7: "major", 9: "minor", 11: "diminished" },
    MINOR_KEY_DIATONIC_QUALITY: { 0: "minor", 2: "diminished", 3: "major", 5: "minor", 7: "minor", 8: "major", 10: "major" },

    getChordDisplayName(chord) {
      return (chord && (chord.name || chord.root)) || "?";
    },

    qualityMajorMinorNess(quality) {
      if (["major", "major6", "major7", "add9", "major9", "dominant7", "dominant9", "sus2", "sus4", "augmented"].includes(quality)) return "major";
      if (["minor", "minor6", "minor7", "minor9"].includes(quality)) return "minor";
      if (["diminished", "diminished7", "halfDiminished7"].includes(quality)) return "diminished";
      return null;
    },

    chordRootPc(chord) {
      return ORUMI_CATALOG.pitchClasses[chord.root] ? ORUMI_CATALOG.pitchClasses[chord.root].number : 0;
    },

    chordToneSet(chord) {
      const intervals = this.chordQualityIntervals[chord.quality] || [0, 4, 7];
      const rootPc = this.chordRootPc(chord);
      return new Set(intervals.map(iv => (rootPc + iv) % 12));
    },

    sharedToneCount(chordA, chordB) {
      const a = this.chordToneSet(chordA);
      const b = this.chordToneSet(chordB);
      let count = 0;
      a.forEach(pc => { if (b.has(pc)) count++; });
      return count;
    },

    getActiveKeyAt(progression, index) {
      for (let i = Math.min(index, progression.length - 1); i >= 0; i--) {
        if (progression[i] && progression[i].modulation) {
          return {
            root: progression[i].modulation.root,
            mode: progression[i].modulation.mode,
            modulatedAtIndex: i
          };
        }
      }

      const first = progression[0] || {};
      const firstModeText = String(first.mode || "").toLowerCase();
      const firstIsMinor = firstModeText === "minor" || firstModeText === "aeolian";

      return {
        root: first.keyRoot || "C",
        mode: firstIsMinor ? "minor" : "major",
        modulatedAtIndex: -1
      };
    },

    classifyProgression(progression) {
      const results = [null];
      let establishedTonicsSeen = 0;
      let recentPairs = [];

      if (progression[0] && progression[0].root) {
        const initialKey = this.getActiveKeyAt(progression, 0);
        const initialTonicPc = ORUMI_CATALOG.pitchClasses[initialKey.root] ? ORUMI_CATALOG.pitchClasses[initialKey.root].number : 0;
        const firstRootPc = this.chordRootPc(progression[0]);
        const firstIsTonic = firstRootPc === initialTonicPc &&
          ["major", "major6", "major7", "add9", "major9"].includes(progression[0].quality);
        if (firstIsTonic) establishedTonicsSeen = 1;
      }

      for (let i = 1; i < progression.length; i++) {
        const prevChord = progression[i - 1];
        const curChord = progression[i];

        if (!prevChord || !prevChord.root || !curChord || !curChord.root) {
          results.push(null);
          continue;
        }

        if (curChord.modulation) {
          results.push({
            stage: "Modulate",
            reason: "New key center: " + curChord.modulation.root +
              (curChord.modulation.mode === "minor" ? " Minor" : " Major")
          });
          establishedTonicsSeen = 0;
          recentPairs.push([this.getChordDisplayName(prevChord), this.getChordDisplayName(curChord)]);
          continue;
        }

        const activeKey = this.getActiveKeyAt(progression, i);
        const tonicPc = ORUMI_CATALOG.pitchClasses[activeKey.root] ? ORUMI_CATALOG.pitchClasses[activeKey.root].number : 0;
        const diatonicTable = activeKey.mode === "minor" ? this.MINOR_KEY_DIATONIC_QUALITY : this.MAJOR_KEY_DIATONIC_QUALITY;

        const prevIsDominant = this.DOMINANT_FUNCTION_QUALITIES.has(prevChord.quality);
        const curIsDominant = this.DOMINANT_FUNCTION_QUALITIES.has(curChord.quality);
        const curIsStable = this.STABLE_QUALITIES.has(curChord.quality);

        const prevRootPc = this.chordRootPc(prevChord);
        const curRootPc = this.chordRootPc(curChord);
        const rootMotion = ((curRootPc - prevRootPc) % 12 + 12) % 12;
        const isFifthResolution = rootMotion === 5;
        const sameRoot = rootMotion === 0;
        const isTonicChord = curRootPc === tonicPc &&
          ["major", "major6", "major7", "add9", "major9"].includes(curChord.quality);

        let stage = null;
        let reason = "";

        const curPair = [this.getChordDisplayName(prevChord), this.getChordDisplayName(curChord)];
        const isVampRepeat = recentPairs.length >= 1 &&
          recentPairs[recentPairs.length - 1][0] === curPair[1] &&
          recentPairs[recentPairs.length - 1][1] === curPair[0];

        if (isVampRepeat && prevIsDominant) {
          stage = "Activated";
          reason = this.getChordDisplayName(prevChord) + " <-> " + this.getChordDisplayName(curChord) + " vamping -- sustained tension";
        } else if (prevIsDominant && isFifthResolution && curIsStable) {
          stage = "Resolved";
          reason = this.getChordDisplayName(prevChord) + " resolves down a 5th to " + this.getChordDisplayName(curChord);
        } else if (prevIsDominant && sameRoot && curIsStable) {
          stage = "Resolved";
          reason = this.getChordDisplayName(prevChord) + " settles in place to " + this.getChordDisplayName(curChord);
        } else if (prevIsDominant && !isFifthResolution && !sameRoot && curIsStable) {
          stage = "Shadowed";
          reason = this.getChordDisplayName(prevChord) + " doesn't resolve as expected -- lands on " + this.getChordDisplayName(curChord) + " instead";
        } else if (curIsDominant) {
          stage = "Activated";
          reason = this.getChordDisplayName(curChord) + " introduces dominant-function pull";
        } else if (curIsStable && !prevIsDominant) {
          if (isTonicChord) {
            if (establishedTonicsSeen > 0) {
              stage = "Returned";
              reason = this.getChordDisplayName(curChord) + " is the tonic, already established earlier";
            } else {
              stage = "Solid";
              reason = this.getChordDisplayName(curChord) + " is the tonic, established here";
            }
          } else {
            const degree = ((curRootPc - tonicPc) % 12 + 12) % 12;
            const expectedQuality = diatonicTable[degree];
            const actualFlavor = this.qualityMajorMinorNess(curChord.quality);
            const shared = this.sharedToneCount(prevChord, curChord);

            if (expectedQuality && actualFlavor && expectedQuality !== actualFlavor &&
                expectedQuality !== "diminished" && actualFlavor !== "diminished") {
              stage = "Tinted";
              reason = this.getChordDisplayName(curChord) + " is normally " + expectedQuality + " here, but is " + actualFlavor + " -- borrowed color";
            } else if (shared >= 2) {
              stage = "Kindred";
              reason = this.getChordDisplayName(curChord) + " shares " + shared + " tones with " + this.getChordDisplayName(prevChord) + " -- same harmonic area";
            } else {
              stage = "Solid";
              reason = this.getChordDisplayName(curChord) + " is stable, low tension";
            }
          }
        } else {
          stage = "Activated";
          reason = this.getChordDisplayName(curChord) + " following " + this.getChordDisplayName(prevChord);
        }

        if (isTonicChord) establishedTonicsSeen++;
        recentPairs.push(curPair);
        results.push({ stage, reason });
      }

      return results;
    }
  },

  tints: {
    gold: {
      native: "rgba(255, 238, 170, 0.98)",
      outside: "rgba(170, 160, 130, 0.45)"
    },
    silverBlue: {
      native: "rgba(190, 215, 255, 0.98)",
      outside: "rgba(120, 135, 160, 0.45)"
    },
    greenBlue: {
      native: "rgba(165, 240, 225, 0.98)",
      outside: "rgba(90, 135, 130, 0.45)"
    },
    sunset: {
      native: "rgba(255, 190, 140, 0.98)",
      outside: "rgba(150, 95, 75, 0.45)"
    },
    violetGold: {
      native: "rgba(225, 190, 255, 0.98)",
      outside: "rgba(135, 105, 160, 0.45)"
    },
    ember: {
      native: "rgba(255, 145, 105, 0.98)",
      outside: "rgba(150, 75, 60, 0.45)"
    },
    ash: {
      native: "rgba(200, 200, 210, 0.98)",
      outside: "rgba(105, 105, 120, 0.45)"
    },
    greenGold: {
      native: "rgba(190, 255, 205, 0.98)",
      outside: "rgba(115, 155, 125, 0.45)"
    },
    deepGreen: {
      native: "rgba(150, 220, 175, 0.98)",
      outside: "rgba(95, 130, 105, 0.45)"
    },
    bluesBlue: {
      native: "rgba(120, 145, 240, 0.98)",
      outside: "rgba(70, 75, 130, 0.50)"
    },
    brightBlues: {
      native: "rgba(130, 170, 255, 0.98)",
      outside: "rgba(70, 90, 150, 0.50)"
    },
    neutral: {
      native: "rgba(235, 235, 235, 0.98)",
      outside: "rgba(235, 235, 235, 0.98)"
    },

    indigoGold: {
      native: "rgba(215, 190, 255, 0.98)",
      outside: "rgba(150, 120, 95, 0.45)"
    },
    inkBlue: {
      native: "rgba(160, 185, 235, 0.98)",
      outside: "rgba(80, 95, 125, 0.45)"
    },
    mistViolet: {
      native: "rgba(200, 180, 245, 0.98)",
      outside: "rgba(110, 100, 145, 0.45)"
    },
    warmParchment: {
      native: "rgba(245, 220, 170, 0.98)",
      outside: "rgba(140, 120, 90, 0.45)"
    },

    redGold: {
      native: "rgba(255, 210, 120, 0.98)",
      outside: "rgba(150, 70, 60, 0.45)"
    },
    jade: {
      native: "rgba(160, 235, 200, 0.98)",
      outside: "rgba(80, 125, 105, 0.45)"
    },
    springGreen: {
      native: "rgba(180, 250, 170, 0.98)",
      outside: "rgba(90, 145, 90, 0.45)"
    },
    brightGold: {
      native: "rgba(255, 230, 130, 0.98)",
      outside: "rgba(160, 130, 70, 0.45)"
    },
    moonJade: {
      native: "rgba(170, 225, 215, 0.98)",
      outside: "rgba(85, 120, 120, 0.45)"
    },

    earthSky: {
      native: "rgba(170, 220, 255, 0.98)",
      outside: "rgba(115, 95, 70, 0.45)"
    },
    sunEarth: {
      native: "rgba(245, 185, 105, 0.98)",
      outside: "rgba(130, 95, 65, 0.45)"
    },
    mountainBlue: {
      native: "rgba(150, 200, 240, 0.98)",
      outside: "rgba(80, 110, 135, 0.45)"
    },

    celticGreen: {
      native: "rgba(155, 235, 175, 0.98)",
      outside: "rgba(80, 125, 95, 0.45)"
    },
    fieldGold: {
      native: "rgba(215, 235, 145, 0.98)",
      outside: "rgba(115, 135, 80, 0.45)"
    },
    mistBlue: {
      native: "rgba(170, 205, 235, 0.98)",
      outside: "rgba(90, 115, 140, 0.45)"
    },
    mossGold: {
      native: "rgba(185, 220, 135, 0.98)",
      outside: "rgba(100, 125, 80, 0.45)"
    },

    deepGoldBlue: {
      native: "rgba(150, 175, 255, 0.98)",
      outside: "rgba(110, 90, 55, 0.45)"
    },

    violetSand: {
      native: "rgba(220, 175, 255, 0.98)",
      outside: "rgba(140, 110, 85, 0.45)"
    },
    desertViolet: {
      native: "rgba(205, 160, 245, 0.98)",
      outside: "rgba(140, 105, 75, 0.45)"
    },
    sandGold: {
      native: "rgba(235, 205, 140, 0.98)",
      outside: "rgba(140, 115, 80, 0.45)"
    },
    roseSand: {
      native: "rgba(240, 170, 180, 0.98)",
      outside: "rgba(135, 95, 85, 0.45)"
    },
    shadowRose: {
      native: "rgba(210, 145, 170, 0.98)",
      outside: "rgba(110, 75, 85, 0.45)"
    },

    saffronGold: {
      native: "rgba(255, 190, 90, 0.98)",
      outside: "rgba(150, 95, 45, 0.45)"
    },
    lotusGold: {
      native: "rgba(245, 205, 145, 0.98)",
      outside: "rgba(140, 105, 80, 0.45)"
    },
    greenSaffron: {
      native: "rgba(190, 225, 130, 0.98)",
      outside: "rgba(120, 120, 70, 0.45)"
    },
    violetSaffron: {
      native: "rgba(225, 175, 255, 0.98)",
      outside: "rgba(145, 100, 100, 0.45)"
    },
    dawnOrange: {
      native: "rgba(255, 165, 105, 0.98)",
      outside: "rgba(145, 85, 60, 0.45)"
    },

    earthRedGold: {
      native: "rgba(235, 170, 110, 0.98)",
      outside: "rgba(130, 85, 60, 0.45)"
    },
    deepEarth: {
      native: "rgba(190, 130, 95, 0.98)",
      outside: "rgba(105, 70, 55, 0.45)"
    }
  }
};

// Merges labels for every real Orumi voice name (both the generic preview
// palette already defined above and the four real per-lane vocal-part
// names -- orumiVocalOo, orumiLeadVoice, orumiVocalAh, orumiBassVoice --
// used by Design Studio's lane system) directly into ORUMI_CATALOG.voices.
// Runs automatically the moment this file loads, rather than requiring
// each tool to remember to call a separate registration function -- that's
// exactly the gap that let Progression Builder and Chord Factory's copies
// of ORUMI_CATALOG.voices go without these labels for as long as they did,
// since only Design Studio ever called the original version of this logic.
// Relocated from design-studio.html, where it lived as
// registerOrumiVoiceCatalog() -- single source of truth now, no separate
// call needed anywhere.
(function registerOrumiVoiceCatalog() {
  const standardizedVoices = {
    orumiVocalAh: { label: "Orumi Vocal Ah" },
    orumiVocalOo: { label: "Orumi Vocal Oo" },
    orumiVocalHum: { label: "Orumi Vocal Hum" },
    orumiChoir: { label: "Orumi Choir" },
    orumiLeadVoice: { label: "Orumi Lead Voice" },
    orumiBassVoice: { label: "Orumi Bass Voice" },
    orumiWarmPad: { label: "Orumi Warm Pad" },
    orumiKeys: { label: "Orumi Keys" },
    orumiPiano: { label: "Orumi Piano" },
    orumiOrgan: { label: "Orumi Organ" },
    orumiBell: { label: "Orumi Bell" },
    orumiPluck: { label: "Orumi Pluck" },
    orumiPure: { label: "Orumi Pure Tone" },

    softKeys: ORUMI_CATALOG.voices.softKeys || { label: "Soft Keys" },
    piano: ORUMI_CATALOG.voices.piano || { label: "Piano" },
    organ: ORUMI_CATALOG.voices.organ || { label: "Organ" },
    bell: ORUMI_CATALOG.voices.bell || { label: "Bell" },
    choir: ORUMI_CATALOG.voices.choir || { label: "Choir" },
    synth: ORUMI_CATALOG.voices.synth || { label: "Synth Pad" },
    pure: ORUMI_CATALOG.voices.pure || { label: "Pure Tone" }
  };

  Object.entries(standardizedVoices).forEach(([key, voice]) => {
    ORUMI_CATALOG.voices[key] = {
      ...voice,
      label: voice.label || key
    };
  });
})();