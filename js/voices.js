// voices.js
// Orumi voice engines — standardized internal instrument library
// Works with the existing ORUMI_VOICES.buildVoice(audioContext, voice, freq, now) API.

const ORUMI_VOICES = {
  // Stable instrument names for Orumi tools. Existing/legacy voice names are mapped below.
  aliases: {
    softKeys: "orumiKeys",
    piano: "orumiPiano",
    organ: "orumiOrgan",
    bell: "orumiBell",
    choir: "orumiVocalAh",
    pure: "orumiPure",
    synth: "orumiPad",

    // Existing cultural/evocative names remain supported as aliases.
    japanese: "orumiKoto",
    koto: "orumiKoto",
    chinese: "orumiPluck",
    andean: "orumiOcarina",
    ocarina: "orumiOcarina",
    celtic: "orumiWhistle",
    whistle: "orumiWhistle",
    blues: "orumiGuitar",
    guitar: "orumiGuitar",
    maqam: "orumiReed",
    reed: "orumiReed",
    indian: "orumiTambura",
    tambura: "orumiTambura",


    // New explicit library names.
    orumiKeys: "orumiKeys",
    orumiPiano: "orumiPiano",
    orumiOrgan: "orumiOrgan",
    orumiBell: "orumiBell",
    orumiVocalAh: "orumiVocalAh",
    orumiVocalOo: "orumiVocalOo",
    orumiPluck: "orumiPluck",
    orumiBass: "orumiBass",
    orumiPad: "orumiPad",
    orumiPure: "orumiPure",
    orumiKoto: "orumiKoto",
    orumiOcarina: "orumiOcarina",
    orumiWhistle: "orumiWhistle",
    orumiGuitar: "orumiGuitar",
    orumiReed: "orumiReed",
    orumiTambura: "orumiTambura"
  },

  sustainedVoices: new Set([
    "orumiKeys",
    "orumiOrgan",
    "orumiVocalAh",
    "orumiVocalOo",
    "orumiPad",
    "orumiPure",
    "orumiBass"
  ]),

  getCanonicalVoice(voice) {
    return this.aliases[voice] || this.aliases.softKeys;
  },

  createOscillator(audioContext, freq, type, gainValue, detune = 0) {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.type = type;
    osc.frequency.value = Math.max(20, freq);
    osc.detune.value = detune;
    gain.gain.value = gainValue;

    osc.connect(gain);

    return { osc, gain };
  },

  createNoiseBurst(audioContext, now, duration = 0.18, gainValue = 0.025) {
    const bufferSize = Math.max(1, Math.floor(audioContext.sampleRate * duration));
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
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

  applyEnvelope(gainNode, now, envelope) {
    const attack = Math.max(0.001, envelope.attack ?? 0.02);
    const decay = Math.max(0.001, envelope.decay ?? 0.2);
    const sustain = Math.max(0.001, envelope.sustain ?? 0.16);
    const peak = Math.max(0.001, envelope.peak ?? 0.22);
    const releaseToSilenceAt = envelope.releaseToSilenceAt;

    gainNode.gain.cancelScheduledValues(now);
    gainNode.gain.setValueAtTime(0.0001, now);

    if (envelope.curve === "linear") {
      gainNode.gain.linearRampToValueAtTime(peak, now + attack);
      gainNode.gain.linearRampToValueAtTime(sustain, now + attack + decay);
    } else {
      gainNode.gain.exponentialRampToValueAtTime(peak, now + attack);
      gainNode.gain.exponentialRampToValueAtTime(sustain, now + attack + decay);
    }

    if (Number.isFinite(releaseToSilenceAt)) {
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + releaseToSilenceAt);
    }
  },

  buildVoice(audioContext, voice, freq, now, destinationNode) {
    const canonicalVoice = this.getCanonicalVoice(voice);
    const mainGain = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    const outputGain = audioContext.createGain();
    const oscillators = [];
    const noiseSources = [];
    const modulationOscillators = [];

    let autoStopSeconds = 10;

    outputGain.gain.setValueAtTime(0.86, now);
    mainGain.gain.setValueAtTime(0.0001, now);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1600, now);
    filter.Q.value = 0.7;

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

    const addNoise = (duration, gainValue) => {
      noiseSources.push(this.createNoiseBurst(audioContext, now, duration, gainValue));
    };

    const addChorus = (rate = 0.18, depth = 3.5) => {
      const chorus = audioContext.createOscillator();
      const chorusGain = audioContext.createGain();

      chorus.frequency.value = rate;
      chorusGain.gain.value = depth;
      chorus.connect(chorusGain);

      oscillators.forEach(({ osc }) => {
        chorusGain.connect(osc.detune);
      });

      chorus.start(now);
      modulationOscillators.push(chorus);
    };

    if (canonicalVoice === "orumiPiano") {
      autoStopSeconds = 1.15;
      this.applyEnvelope(mainGain, now, {
        attack: 0.006,
        decay: 0.32,
        sustain: 0.055,
        peak: 0.28,
        releaseToSilenceAt: autoStopSeconds
      });

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(2600, now);
      filter.frequency.exponentialRampToValueAtTime(1050, now + 0.55);

      addOsc("triangle", 1, 0.58);
      addOsc("sine", 2, 0.20);
      addOsc("sine", 3, 0.075);
      addNoise(0.045, 0.010);
    }

    else if (canonicalVoice === "orumiKeys") {
      autoStopSeconds = 10;
      this.applyEnvelope(mainGain, now, {
        attack: 0.035,
        decay: 0.22,
        sustain: 0.20,
        peak: 0.22,
        curve: "linear"
      });

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1750, now);

      addOsc("sine", 1, 0.52);
      addOsc("triangle", 2, 0.15);
      addOsc("sine", 1.005, 0.13);
      addChorus(0.18, 3.4);
    }

    else if (canonicalVoice === "orumiOrgan") {
      autoStopSeconds = 10;
      this.applyEnvelope(mainGain, now, {
        attack: 0.025,
        decay: 0.08,
        sustain: 0.18,
        peak: 0.19,
        curve: "linear"
      });

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1700, now);

      addOsc("sine", 1, 0.42);
      addOsc("triangle", 2, 0.20);
      addOsc("sine", 3, 0.07);
      addOsc("sine", 0.5, 0.11);
      addChorus(0.11, 1.2);
    }

    else if (canonicalVoice === "orumiBell") {
      autoStopSeconds = 1.65;
      this.applyEnvelope(mainGain, now, {
        attack: 0.004,
        decay: 0.50,
        sustain: 0.020,
        peak: 0.23,
        releaseToSilenceAt: autoStopSeconds
      });

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(3300, now);

      addOsc("sine", 1, 0.45);
      addOsc("sine", 2.38, 0.16);
      addOsc("sine", 3.01, 0.085);
      addOsc("sine", 4.18, 0.040);
    }

    else if (canonicalVoice === "orumiVocalAh") {
      autoStopSeconds = 10;
      this.applyEnvelope(mainGain, now, {
        attack: 0.42,
        decay: 0.35,
        sustain: 0.16,
        peak: 0.18,
        curve: "linear"
      });

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1020, now);
      filter.Q.value = 1.1;

      addOsc("sine", 1, 0.42, -7);
      addOsc("triangle", 1, 0.34, 5);
      addOsc("sine", 2, 0.11, 2);
      addOsc("sine", 0.5, 0.08, -4);
      addChorus(0.09, 5.4);
    }

    else if (canonicalVoice === "orumiVocalOo") {
      autoStopSeconds = 10;
      this.applyEnvelope(mainGain, now, {
        attack: 0.36,
        decay: 0.30,
        sustain: 0.15,
        peak: 0.17,
        curve: "linear"
      });

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(680, now);
      filter.Q.value = 1.65;

      addOsc("sine", 1, 0.48, -6);
      addOsc("sine", 1.004, 0.30, 6);
      addOsc("triangle", 2, 0.08);
      addChorus(0.08, 4.8);
    }

    else if (canonicalVoice === "orumiPluck") {
      autoStopSeconds = 1.05;
      this.applyEnvelope(mainGain, now, {
        attack: 0.006,
        decay: 0.22,
        sustain: 0.025,
        peak: 0.25,
        releaseToSilenceAt: autoStopSeconds
      });

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1800, now);
      filter.frequency.exponentialRampToValueAtTime(610, now + 0.85);

      addOsc("triangle", 1, 0.82);
      addOsc("sine", 2, 0.16);
      addNoise(0.035, 0.008);
    }

    else if (canonicalVoice === "orumiBass") {
      autoStopSeconds = 10;
      this.applyEnvelope(mainGain, now, {
        attack: 0.025,
        decay: 0.20,
        sustain: 0.21,
        peak: 0.24,
        curve: "linear"
      });

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(520, now);
      filter.Q.value = 0.9;

      addOsc("sine", 0.5, 0.38);
      addOsc("triangle", 1, 0.42);
      addOsc("sine", 2, 0.07);
    }

    else if (canonicalVoice === "orumiPad") {
      autoStopSeconds = 10;
      this.applyEnvelope(mainGain, now, {
        attack: 0.55,
        decay: 0.45,
        sustain: 0.15,
        peak: 0.17,
        curve: "linear"
      });

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1250, now);

      addOsc("sawtooth", 1, 0.18, -5);
      addOsc("triangle", 1, 0.26, 4);
      addOsc("sine", 2, 0.08);
      addChorus(0.06, 6.5);
    }

    else if (canonicalVoice === "orumiPure") {
      autoStopSeconds = 10;
      this.applyEnvelope(mainGain, now, {
        attack: 0.025,
        decay: 0.12,
        sustain: 0.18,
        peak: 0.19,
        curve: "linear"
      });

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1900, now);
      addOsc("sine", 1, 0.65);
    }

    else if (canonicalVoice === "orumiKoto") {
      autoStopSeconds = 1.28;
      this.applyEnvelope(mainGain, now, {
        attack: 0.006,
        decay: 0.30,
        sustain: 0.030,
        peak: 0.25,
        releaseToSilenceAt: autoStopSeconds
      });

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1550, now);
      filter.frequency.exponentialRampToValueAtTime(560, now + 0.95);

      addOsc("triangle", 1, 0.84);
      addOsc("sine", 2, 0.14);
      addOsc("sine", 3, 0.055);
      addNoise(0.035, 0.010);
    }

    else if (canonicalVoice === "orumiOcarina") {
      autoStopSeconds = 10;
      this.applyEnvelope(mainGain, now, {
        attack: 0.08,
        decay: 0.26,
        sustain: 0.16,
        peak: 0.19,
        curve: "linear"
      });

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(freq * 2.15, now);
      filter.Q.value = 2.2;

      addOsc("sine", 1, 0.82);
      addOsc("triangle", 2, 0.075);
      addNoise(0.18, 0.018);
    }

    else if (canonicalVoice === "orumiWhistle") {
      autoStopSeconds = 1.15;
      this.applyEnvelope(mainGain, now, {
        attack: 0.015,
        decay: 0.34,
        sustain: 0.025,
        peak: 0.22,
        releaseToSilenceAt: autoStopSeconds
      });

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(freq * 1.85, now);
      filter.Q.value = 2.8;

      addOsc("triangle", 1, 0.84);
      addOsc("sine", 2, 0.09);
      addNoise(0.08, 0.010);
    }

    else if (canonicalVoice === "orumiGuitar") {
      autoStopSeconds = 1.12;
      this.applyEnvelope(mainGain, now, {
        attack: 0.007,
        decay: 0.30,
        sustain: 0.030,
        peak: 0.25,
        releaseToSilenceAt: autoStopSeconds
      });

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1420, now);
      filter.frequency.exponentialRampToValueAtTime(530, now + 0.85);

      addOsc("triangle", 1, 0.78);
      addOsc("sawtooth", 2, 0.055);
      addNoise(0.028, 0.012);
    }

    else if (canonicalVoice === "orumiReed") {
      autoStopSeconds = 10;
      this.applyEnvelope(mainGain, now, {
        attack: 0.035,
        decay: 0.18,
        sustain: 0.18,
        peak: 0.21,
        curve: "linear"
      });

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1220, now);
      filter.Q.value = 1.0;

      addOsc("sawtooth", 1, 0.36);
      addOsc("triangle", 1, 0.26);
      addOsc("sine", 2, 0.08);
    }

    else if (canonicalVoice === "orumiTambura") {
      autoStopSeconds = 10;
      this.applyEnvelope(mainGain, now, {
        attack: 0.18,
        decay: 0.45,
        sustain: 0.15,
        peak: 0.20,
        curve: "linear"
      });

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1120, now);
      filter.Q.value = 1.2;

      addOsc("triangle", 1, 0.38);
      addOsc("sine", 2, 0.12);
      addOsc("sawtooth", 0.5, 0.08);
      addChorus(0.07, 4.2);
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
    mainGain.connect(outputGain);
    outputGain.connect(destinationNode || audioContext.destination);

    if (!this.sustainedVoices.has(canonicalVoice)) {
      oscillators.forEach(({ osc }) => {
        try {
          osc.stop(now + autoStopSeconds + 0.03);
        } catch (error) {}
      });
    }

    return {
      oscillators: oscillators.map(item => item.osc).concat(modulationOscillators),
      noiseSources: noiseSources.map(item => item.source),
      gain: mainGain,
      outputGain,
      autoStopSeconds,
      canonicalVoice
    };
  },

  stopVoice(note, audioContext, releaseSeconds = 0.12) {
    if (!note || !audioContext) return;

    const now = audioContext.currentTime;

    if (!note.gain || !note.gain.gain) return;

    note.gain.gain.cancelScheduledValues(now);
    note.gain.gain.setValueAtTime(Math.max(0.0001, note.gain.gain.value), now);
    note.gain.gain.exponentialRampToValueAtTime(0.0001, now + releaseSeconds);

    if (note.outputGain && note.outputGain.gain) {
      note.outputGain.gain.cancelScheduledValues(now);
      note.outputGain.gain.setValueAtTime(Math.max(0.0001, note.outputGain.gain.value), now);
      note.outputGain.gain.exponentialRampToValueAtTime(0.0001, now + releaseSeconds + 0.02);
    }

    if (note.oscillators) {
      note.oscillators.forEach(osc => {
        try {
          osc.stop(now + releaseSeconds + 0.04);
        } catch (error) {}
      });
    }

    if (note.noiseSources) {
      note.noiseSources.forEach(source => {
        try {
          source.stop(now + releaseSeconds + 0.04);
        } catch (error) {}
      });
    }
  }
};
