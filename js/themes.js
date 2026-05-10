// themes.js
// Orumi visual theme engine

const ORUMI_THEMES = {
  themes: {
    western: {
      pageBg: "#161616",
      text: "#f7f2e8",
      muted: "#d5ccb8",

      buttonBg: "rgba(255,255,255,0.88)",
      buttonText: "#222",

      nativeGlow: "rgba(255,245,210,0.98)",
      outsideGlow: "rgba(150,150,150,0.38)"
    },

    japanese: {
      pageBg: "#15111f",
      text: "#f6ead7",
      muted: "#c9b8f2",

      buttonBg: "rgba(245,225,180,0.92)",
      buttonText: "#1d1527",

      nativeGlow: "rgba(225,205,255,0.98)",
      outsideGlow: "rgba(125,105,165,0.38)"
    },

    chinese: {
      pageBg: "#1b0d08",
      text: "#f6e4c8",
      muted: "#e3b67a",

      buttonBg: "rgba(255,215,160,0.92)",
      buttonText: "#2a1309",

      nativeGlow: "rgba(255,210,120,0.98)",
      outsideGlow: "rgba(165,90,60,0.38)"
    },

    indian: {
      pageBg: "#201108",
      text: "#ffe7c8",
      muted: "#ffc470",

      buttonBg: "rgba(255,215,150,0.92)",
      buttonText: "#311706",

      nativeGlow: "rgba(255,190,90,0.98)",
      outsideGlow: "rgba(170,95,45,0.38)"
    },

    maqam: {
      pageBg: "#1b1420",
      text: "#f4e5ff",
      muted: "#d8b4ff",

      buttonBg: "rgba(235,205,255,0.92)",
      buttonText: "#24152e",

      nativeGlow: "rgba(225,175,255,0.98)",
      outsideGlow: "rgba(130,95,145,0.38)"
    },

    celtic: {
      pageBg: "#0f1b14",
      text: "#eef7eb",
      muted: "#b7ddb4",

      buttonBg: "rgba(225,245,220,0.92)",
      buttonText: "#112116",

      nativeGlow: "rgba(170,255,185,0.98)",
      outsideGlow: "rgba(90,125,95,0.38)"
    },

    blues: {
      pageBg: "#08111f",
      text: "#e7f0ff",
      muted: "#8fb0ff",

      buttonBg: "rgba(190,210,255,0.92)",
      buttonText: "#07111d",

      nativeGlow: "rgba(120,170,255,0.98)",
      outsideGlow: "rgba(70,95,150,0.38)"
    },

    african: {
      pageBg: "#1f120d",
      text: "#ffe6d1",
      muted: "#d8aa7d",

      buttonBg: "rgba(240,190,145,0.92)",
      buttonText: "#2a150d",

      nativeGlow: "rgba(255,175,110,0.98)",
      outsideGlow: "rgba(145,85,60,0.38)"
    },

    andean: {
      pageBg: "#0f1b20",
      text: "#e7f7fa",
      muted: "#9ec9d1",

      buttonBg: "rgba(190,235,245,0.92)",
      buttonText: "#0f1d22",

      nativeGlow: "rgba(170,220,255,0.98)",
      outsideGlow: "rgba(85,120,145,0.38)"
    }
  },

  apply(system, mode) {
    const systemTheme =
      this.themes[system.theme] ||
      this.themes.western;

    document.documentElement.style.setProperty(
      "--page-bg",
      systemTheme.pageBg
    );

    document.documentElement.style.setProperty(
      "--text-color",
      systemTheme.text
    );

    document.documentElement.style.setProperty(
      "--muted-text",
      systemTheme.muted
    );

    document.documentElement.style.setProperty(
      "--button-bg",
      systemTheme.buttonBg
    );

    document.documentElement.style.setProperty(
      "--button-text",
      systemTheme.buttonText
    );

    document.documentElement.style.setProperty(
      "--native-glow",
      systemTheme.nativeGlow
    );

    document.documentElement.style.setProperty(
      "--outside-glow",
      systemTheme.outsideGlow
    );

    // Optional mode tint overlay from catalog
    if (
      mode &&
      mode.tint &&
      ORUMI_CATALOG.tints &&
      ORUMI_CATALOG.tints[mode.tint]
    ) {
      const tint = ORUMI_CATALOG.tints[mode.tint];

      document.documentElement.style.setProperty(
        "--native-glow",
        tint.native
      );

      document.documentElement.style.setProperty(
        "--outside-glow",
        tint.outside
      );
    }
  }
};