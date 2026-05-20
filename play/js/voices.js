// voices.js
// Orumi voice engines — standardized internal library with improved vocal presets.
// This file intentionally uses only the browser Web Audio API, so it works offline.

const ORUMI_VOICES = {
  createOscillator(audioContext, freq, type, gainValue, detune = 0) {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.type = type;
    osc.frequency.value = Math.max(8, freq);
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

  normalizeVoiceName(voice) {
    const aliases = {
      keys: "orumiKeys",
      softKeys: "orumiKeys",
      piano: "orumiPiano",
      organ: "orumiOrgan",
      bell: "orumiBell",
      choir: "orumiChoir",
      synth: "orumiWarmPad",
      pad: "orumiWarmPad",
      bass: "orumiBassVoice",
      pure: "orumiPure",

      vocalAh: "orumiVocalAh",
      voiceAh: "orumiVocalAh",
      ah: "orumiVocalAh",
      vocalOo: "orumiVocalOo",
      voiceOo: "orumiVocalOo",
      ooh: "orumiVocalOo",
      vocalOoh: "orumiVocalOo",
      voiceOohs: "orumiVocalOo",
      choirAahs: "orumiChoir",
      hum: "orumiVocalHum",

      japanese: "orumiPluck",
      koto: "orumiPluck",
      chinese: "orumiPluck",
      celtic: "orumiPluck",
      blues: "orumiPluck",
      guitar: "orumiPluck",
      andean: "orumiPure",
      ocarina: "orumiPure",
      maqam: "orumiWarmPad",
      indian: "orumiWarmPad"
    };

    return aliases[voice] || voice || "orumiKeys";
  },

  buildVoice(audioContext, voice, freq, now) {
    const voiceName = this.normalizeVoiceName(voice);
    const mainGain = audioContext.createGain();
    const lowpass = audioContext.createBiquadFilter();
    const formantA = audioContext.createBiquadFilter();
    const formantB = audioContext.createBiquadFilter();

    const oscillators = [];
    const noiseSources = [];
    const modulationSources = [];

    let autoStopSeconds = 10;
    let shouldAutoStop = false;
    let releaseTailSeconds = 0.12;

    mainGain.gain.setValueAtTime(0.0001, now);

    lowpass.type = "lowpass";
    lowpass.frequency.setValueAtTime(1800, now);
    lowpass.Q.value = 0.7;

    formantA.type = "peaking";
    formantA.frequency.setValueAtTime(700, now);
    formantA.Q.value = 2.0;
    formantA.gain.value = 0;

    formantB.type = "peaking";
    formantB.frequency.setValueAtTime(1200, now);
    formantB.Q.value = 2.0;
    formantB.gain.value = 0;

    const safeExp = (param, value, time) => {
      param.exponentialRampToValueAtTime(Math.max(0.0001, value), time);
    };

    const setSustainEnvelope = (peak, attack = 0.08) => {
      mainGain.gain.cancelScheduledValues(now);
      mainGain.gain.setValueAtTime(0.0001, now);
      mainGain.gain.linearRampToValueAtTime(peak, now + attack);
    };

    const setPluckEnvelope = (peak, attack, decay) => {
      shouldAutoStop = true;
      autoStopSeconds = decay;
      mainGain.gain.cancelScheduledValues(now);
      mainGain.gain.setValueAtTime(0.0001, now);
      safeExp(mainGain.gain, peak, now + attack);
      safeExp(mainGain.gain, 0.001, now + decay);
    };

    const addOsc = (type, ratio, gainValue, detune = 0) => {
      const osc = this.createOscillator(
        audioContext,
        freq * ratio,
        type,
        gainValue,
        detune
      );

      oscillators.push(osc);
      return osc;
    };

    const addVibrato = (rate = 4.8, cents = 8, delay = 0.12) => {
      const vibrato = audioContext.createOscillator();
      const vibratoGain = audioContext.createGain();

      vibrato.type = "sine";
      vibrato.frequency.setValueAtTime(rate, now);
      vibratoGain.gain.setValueAtTime(0.001, now);
      vibratoGain.gain.linearRampToValueAtTime(cents, now + delay);

      vibrato.connect(vibratoGain);

      oscillators.forEach(({ osc }) => {
        vibratoGain.connect(osc.detune);
      });

      vibrato.start(now);
      modulationSources.push(vibrato);
    };

    const addChorus = (rate = 0.24, cents = 4.5) => {
      const chorus = audioContext.createOscillator();
      const chorusGain = audioContext.createGain();

      chorus.type = "sine";
      chorus.frequency.setValueAtTime(rate, now);
      chorusGain.gain.setValueAtTime(cents, now);

      chorus.connect(chorusGain);

      oscillators.forEach(({ osc }, index) => {
        if (index > 0) {
          chorusGain.connect(osc.detune);
        }
      });

      chorus.start(now);
      modulationSources.push(chorus);
    };

    const configureVowel = (vowel) => {
      lowpass.type = "lowpass";
      lowpass.Q.value = 0.8;

      if (vowel === "ah") {
        lowpass.frequency.setValueAtTime(1450, now);
        formantA.frequency.setValueAtTime(730, now);
        formantA.Q.value = 3.2;
        formantA.gain.value = 5.5;
        formantB.frequency.setValueAtTime(1180, now);
        formantB.Q.value = 2.1;
        formantB.gain.value = 3.5;
      } else if (vowel === "oo") {
        lowpass.frequency.setValueAtTime(1150, now);
        formantA.frequency.setValueAtTime(360, now);
        formantA.Q.value = 3.4;
        formantA.gain.value = 6.5;
        formantB.frequency.setValueAtTime(860, now);
        formantB.Q.value = 2.4;
        formantB.gain.value = 2.8;
      } else if (vowel === "hum") {
        lowpass.frequency.setValueAtTime(850, now);
        formantA.frequency.setValueAtTime(260, now);
        formantA.Q.value = 2.8;
        formantA.gain.value = 7.0;
        formantB.frequency.setValueAtTime(620, now);
        formantB.Q.value = 2.2;
        formantB.gain.value = 3.5;
      }
    };

    if (voiceName === "orumiVocalAh") {
      setSustainEnvelope(0.145, 0.16);
      releaseTailSeconds = 0.18;
      configureVowel("ah");

      addOsc("sine", 1, 0.54, -4);
      addOsc("triangle", 1, 0.28, 5);
      addOsc("sine", 2, 0.055, 2);
      addOsc("sine", 0.5, 0.045, -6);

      addVibrato(4.7, 6.5, 0.20);
      addChorus(0.18, 3.2);
    }

    else if (voiceName === "orumiVocalOo") {
      setSustainEnvelope(0.135, 0.18);
      releaseTailSeconds = 0.20;
      configureVowel("oo");

      addOsc("sine", 1, 0.58, -5);
      addOsc("triangle", 1, 0.24, 4);
      addOsc("sine", 2, 0.035, -2);
      addOsc("sine", 0.5, 0.05, -8);

      addVibrato(4.4, 5.5, 0.22);
      addChorus(0.16, 3.0);
    }

    else if (voiceName === "orumiVocalHum") {
      setSustainEnvelope(0.125, 0.20);
      releaseTailSeconds = 0.24;
      configureVowel("hum");

      addOsc("sine", 1, 0.58, -3);
      addOsc("triangle", 1, 0.18, 3);
      addOsc("sine", 0.5, 0.08, -5);

      addVibrato(4.0, 4.5, 0.25);
      addChorus(0.13, 2.8);
    }

    else if (voiceName === "orumiLeadVoice") {
      setSustainEnvelope(0.155, 0.12);
      releaseTailSeconds = 0.17;
      configureVowel("ah");
      lowpass.frequency.setValueAtTime(1550, now);

      addOsc("sine", 1, 0.60, -3);
      addOsc("triangle", 1, 0.27, 4);
      addOsc("sine", 2, 0.07, 1);

      addVibrato(5.0, 7.0, 0.16);
      addChorus(0.17, 2.5);
    }

    else if (voiceName === "orumiBassVoice") {
      setSustainEnvelope(0.18, 0.14);
      releaseTailSeconds = 0.20;
      configureVowel("oo");
      lowpass.frequency.setValueAtTime(900, now);

      addOsc("sine", 1, 0.55, -4);
      addOsc("triangle", 1, 0.28, 5);
      addOsc("sine", 0.5, 0.16, -6);
      addOsc("sine", 2, 0.035, 2);

      addVibrato(3.8, 4.0, 0.24);
      addChorus(0.12, 2.5);
    }

    else if (voiceName === "orumiChoir") {
      setSustainEnvelope(0.16, 0.26);
      releaseTailSeconds = 0.26;
      configureVowel("ah");
      lowpass.frequency.setValueAtTime(1300, now);

      addOsc("sine", 1, 0.42, -9);
      addOsc("sine", 1, 0.34, 7);
      addOsc("triangle", 1, 0.25, 2);
      addOsc("sine", 2, 0.07, -3);
      addOsc("sine", 0.5, 0.06, -5);

      addVibrato(4.2, 5.0, 0.30);
      addChorus(0.20, 5.5);
    }

    else if (voiceName === "orumiWarmPad") {
      setSustainEnvelope(0.13, 0.22);
      releaseTailSeconds = 0.30;

      lowpass.type = "lowpass";
      lowpass.frequency.setValueAtTime(1050, now);
      lowpass.Q.value = 0.55;

      addOsc("sine", 1, 0.34, -8);
      addOsc("triangle", 1, 0.22, 7);
      addOsc("sine", 0.5, 0.07, -5);
      addOsc("sine", 2, 0.045, 3);

      addChorus(0.11, 6.0);
    }

    else if (voiceName === "orumiKeys") {
      setSustainEnvelope(0.19, 0.04);
      releaseTailSeconds = 0.10;

      lowpass.type = "lowpass";
      lowpass.frequency.setValueAtTime(1800, now);

      addOsc("sine", 1, 0.55);
      addOsc("triangle", 2, 0.16);
      addOsc("sine", 1.005, 0.12);

      addChorus(0.18, 3.5);
    }

    else if (voiceName === "orumiPiano") {
      setPluckEnvelope(0.26, 0.01, 0.95);
      releaseTailSeconds = 0.08;

      lowpass.type = "lowpass";
      lowpass.frequency.setValueAtTime(2300, now);
      lowpass.frequency.exponentialRampToValueAtTime(900, now + 0.8);

      addOsc("triangle", 1, 0.55);
      addOsc("sine", 2, 0.18);
      addOsc("sine", 3, 0.07);
    }

    else if (voiceName === "orumiOrgan") {
      setSustainEnvelope(0.17, 0.035);
      releaseTailSeconds = 0.09;

      lowpass.type = "lowpass";
      lowpass.frequency.setValueAtTime(1550, now);

      addOsc("sine", 1, 0.40);
      addOsc("triangle", 2, 0.18);
      addOsc("sine", 0.5, 0.10);
      addOsc("sine", 3, 0.045);
    }

    else if (voiceName === "orumiBell") {
      setPluckEnvelope(0.22, 0.01, 1.45);
      releaseTailSeconds = 0.08;

      lowpass.type = "lowpass";
      lowpass.frequency.setValueAtTime(2600, now);

      addOsc("sine", 1, 0.45);
      addOsc("sine", 2.4, 0.16);
      addOsc("sine", 3.01, 0.08);
      addOsc("sine", 5.02, 0.035);
    }

    else if (voiceName === "orumiPluck") {
      setPluckEnvelope(0.23, 0.015, 1.1);
      releaseTailSeconds = 0.08;

      lowpass.type = "lowpass";
      lowpass.frequency.setValueAtTime(1550, now);
      lowpass.frequency.exponentialRampToValueAtTime(580, now + 0.95);

      addOsc("triangle", 1, 0.75);
      addOsc("sine", 2, 0.10);
      addOsc("sawtooth", 2, 0.035);
    }

    else if (voiceName === "orumiPure") {
      setSustainEnvelope(0.17, 0.05);
      releaseTailSeconds = 0.14;

      lowpass.type = "lowpass";
      lowpass.frequency.setValueAtTime(1800, now);

      addOsc("sine", 1, 0.66);
      addOsc("sine", 2, 0.035);
    }

    else {
      setSustainEnvelope(0.18, 0.05);
      releaseTailSeconds = 0.14;

      lowpass.type = "lowpass";
      lowpass.frequency.setValueAtTime(1700, now);

      addOsc("sine", 1, 0.55);
      addOsc("triangle", 2, 0.12);
    }

    oscillators.forEach(({ osc, gain }) => {
      gain.connect(lowpass);
      osc.start(now);
    });

    noiseSources.forEach(({ source, gain, duration }) => {
      gain.connect(lowpass);
      source.start(now);
      source.stop(now + duration);
    });

    lowpass.connect(formantA);
    formantA.connect(formantB);
    formantB.connect(mainGain);
    mainGain.connect(audioContext.destination);

    if (shouldAutoStop) {
      oscillators.forEach(({ osc }) => {
        try {
          osc.stop(now + autoStopSeconds + 0.04);
        } catch (error) {}
      });

      modulationSources.forEach(source => {
        try {
          source.stop(now + autoStopSeconds + 0.04);
        } catch (error) {}
      });
    }

    return {
      oscillators: oscillators.map(item => item.osc),
      noiseSources: noiseSources.map(item => item.source),
      modulationSources,
      gain: mainGain,
      autoStopSeconds,
      releaseTailSeconds
    };
  },

  stopVoice(note, audioContext, releaseSeconds = 0.12) {
    if (!note || !audioContext) return;

    const now = audioContext.currentTime;
    const finalReleaseSeconds = Math.max(
      0.04,
      Number(note.releaseTailSeconds || releaseSeconds || 0.12)
    );

    if (!note.gain || !note.gain.gain) return;

    note.gain.gain.cancelScheduledValues(now);
    note.gain.gain.setValueAtTime(
      Math.max(0.0001, note.gain.gain.value),
      now
    );

    note.gain.gain.exponentialRampToValueAtTime(
      0.0001,
      now + finalReleaseSeconds
    );

    if (note.oscillators) {
      note.oscillators.forEach(osc => {
        try {
          osc.stop(now + finalReleaseSeconds + 0.04);
        } catch (error) {}
      });
    }

    if (note.modulationSources) {
      note.modulationSources.forEach(source => {
        try {
          source.stop(now + finalReleaseSeconds + 0.04);
        } catch (error) {}
      });
    }

    if (note.noiseSources) {
      note.noiseSources.forEach(source => {
        try {
          source.stop(now + finalReleaseSeconds + 0.04);
        } catch (error) {}
      });
    }
  }
};
