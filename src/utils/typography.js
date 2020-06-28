import Typography from "typography"

const typography = new Typography({
  baseFontSize: "18px",
  baseLineHeight: 1.5,
  googleFonts: [
    {
      name: "Roboto",
      styles: ["Light", "Regular", "Bold"],
    },
    {
      name: "Open Sans",
      styles: ["Regular"],
    },
  ],
  headerFontFamily: ["Roboto", "Open Sans", "Lato"],
  headerWeight: "Bold",
  bodyFontFamily: ["Menlo", "Monaco", "Courier New"],
  bodyWeight: "Regular",
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
