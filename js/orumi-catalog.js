// orumi-catalog.js
// Central musical catalog for Orumi / Sound Squares.
// Load before player.html or selection-control.html:
//
// <script src="orumi-catalog.js"></script>

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
      defaultVoice: "warm",
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
      defaultVoice: "warm",
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
      defaultVoice: "warm",
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