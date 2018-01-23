/**
 * @project - butane-dropdown
 * @author - Alex Carpenter
 * @build - 1.0.0-alpha.5
 * @copyright - Copyright (c) 2018, Alex Carpenter
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ButaneDropdown = factory());
}(this, (function () { 'use strict';

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
  'use strict';

  var FOCUSABLE_ELEMENTS = ['a[href]', 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', 'textarea:not([disabled]):not([aria-hidden])', 'button:not([disabled]):not([aria-hidden])', 'iframe', 'object', 'embed', '[contenteditable]', '[tabindex]:not([tabindex^="-"])'];

  var KEY_CODES = {
    esc: 27,
    tab: 9,
    upArrow: 38,
    downArrow: 40
  };

  var Dropdown = function () {
    function Dropdown(_ref) {
      var dropdown = _ref.dropdown,
          _ref$onHover = _ref.onHover,
          onHover = _ref$onHover === undefined ? false : _ref$onHover,
          _ref$debugMode = _ref.debugMode,
          debugMode = _ref$debugMode === undefined ? false : _ref$debugMode;
      classCallCheck(this, Dropdown);

      this.config = { debugMode: debugMode };
      console.log(this.config);
      // this.shown = false
      // this.options = options
      // this.dropdown = dropdown
      // this.trigger = this.dropdown.querySelector('[aria-controls]')
      // this.menuId = this.trigger.getAttribute('aria-controls')
      // this.menu = document.getElementById(this.menuId)

      // this.trigger.addEventListener('click', () => this.toggleDropdown())

      // this.onClick = this.onClick.bind(this)
      // this.onKeydown = this.onKeydown.bind(this)
    }

    createClass(Dropdown, [{
      key: 'addEventListeners',
      value: function addEventListeners() {
        this.trigger.addEventListener('click', this.onClick);
        document.addEventListener('keydown', this.onKeydown);
      }
    }, {
      key: 'removeEventListeners',
      value: function removeEventListeners() {
        this.trigger.removeEventListener('click', this.onClick);
        document.removeEventListener('keydown', this.onKeydown);
      }
    }, {
      key: 'toggleDropdown',
      value: function toggleDropdown() {
        this.shown ? this.hideDropdown() : this.showDropdown();
      }
    }, {
      key: 'showDropdown',
      value: function showDropdown() {
        this.activeElement = document.activeElement;
        this.shown = true;
        this.addEventListeners();
        this.trigger.setAttribute('aria-expanded', 'true');
        this.dropdown.classList.add(this.options.activeClass);
        this.setFocusToFirstNode();
      }
    }, {
      key: 'hideDropdown',
      value: function hideDropdown() {
        this.shown = false;
        this.removeEventListeners();
        this.trigger.setAttribute('aria-expanded', 'false');
        this.dropdown.classList.remove(this.options.activeClass);
        this.activeElement.focus();
      }
    }, {
      key: 'onClick',
      value: function onClick(event) {}
    }, {
      key: 'onKeydown',
      value: function onKeydown(event) {
        if (event.keyCode === KEY_CODES.esc) this.hideDropdown(event);
        if (event.keyCode === KEY_CODES.tab) this.maintainFocus(event);
      }
    }, {
      key: 'getFocusableNodes',
      value: function getFocusableNodes() {
        var nodes = this.dropdown.querySelectorAll(FOCUSABLE_ELEMENTS);
        return Object.keys(nodes).map(function (key) {
          return nodes[key];
        });
      }
    }, {
      key: 'setFocusToFirstNode',
      value: function setFocusToFirstNode() {
        var focusableNodes = this.getFocusableNodes();
        if (focusableNodes.length) focusableNodes[1].focus();
      }
    }, {
      key: 'maintainFocus',
      value: function maintainFocus(event) {
        var focusableNodes = this.getFocusableNodes();

        var focusedItemIndex = focusableNodes.indexOf(document.activeElement);

        if (event.shiftKey && focusedItemIndex === 0) {
          focusableNodes[focusableNodes.length - 1].focus();
          event.preventDefault();
        }

        if (!event.shiftKey && focusedItemIndex === focusableNodes.length - 1) {
          focusableNodes[0].focus();
          event.preventDefault();
        }
      }
    }]);
    return Dropdown;
  }();

  var init = function init(config) {
    var options = Object.assign({}, { dropdownAttr: 'data-butane-dropdown' }, config);

    // const dropdowns = [...document.querySelectorAll(`[${options.dropdownAttr}]`)]

    dropdowns.forEach(function (dropdown) {
      new Dropdown(options);
    });
  };

  return { init: init };
}();

return ButaneDropdown;

})));
