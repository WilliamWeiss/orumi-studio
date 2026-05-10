// voices.js
// Orumi voice engines
// Load after orumi-catalog.js:
//
// <script src="js/orumi-catalog.js"></script>
// <script src="js/voices.js"></script>

const ORUMI_VOICES = {
  createOscillator(audioContext, freq, type, gainValue, detune = 0) {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.type = type;
    osc.frequency.value = freq;
    osc.detune.value = detune;

    gain.gain.value = gainValue;

    osc.connect(gain);

    return { osc, gain };
  },

  buildVoice(audioContext, voice, freq, now) {
    const mainGain = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();

    const oscillators = [];

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1800, now);

    mainGain.gain.setValueAtTime(0.0001, now);

    const addOsc = (type, ratio, gainValue, detune = 0) => {
      oscillators.push(
        this.createOscillator(
          audioContext,
          freq * ratio,
          type,
          gainValue,
          detune
        )
      );
    };

    if (voice === "koto") {
      mainGain.gain.exponentialRampToValueAtTime(0.30, now + 0.008);
      mainGain.gain.exponentialRampToValueAtTime(0.035, now + 1.0);

      filter.frequency.setValueAtTime(2600, now);
      filter.frequency.exponentialRampToValueAtTime(900, now + 0.9);

      addOsc("triangle", 1, 0.62);
      addOsc("sine", 2, 0.16);
      addOsc("sine", 3, 0.06);

    } else if (voice === "choir") {
      mainGain.gain.linearRampToValueAtTime(0.16, now + 0.45);

      filter.frequency.setValueAtTime(950, now);

      addOsc("sine", 1, 0.45, -7);
      addOsc("triangle", 1, 0.32, 5);
      addOsc("sine", 2, 0.10, 2);
      addOsc("sine", 0.5, 0.08, -4);

    } else if (voice === "ocarina") {
      mainGain.gain.linearRampToValueAtTime(0.18, now + 0.08);

      filter.frequency.setValueAtTime(1200, now);

      addOsc("triangle", 1, 0.65);
      addOsc("sine", 2, 0.08);

    } else if (voice === "piano") {
      mainGain.gain.exponentialRampToValueAtTime(0.26, now + 0.01);
      mainGain.gain.exponentialRampToValueAtTime(0.08, now + 0.8);

      filter.frequency.setValueAtTime(2200, now);

      addOsc("triangle", 1, 0.55);
      addOsc("sine", 2, 0.18);
      addOsc("sine", 3, 0.07);

    } else if (voice === "guitar") {
      mainGain.gain.exponentialRampToValueAtTime(0.24, now + 0.01);
      mainGain.gain.exponentialRampToValueAtTime(0.04, now + 0.7);

      filter.frequency.setValueAtTime(1800, now);

      addOsc("triangle", 1, 0.55);
      addOsc("sine", 2, 0.12);

    } else if (voice === "organ") {
      mainGain.gain.linearRampToValueAtTime(0.18, now + 0.04);

      filter.frequency.setValueAtTime(1600, now);

      addOsc("sine", 1, 0.40);
      addOsc("triangle", 2, 0.18);
      addOsc("sine", 0.5, 0.10);

    } else if (voice === "bell") {
      mainGain.gain.exponentialRampToValueAtTime(0.22, now + 0.01);
      mainGain.gain.exponentialRampToValueAtTime(0.05, now + 1.2);

      filter.frequency.setValueAtTime(2600, now);

      addOsc("sine", 1, 0.42);
      addOsc("sine", 2.4, 0.16);
      addOsc("sine", 3.01, 0.08);

    } else if (voice === "synth") {
      mainGain.gain.linearRampToValueAtTime(0.17, now + 0.03);

      filter.frequency.setValueAtTime(1400, now);

      addOsc("sawtooth", 1, 0.28);
      addOsc("square", 0.5, 0.08);

    } else if (voice === "pure") {
      mainGain.gain.linearRampToValueAtTime(0.18, now + 0.03);

      filter.frequency.setValueAtTime(1800, now);

      addOsc("sine", 1, 0.65);

    } else {
      // warm default
      mainGain.gain.linearRampToValueAtTime(0.18, now + 0.03);

      filter.frequency.setValueAtTime(1500, now);

      addOsc("triangle", 1, 0.62);
      addOsc("sine", 2, 0.08);
    }

    oscillators.forEach(({ osc, gain }) => {
      gain.connect(filter);
      osc.start(now);
    });

    filter.connect(mainGain);
    mainGain.connect(audioContext.destination);

    return {
      oscillators: oscillators.map(item => item.osc),
      gain: mainGain
    };
  },

  stopVoice(note, audioContext, releaseSeconds = 0.12) {
    if (!note || !audioContext) return;

    const now = audioContext.currentTime;

    note.gain.gain.cancelScheduledValues(now);

    note.gain.gain.setValueAtTime(
      note.gain.gain.value,
      now
    );

    note.gain.gain.exponentialRampToValueAtTime(
      0.0001,
      now + releaseSeconds
    );

    note.oscillators.forEach(osc => {
      osc.stop(now + releaseSeconds + 0.02);
    });
  }
};