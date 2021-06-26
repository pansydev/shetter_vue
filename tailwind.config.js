const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: ["./index.html", "./src/**/*.{vue,ts,js}"],
    safeList: [],
  },
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Open Sans", ...defaultTheme.fontFamily.sans],
    },
    borderRadius: {
      DEFAULT: defaultTheme.borderRadius.md,
    },
    borderWidth: {
      DEFAULT: defaultTheme.borderWidth["DEFAULT"],
    },
    colors: {
      transparent: "transparent",
      white: "#ffffff",
      black: {
        300: "#1f2937",
        400: "#111827",
        500: "#383838",
        600: "#303030",
        700: "#202020",
        800: "#181818",
        900: "#000000",
      },
      red: "#dc2626",
      gray: {
        100: "#f5f5f5",
        200: "#e5e7eb",
        300: "#d4d4d8",
        ...colors.gray,
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
