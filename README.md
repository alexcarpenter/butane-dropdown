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
const dropdown = new ButaneDropdown('.js-dropdown')
```

## Expected DOM structure

```html
<div class="c-dropdown">
  <button class="js-dropdown-1 c-dropdown__toggle" aria-controls="dropdown-menu">
    Example Menu
    <span aria-hidden="true">&#x25be;</span>
  </button>
  <div class="c-dropdown__menu" id="dropdown-menu">
    <button class="c-dropdown__menu-item">Menu Item 1</button>
    <button class="c-dropdown__menu-item">Menu Item 2</button>
    <button class="c-dropdown__menu-item">Menu Item 3</button>
    <button class="c-dropdown__menu-item">Menu Item 4</button>
  </div>
</div>
```

## License

[MIT](https://opensource.org/licenses/MIT). © 2017 Alex Carpenter
