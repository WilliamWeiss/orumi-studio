// voices.js
// Orumi voice engines — clean restored version

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

  createNoiseBurst(audioContext, now, duration = 0.18, gainValue = 0.025) {
    const bufferSize = Math.floor(audioContext.sampleRate * duration);
    const buffer = audioContext.createBuffer(
      1,
      bufferSize,
      audioContext.sampleRate
    );

    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }

    const source = audioContext.createBufferSource();
    const gain = audioContext.createGain();

    source.buffer = buffer;

    gain.gain.setValueAtTime(gainValue, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    source.connect(gain);

    return { source, gain, duration };
  },

  buildVoice(audioContext, voice, freq, now) {
    const mainGain = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    const oscillators = [];
    const noiseSources = [];

    let autoStopSeconds = 1.2;

    mainGain.gain.setValueAtTime(0.0001, now);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1500, now);

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

    if (voice === "japanese" || voice === "koto") {
      autoStopSeconds = 1.25;

      mainGain.gain.exponentialRampToValueAtTime(0.24, now + 0.02);
      mainGain.gain.exponentialRampToValueAtTime(0.001, now + 1.25);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1400, now);
      filter.frequency.exponentialRampToValueAtTime(550, now + 1.0);

      addOsc("triangle", 1, 1.0);
      addOsc("sine", 2, 0.12);
    }

    else if (voice === "chinese") {
      autoStopSeconds = 1.15;

      mainGain.gain.exponentialRampToValueAtTime(0.25, now + 0.02);
      mainGain.gain.exponentialRampToValueAtTime(0.001, now + 1.15);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1550, now);
      filter.frequency.exponentialRampToValueAtTime(600, now + 0.95);

      addOsc("triangle", 1, 1.0);
      addOsc("sine", 2, 0.14);
    }

    else if (voice === "bell") {
      autoStopSeconds = 1.4;

      mainGain.gain.exponentialRampToValueAtTime(0.22, now + 0.01);
      mainGain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(2400, now);

      addOsc("sine", 1, 0.45);
      addOsc("sine", 2.4, 0.16);
      addOsc("sine", 3.01, 0.08);
    }

    else if (voice === "andean" || voice === "ocarina") {
      autoStopSeconds = 1.4;

      mainGain.gain.linearRampToValueAtTime(0.20, now + 0.06);
      mainGain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(freq * 2.2, now);
      filter.Q.value = 2.2;

      addOsc("sine", 1, 1.0);
      addOsc("triangle", 2, 0.08);

      const breath = this.createNoiseBurst(audioContext, now, 0.18, 0.025);
      noiseSources.push(breath);
    }

    else if (voice === "celtic") {
      autoStopSeconds = 0.95;

      mainGain.gain.exponentialRampToValueAtTime(0.22, now + 0.015);
      mainGain.gain.exponentialRampToValueAtTime(0.001, now + 0.95);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1800, now);
      filter.frequency.exponentialRampToValueAtTime(650, now + 0.8);

      addOsc("triangle", 1, 1.0);
      addOsc("sine", 2, 0.10);
    }

    else if (voice === "blues" || voice === "guitar") {
      autoStopSeconds = 1.05;

      mainGain.gain.exponentialRampToValueAtTime(0.24, now + 0.015);
      mainGain.gain.exponentialRampToValueAtTime(0.001, now + 1.05);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1350, now);
      filter.frequency.exponentialRampToValueAtTime(520, now + 0.9);

      addOsc("triangle", 1, 1.0);
      addOsc("sawtooth", 2, 0.06);
    }

    else if (voice === "maqam") {
      autoStopSeconds = 1.2;

      mainGain.gain.exponentialRampToValueAtTime(0.24, now + 0.02);
      mainGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1200, now);
      filter.frequency.exponentialRampToValueAtTime(480, now + 1.0);

      addOsc("sawtooth", 1, 1.0);
      addOsc("triangle", 2, 0.08);
    }

    else if (voice === "indian") {
      autoStopSeconds = 1.35;

      mainGain.gain.exponentialRampToValueAtTime(0.23, now + 0.025);
      mainGain.gain.exponentialRampToValueAtTime(0.001, now + 1.35);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1300, now);
      filter.frequency.exponentialRampToValueAtTime(500, now + 1.1);

      addOsc("triangle", 1, 1.0);
      addOsc("sine", 2, 0.12);
    }

    else if (voice === "choir") {
      autoStopSeconds = 10;

      mainGain.gain.linearRampToValueAtTime(0.16, now + 0.45);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(950, now);

      addOsc("sine", 1, 0.45, -7);
      addOsc("triangle", 1, 0.32, 5);
      addOsc("sine", 2, 0.10, 2);
      addOsc("sine", 0.5, 0.08, -4);
    }

    else if (voice === "piano") {
      autoStopSeconds = 0.85;

      mainGain.gain.exponentialRampToValueAtTime(0.26, now + 0.01);
      mainGain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(2200, now);

      addOsc("triangle", 1, 0.55);
      addOsc("sine", 2, 0.18);
      addOsc("sine", 3, 0.07);
    }

    else if (voice === "softKeys") {
  autoStopSeconds = 10;

  mainGain.gain.linearRampToValueAtTime(
    0.20,
    now + 0.04
  );

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(
    1800,
    now
  );

  addOsc("sine", 1, 0.55);
  addOsc("triangle", 2, 0.16);
  addOsc("sine", 1.005, 0.12);

  const chorus = audioContext.createOscillator();
  const chorusGain = audioContext.createGain();

  chorus.frequency.value = 0.18;
  chorusGain.gain.value = 3.5;

  chorus.connect(chorusGain);

  oscillators.forEach(({ osc }) => {
    chorusGain.connect(osc.detune);
  });

  chorus.start(now);
}

    else if (voice === "organ") {
      autoStopSeconds = 10;

      mainGain.gain.linearRampToValueAtTime(0.18, now + 0.04);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1600, now);

      addOsc("sine", 1, 0.40);
      addOsc("triangle", 2, 0.18);
      addOsc("sine", 0.5, 0.10);
    }

    else if (voice === "synth") {
      autoStopSeconds = 10;

      mainGain.gain.linearRampToValueAtTime(0.17, now + 0.03);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1400, now);

      addOsc("sawtooth", 1, 0.28);
      addOsc("square", 0.5, 0.08);
    }

    else if (voice === "pure") {
      autoStopSeconds = 10;

      mainGain.gain.linearRampToValueAtTime(0.18, now + 0.03);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1800, now);

      addOsc("sine", 1, 0.65);
    }

    else {
      autoStopSeconds = 1.35;

      mainGain.gain.exponentialRampToValueAtTime(0.23, now + 0.025);
      mainGain.gain.exponentialRampToValueAtTime(0.001, now + 1.35);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1300, now);
      filter.frequency.exponentialRampToValueAtTime(500, now + 1.1);

      addOsc("triangle", 1, 1.0);
      addOsc("sine", 2, 0.12);
    }

    oscillators.forEach(({ osc, gain }) => {
      gain.connect(filter);
      osc.start(now);
    });

    noiseSources.forEach(({ source, gain, duration }) => {
      gain.connect(filter);
      source.start(now);
      source.stop(now + duration);
    });

    filter.connect(mainGain);
    mainGain.connect(audioContext.destination);

