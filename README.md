# Portfolio

My personal portfolio: 

It shows my projects, experience and skills in English and Latvian. The site is plain HTML, CSS and JavaScript with no frameworks and no build step, hosted on GitHub Pages.

## How it works

All the content is in one file, `assets/js/data.js`. Both pages read it and build the page with JavaScript, so updating the site means editing that file, not the HTML.

- Text that differs between languages is written as `{ en: "...", lv: "..." }`. Plain strings are used for both languages.
- Interface text, such as buttons and headings, is in `I18N` at the top of `assets/js/ui.js`.
- The language follows the visitor's browser and can be changed with the EN/LV button in the header. Adding `?lang=lv` or `?lang=en` to a link opens the site in that language.
- The light and dark themes follow the system setting and can be changed with the button next to it.