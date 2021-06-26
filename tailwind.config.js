const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: ["./index.html", "./src/**/*.{vue,ts,js}"],
    safeList: [],
  },
  darkMode: "class",
  variants: {
    typography: ["responsive", "dark"],
  },
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
    extend: {
      typography: theme => ({
        DEFAULT: {
          css: {
            "p, em, li, strong, code": {
              color: theme("colors.black.700"),
            },
            a: {
              color: colors.blue[500],
            },
            blockquote: {
              borderColor: theme("colors.gray.200"),
            },
            "code::before": {
              content: "1",
            },
            "code::after": {
              content: "1",
            },
            "table thead tr, table thead tr th, table tbody tr, table tbody tr td": {
              color: theme("colors.black.700"),
              borderColor: theme("colors.gray.200"),
              borderWidth: theme("borderWidth.DEFAULT"),
            },
            "table thead tr th, table tbody tr th": {
              padding: "1rem",
            },
            "thead th:first-child, tbody td:first-child": {
              paddingLeft: "16px",
            },
            "thead th:last-child, tbody td:last-child": {
              paddingRight: "16px",
            },
          },
        },
        dark: {
          css: {
            "p, em, li, strong, code": {
              color: theme("colors.white"),
            },
            blockquote: {
              borderColor: theme("colors.black.600"),
            },
            "table thead tr, table thead tr th, table tbody tr, table tbody tr td": {
              color: theme("colors.white"),
              borderColor: theme("colors.black.600"),
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