const sustainedVoices = [
  "pure",
  "organ",
  "choir",
  "synth",
  "softKeys"
];

if (!sustainedVoices.includes(voice)) {
  oscillators.forEach(({ osc }) => {
    try {
      osc.stop(now + autoStopSeconds);
    } catch (error) {}
  });
}

    return {
      oscillators: oscillators.map(item => item.osc),
      noiseSources: noiseSources.map(item => item.source),
      gain: mainGain,
      autoStopSeconds
    };
  },

  stopVoice(note, audioContext, releaseSeconds = 0.12) {
    if (!note || !audioContext) return;

    const now = audioContext.currentTime;

    if (!note.gain || !note.gain.gain) return;

    note.gain.gain.cancelScheduledValues(now);
    note.gain.gain.setValueAtTime(note.gain.gain.value, now);

    note.gain.gain.exponentialRampToValueAtTime(
      0.0001,
      now + releaseSeconds
    );

    if (note.oscillators) {
      note.oscillators.forEach(osc => {
        try {
          osc.stop(now + releaseSeconds + 0.02);
        } catch (error) {}
      });
    }

    if (note.noiseSources) {
      note.noiseSources.forEach(source => {
        try {
          source.stop(now + releaseSeconds + 0.02);
        } catch (error) {}
      });
    }
  }
};