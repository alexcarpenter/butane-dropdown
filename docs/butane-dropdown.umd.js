(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ButaneDropdown = factory());
}(this, (function () { 'use strict';

var keyCodes = {
  esc: 27,
  tab: 9,
  upArrow: 38,
  rightArrow: 39,
  downArrow: 40,
  leftArrow: 37
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var ButaneDropdown = function () {
  function ButaneDropdown(element) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, ButaneDropdown);

    if (!element) {
      throw new Error('Element reference is required.');
    }

    this.buttonElement = document.querySelector(element);

    if (!this.buttonElement) {
      throw new Error('Element not found.');
    }

    this.options = {
      menuActiveClass: options.menuActiveClass ? options.menuActiveClass : 'is-active'
    };

    this.menuWrapper = this.buttonElement.parentNode;

    // Set the initial button aria values
    this.buttonElement.setAttribute('aria-haspopup', true);
    this.buttonElement.setAttribute('aria-expanded', false);

    this.menuId = this.buttonElement.getAttribute('aria-controls');
    this.menu = document.getElementById(this.menuId);

    // If the menu doesn't exist, exit with
    // an error referencing the missing menu's id
    if (!this.menu) {
      throw new Error('Element #' + this.menuId + ' not found.');
    }

    // Set the initial menu aria values
    this.menu.setAttribute('role', 'menu');

    // Hide the menu
    this.menu.hidden = true;

    // Collect the menu item buttons
    this.menuItems = this.menu.querySelectorAll('button');

    if (this.menuItems.length < 1) {
      throw new Error('The #' + this.menuId + ' menu has no menu items');
    }

    Array.from(this.menuItems).forEach(function (item) {
      item.setAttribute('role', 'menuitem');
    });

    this.menuItemFirst = this.menuItems[0];
    this.menuItemLast = this.menuItems[this.menuItems.length - 1];

    // Prebind the functions that will be bound in
    // addEventListener and removeEventListener to
    // avoid losing references
    this._toggleDropdown = this.toggleDropdown.bind(this);
    this._showDropdown = this.showDropdown.bind(this);
    this._hideDropdown = this.hideDropdown.bind(this);
    this._bindKeyPress = this.bindKeyPress.bind(this);

    this.buttonElement.addEventListener('click', this._toggleDropdown);
  }

  createClass(ButaneDropdown, [{
    key: 'toggleDropdown',
    value: function toggleDropdown() {
      // const menuShown = this.buttonElement.getAttribute('aria-expanded') === 'true'
      return this.menu.hidden ? this._showDropdown() : this._hideDropdown();
    }
  }, {
    key: 'showDropdown',
    value: function showDropdown() {
      this.menu.hidden = false;
      this.buttonElement.setAttribute('aria-expanded', true);
      this.menuWrapper.classList.add(this.options.menuActiveClass);
      this.menuItemFirst.focus();

      this.buttonElement.addEventListener('click', this._hideDropdown);
      this.buttonElement.removeEventListener('click', this._showDropdown);
      document.addEventListener('keydown', this._bindKeyPress);
    }
  }, {
    key: 'hideDropdown',
    value: function hideDropdown() {
      this.menu.hidden = true;
      this.buttonElement.setAttribute('aria-expanded', false);
      this.menuWrapper.classList.remove(this.options.menuActiveClass);
      this.buttonElement.focus();

      this.buttonElement.removeEventListener('click', this._hideDropdown);
      this.buttonElement.addEventListener('click', this._showDropdown);
      document.removeEventListener('keydown', this._bindKeyPress);
    }
  }, {
    key: 'bindKeyPress',
    value: function bindKeyPress(e) {
      var which = e.which;
      var target = e.target;

      // Go to previous/next menu items or loop
      // around to first/last menu item. Close
      // menu when esc or tab is pressed.
      switch (which) {
        case keyCodes.downArrow:
        case keyCodes.rightArrow:
          var menuItemLastActive = target === this.menuItemLast;
          menuItemLastActive ? this.menuItemFirst.focus() : target.nextElementSibling.focus();
          break;
        case keyCodes.upArrow:
        case keyCodes.leftArrow:
          var menuItemFirstActive = target === this.menuItemFirst;
          menuItemFirstActive ? this.menuItemLast.focus() : target.previousElementSibling.focus();
          break;
        case keyCodes.esc:
        case keyCodes.tab:
          this._hideDropdown();
          break;
      }
    }
  }]);
  return ButaneDropdown;
}();

return ButaneDropdown;

})));
