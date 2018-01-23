# butane-dropdown [![butane-dropdown on NPM](https://img.shields.io/npm/v/butane-dropdown.svg?style=flat-square)](https://www.npmjs.com/package/butane-dropdown) [![Standard JavaScript Style](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)

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
  <button aria-controls="dropdown-menu" aria-haspopup="true" aria-expanded="false">
    Example Menu
  </button>
  <div id="dropdown-menu" role="menu">
    <button role="menuitem">Menu Item 1</button>
    <button role="menuitem">Menu Item 2</button>
    <button role="menuitem">Menu Item 3</button>
    <button role="menuitem">Menu Item 4</button>
  </div>
</div>
```

## Acknowledgements

This project has been heavily influenced by the work of Heydon Pickerings [inclusive-menu-button](https://github.com/Heydon/inclusive-menu-button) and Indrashish Ghoshs [micromodal](https://github.com/ghosh/micromodal). 👏🏻

## License

[MIT](https://opensource.org/licenses/MIT). © 2018 Alex Carpenter
