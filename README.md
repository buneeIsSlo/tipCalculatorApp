# Tip calculator app

Hi! This is my solution to the [Tip calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/tip-calculator-app-ugJNGbJUX).

## Live Site URL
https://buneeisslo.github.io/tipCalculatorApp/


### Built with
- Not so semantic HTML5 markup
- CSS
- Mobile first workflow
- Javascript
- [Node.js](https://nodejs.org/en/) 
- [Webpack](https://webpack.js.org/)
- [Anime.js](https://animejs.com/)

### What I learned
- Basics of [Node.js](https://nodejs.org/en/)
- [Webpack](https://webpack.js.org/) and some of its helplful plugins
- Importing and exporting javascript files 
- How to effectively use the data tag in HTML
- Animating SVGs with [Anime.js](https://animejs.com/)
- **Tips and Tricks**
  - Align text to right using `direction: rtl` to be able to use the `text-indent` property. Credit: [Stackoverflow Answer](https://stackoverflow.com/a/4844724)
  - One way to achieve curved outline on inputs, `box-shadow: 1 1 1 1pt green`. Credit: [Stackoverflow Answer](https://stackoverflow.com/a/6810937)
  - Focus can be added to a `div` element using `tabindex`. eg: `tabindex=0`
  - A `button` element can be disabled using the `:disabled` pseudo class
  - Manipulate a dynamically linked SVG using `getSVGDocument()` method

### Resources 
- [Video tutorial on creating SVG text stroke animation using anime.js](https://www.youtube.com/watch?v=aI9BZI8bf_Y)
- [Website to create beautiful CSS background patterns](https://www.magicpattern.design/tools/css-backgrounds)
- [Video tutorial on getting started with webpack 5](https://www.youtube.com/watch?v=9c3dBhvtt6o)
- [Video tutorial on creating the Toggle theme animation using anime.js](https://www.youtube.com/watch?v=bfaPnlYE8Jo)
- [Useful stackoverflow thread related to getSVGDocument method](https://stackoverflow.com/questions/337293/how-to-check-if-an-embedded-svg-document-is-loaded-in-an-html-page)

### Acknowledgement 
1. I'd like to thank [@tediko](https://github.com/tediko) for writing clean and understandable code. [This solution](https://github.com/tediko/calculator-app) from him was extremely vital in coding my application.
2. Shout out to [@Syafiqjos](https://github.com/Syafiqjos). I found a very useful trick to limit user input from [His solution](https://github.com/Syafiqjos/frontendmentor.io-solution/tree/main/Intermediate/CalculatorApp) to the same challenge. 