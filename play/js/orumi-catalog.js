// orumi-catalog.js
// Central musical catalog for Orumi / Sound Squares.

// orumi-catalog.js
// Central musical catalog for Orumi / Sound Squares

const ORUMI_CATALOG = {

  systems: {

    western: {
      label: "Western",
      shortLabel: "WE",
      defaultRoot: "C",
      defaultFamily: "diatonic",
      defaultMode: "ionian",
      defaultVoice: "softKeys",
      defaultSet: "native",
      defaultOctaves: [2,3,4,5],
      theme: "western",

      families: {

        diatonic: {
          label: "Diatonic",

          modes: {

            ionian: {
              label: "Major / Ionian",
              shortLabel: "Major",
              formula: [0,2,4,5,7,9,11],
              tint: "gold"
            },

            aeolian: {
              label: "Minor / Aeolian",
              shortLabel: "Minor",
              formula: [0,2,3,5,7,8,10],
              tint: "silverBlue"
            },

            dorian: {
              label: "Dorian",
              formula: [0,2,3,5,7,9,10],
              tint: "greenBlue"
            },

            mixolydian: {
              label: "Mixolydian",
              formula: [0,2,4,5,7,9,10],
              tint: "sunset"
            },

            lydian: {
              label: "Lydian",
              formula: [0,2,4,6,7,9,11],
              tint: "violetGold"
            },

            phrygian: {
              label: "Phrygian",
              formula: [0,1,3,5,7,8,10],
              tint: "ember"
            },

            locrian: {
              label: "Locrian",
              formula: [0,1,3,5,6,8,10],
              tint: "ash"
            }
          }
        },

        pentatonic: {
          label: "Pentatonic",

          modes: {

            majorPentatonic: {
              label: "Major Pentatonic",
              formula: [0,2,4,7,9],
              tint: "greenGold"
            },

            minorPentatonic: {
              label: "Minor Pentatonic",
              formula: [0,3,5,7,10],
              tint: "deepGreen"
            }
          }
        },

        blues: {
          label: "Blues",

          modes: {

            minorBlues: {
              label: "Minor Blues",
              formula: [0,3,5,6,7,10],
              tint: "bluesBlue"
            },

            majorBlues: {
              label: "Major Blues",
              formula: [0,2,3,4,7,9],
              tint: "brightBlues"
            }
          }
        },

        chromatic: {
          label: "Chromatic",

          modes: {

            chromatic: {
              label: "Chromatic",
              formula: [0,1,2,3,4,5,6,7,8,9,10,11],
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
      defaultVoice: "japanese",
      defaultSet: "native",
      defaultOctaves: [2,3,4,5],
      theme: "japanese",

      families: {

        pentatonic: {
          label: "Pentatonic",

          modes: {

            hirajoshi: {
              label: "Hirajōshi",
              formula: [0,2,3,7,8],
              tint: "indigoGold"
            },

            inSen: {
              label: "In Sen",
              formula: [0,1,5,7,10],
              tint: "inkBlue"
            },

            kumoi: {
              label: "Kumoi",
              formula: [0,2,3,7,9],
              tint: "mistViolet"
            },

            yo: {
              label: "Yo",
              formula: [0,2,5,7,9],
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
      defaultVoice: "chinese",
      defaultSet: "native",
      defaultOctaves: [2,3,4,5],
      theme: "chinese",

      families: {

        pentatonic: {
          label: "Pentatonic",

          modes: {

            gong: {
              label: "Gong",
              formula: [0,2,4,7,9],
              tint: "redGold"
            },

            shang: {
              label: "Shang",
              formula: [0,2,5,7,10],
              tint: "jade"
            },

            jue: {
              label: "Jue",
              formula: [0,3,5,8,10],
              tint: "springGreen"
            },

            zhi: {
              label: "Zhi",
              formula: [0,2,5,7,9],
              tint: "brightGold"
            },

            yu: {
              label: "Yu",
              formula: [0,3,5,7,10],
              tint: "moonJade"
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
      defaultVoice: "indian",
      defaultSet: "native",
      defaultOctaves: [2,3,4,5],
      theme: "indian",

      families: {

        raga: {
          label: "Raga",

          modes: {

            bhupali: {
              label: "Bhupali",
              formula: [0,2,4,7,9],
              tint: "saffronGold"
            },

            durga: {
              label: "Durga",
              formula: [0,2,5,7,9],
              tint: "lotusGold"
            },

            kafi: {
              label: "Kafi",
              formula: [0,2,3,5,7,9,10],
              tint: "greenSaffron"
            },

            yamanApprox: {
              label: "Yaman Approx.",
              formula: [0,2,4,6,7,9,11],
              tint: "violetSaffron"
            },

            bhairavApprox: {
              label: "Bhairav Approx.",
              formula: [0,1,4,5,7,8,11],
              tint: "dawnOrange"
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
      defaultVoice: "maqam",
      defaultSet: "native",
      defaultOctaves: [2,3,4,5],
      theme: "maqam",

      families: {

        maqam: {
          label: "Maqam",

          modes: {

            nahawand: {
              label: "Nahawand",
              formula: [0,2,3,5,7,8,10],
              tint: "violetSand"
            },

            hijaz: {
              label: "Hijaz",
              formula: [0,1,4,5,7,8,11],
              tint: "desertViolet"
            },

            rastApprox: {
              label: "Rast Approx.",
              formula: [0,2,4,5,7,9,10],
              tint: "sandGold"
            },

            bayatiApprox: {
              label: "Bayati Approx.",
              formula: [0,1,3,5,7,8,10],
              tint: "roseSand"
            },

            sabaApprox: {
              label: "Saba Approx.",
              formula: [0,1,3,4,7,8,10],
              tint: "shadowRose"
            }
          }
        }
      }
    },

    celtic: {
      label: "Celtic",
      shortLabel: "CE",
      defaultRoot: "D",
      defaultFamily: "modal",
      defaultMode: "dorian",
      defaultVoice: "celtic",
      defaultSet: "native",
      defaultOctaves: [2,3,4,5],
      theme: "celtic",

      families: {

        modal: {
          label: "Modal",

          modes: {

            dorian: {
              label: "Dorian",
              formula: [0,2,3,5,7,9,10],
              tint: "celticGreen"
            },

            mixolydian: {
              label: "Mixolydian",
              formula: [0,2,4,5,7,9,10],
              tint: "fieldGold"
            },

            aeolian: {
              label: "Aeolian",
              formula: [0,2,3,5,7,8,10],
              tint: "mistBlue"
            }
          }
        },

        pentatonic: {
          label: "Pentatonic",

          modes: {

            folkPentatonic: {
              label: "Folk Pentatonic",
              formula: [0,2,4,7,9],
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
      defaultVoice: "blues",
      defaultSet: "native",
      defaultOctaves: [2,3,4,5],
      theme: "blues",

      families: {

        blues: {
          label: "Blues",

          modes: {

            minorBlues: {
              label: "Minor Blues",
              formula: [0,3,5,6,7,10],
              tint: "bluesBlue"
            },

            majorBlues: {
              label: "Major Blues",
              formula: [0,2,3,4,7,9],
              tint: "brightBlues"
            },

            gospelBlues: {
              label: "Gospel Blues",
              formula: [0,2,3,4,7,9,10],
              tint: "deepGoldBlue"
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
      defaultOctaves: [2,3,4,5],
      theme: "african",

      families: {

        pentatonic: {
          label: "Pentatonic",

          modes: {

            majorPentatonic: {
              label: "Major Pentatonic",
              formula: [0,2,4,7,9],
              tint: "earthRedGold"
            },

            minorPentatonic: {
              label: "Minor Pentatonic",
              formula: [0,3,5,7,10],
              tint: "deepEarth"
            }
          }
        }
      }
    },

    andean: {
      label: "Andean",
      shortLabel: "AN",
      defaultRoot: "A",
      defaultFamily: "pentatonic",
      defaultMode: "andeanMinor",
      defaultVoice: "andean",
      defaultSet: "native",
      defaultOctaves: [2,3,4,5],
      theme: "andean",

      families: {

        pentatonic: {
          label: "Pentatonic",

          modes: {

            andeanMinor: {
              label: "Andean Minor",
              formula: [0,3,5,7,10],
              tint: "earthSky"
            },

            andeanMajor: {
              label: "Andean Major",
              formula: [0,2,4,7,9],
              tint: "sunEarth"
            },

            sikuri: {
              label: "Sikuri",
              formula: [0,2,5,7,10],
              tint: "mountainBlue"
            }
          }
        }
      }
    }
  },

  voices: {

    pure: {
      label: "Pure",
      description: "Clean sine tone."
    },

    warm: {
      label: "Warm",
      description: "Soft triangle tone."
    },

    piano: {
      label: "Piano",
      description: "Harmonic struck tone."
    },

    softKeys: {
  label: "Soft Keys",
  description: "Warm sustained keyboard tone."
},

    guitar: {
      label: "Guitar",
      description: "Plucked string decay."
    },

    japanese: {
      label: "Japanese",
      description: "Original Hirajōshi plucked voice."
    },

    chinese: {
      label: "Chinese",
      description: "Original Chinese pentatonic voice."
    },

    indian: {
      label: "Indian",
      description: "Original Bhupali warm voice."
    },

    maqam: {
      label: "Maqam",
      description: "Original Hijaz reed-like voice."
    },

    celtic: {
      label: "Celtic",
      description: "Original Celtic modal voice."
    },

    blues: {
      label: "Blues",
      description: "Original smoky blues voice."
    },

    andean: {
      label: "Andean",
      description: "Original Andean flute voice."
    },

    ocarina: {
      label: "Ocarina",
      description: "Rounded flute tone."
    },

    bell: {
      label: "Bell",
      description: "Bright overtone voice."
    },

    organ: {
      label: "Organ",
      description: "Layered sustained tone."
    },

    synth: {
      label: "Synth",
      description: "Electronic synth tone."
    },

    choir: {
      label: "Choir",
      description: "Soft vocal layered tone."
    }
  },

  pitchClasses: {

    C:  {
      number: 0,
      display: "C",
      className: "c"
    },

    Db: {
      number: 1,
      display: "Db",
      className: "db"
    },

    D:  {
      number: 2,
      display: "D",
      className: "d"
    },

    Eb: {
      number: 3,
      display: "Eb",
      className: "eb"
    },

    E:  {
      number: 4,
      display: "E",
      className: "e"
    },

    F:  {
      number: 5,
      display: "F",
      className: "f"
    },

    Gb: {
      number: 6,
      display: "Gb",
      className: "gb"
    },

    G:  {
      number: 7,
      display: "G",
      className: "g"
    },

    Ab: {
      number: 8,
      display: "Ab",
      className: "ab"
    },

    A:  {
      number: 9,
      display: "A",
      className: "a"
    },

    Bb: {
      number: 10,
      display: "Bb",
      className: "bb"
    },

    B:  {
      number: 11,
      display: "B",
      className: "b"
    }
  },

  numberToPitchClass: [
    "C",
    "Db",
    "D",
    "Eb",
    "E",
    "F",
    "Gb",
    "G",
    "Ab",
    "A",
    "Bb",
    "B"
  ]
};