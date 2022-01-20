let env = process.env.ELEVENTY_ENV

// RSS imports
const absoluteUrl = require("@11ty/eleventy-plugin-rss/src/absoluteUrl")

// Date and time
const { DateTime } = require("luxon")

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd")
  })

  eleventyConfig.addNunjucksFilter("absoluteUrl", (href, base) =>
    absoluteUrl(href, base),
  )

  // compress and combine js files
  eleventyConfig.addFilter("jsmin", require("./utils/minify-js.js"))

  // minify the html output when running in prod
  if (process.env.NODE_ENV == "production") {
    eleventyConfig.addTransform("htmlmin", require("./utils/minify-html.js"))
  }

  // Copy over folders with static assets e.g. images
  eleventyConfig.addPassthroughCopy(".well-known")
  eleventyConfig.addPassthroughCopy("assets/icons")
  eleventyConfig.addPassthroughCopy("assets/images")
  eleventyConfig.addPassthroughCopy("assets/js")
  eleventyConfig.addPassthroughCopy({
    "assets/favicons": "/",
  })

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "dist",
    },
    passthroughFileCopy: true,
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
  }
}
