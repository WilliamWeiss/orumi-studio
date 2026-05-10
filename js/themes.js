// themes.js
// Orumi visual themes.
// Load after orumi-catalog.js:
//
// <script src="orumi-catalog.js"></script>
// <script src="themes.js"></script>

const ORUMI_THEMES = {
  applyTint(mode) {
    const tintKey = mode.tint || "neutral";
    const tint =
      ORUMI_CATALOG.tints[tintKey] ||
      ORUMI_CATALOG.tints.neutral;

    document.body.style.setProperty(
      "--native-glow",
      tint.native
    );

    document.body.style.setProperty(
      "--outside-glow",
      tint.outside
    );
  },

  applySystemTheme(system) {
    const themeKey = system.theme || "western";

    const themes = {
      western: {
        background: "#111",
        text: "white"
      },

      japanese: {
        background: "#121018",
        text: "#f4efe6"
      },

      chinese: {
        background: "#160d0d",
        text: "#fff2df"
      },

      andean: {
        background: "#11161a",
        text: "#f4eadc"
      },

      celtic: {
        background: "#0f1712",
        text: "#edf7ee"
      },

      blues: {
        background: "#0c101c",
        text: "#edf2ff"
      },

      maqam: {
        background: "#151018",
        text: "#f8efe4"
      },

      indian: {
        background: "#180f0a",
        text: "#fff0dc"
      },

      african: {
        background: "#160f0b",
        text: "#ffe8d0"
      }
    };

    const theme =
      themes[themeKey] ||
      themes.western;

    document.body.style.background =
      theme.background;

    document.body.style.color =
      theme.text;
  },

  apply(system, mode) {
    this.applySystemTheme(system);
    this.applyTint(mode);
  }
};