import fs from "fs"
import path from "path"

import cssnano from "cssnano"
import postcss from "postcss"
import tailwindcss from "@tailwindcss/postcss"
import { HtmlBasePlugin } from "@11ty/eleventy"

// Date and time
// const { DateTime } = require("luxon")
import { parse } from "@11ty/parse-date-strings"

export default function (eleventyConfig) {
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return parse(dateObj)
  })

  eleventyConfig.addPlugin(HtmlBasePlugin)

  // Copy over folders with static assets e.g. images
  eleventyConfig.addPassthroughCopy("assets/images")
  eleventyConfig.addPassthroughCopy("assets/js")
  eleventyConfig.addPassthroughCopy({
    public: "/",
  })

  //compile tailwind before eleventy processes the files
  eleventyConfig.on("eleventy.before", async () => {
    const tailwindInputPath = path.resolve("./assets/css/styles.css")

    const tailwindOutputPath = "./dist/assets/css/styles.css"

    const cssContent = fs.readFileSync(tailwindInputPath, "utf8")

    const outputDir = path.dirname(tailwindOutputPath)
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    const result = await processor.process(cssContent, {
      from: tailwindInputPath,
      to: tailwindOutputPath,
    })

    fs.writeFileSync(tailwindOutputPath, result.css)
  })

  const processor = postcss([
    //compile tailwind
    tailwindcss(),

    //minify tailwind css
    cssnano({
      preset: "default",
    }),
  ])

  return {
    dir: {
      input: ".",
      output: "dist",
    },
    passthroughFileCopy: true,
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
  }
}
