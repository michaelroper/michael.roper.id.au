const defaultTheme = require("tailwindcss/defaultTheme")
const plugin = require("tailwindcss/plugin")
const colors = require("tailwindcss/colors")

module.exports = {
  content: ["./_site/**/*.{html,js}"],
  content: [
    "./pages/**/*.{md,njk}",
    "./_includes/**/*.njk",
    "./assets/**/*.{svg,js}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.neutral,
      yellow: colors.amber,
      blue: colors.blue,
      indigo: colors.indigo,
      purple: colors.violet,
      pink: colors.pink,
    },
    extend: {
      fontFamily: {
        sans: ["inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },

  variants: {
    textColor: ["responsive", "hover", "focus", "group-hover"],
    margin: ["responsive", "last", "first"],
    padding: ["responsive", "last"],
  },

  plugins: [require("@tailwindcss/typography")],
}
