# butane-dropdown

[![butane-dropdown on NPM](https://img.shields.io/npm/v/butane-dropdown.svg?style=flat-square)](https://www.npmjs.com/package/butane-dropdown) [![Standard JavaScript Style](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)

> A modern accessible dropdown library.

## Install

Install butane-dropdown, and add it to your `package.json` dev dependencies.

```
$ npm install butane-dropdown --save-dev
```

Then `import` it into the file where you'll use it.

```es6
import ButaneDropdown from 'butane-dropdown'
```

## Instantiate

```es6
ButaneDropdown.init()
```

## Expected DOM structure

Below is the minimum required elements and attributes needed. An additional styling layer is also required to show/hide tab panels via the `hidden` attribute. There are some basic example styles within docs/styles.css for reference.

```html
<div data-butane-dropdown>
  <button data-butane-dropdown-controls="dropdown-menu">
    Example Menu
  </button>
  <div id="dropdown-menu">
    <button>Menu Item 1</button>
    <button>Menu Item 2</button>
    <button>Menu Item 3</button>
    <button>Menu Item 4</button>
  </div>
</div>
```

## License

[MIT](https://opensource.org/licenses/MIT). © 2017 Alex Carpenter
