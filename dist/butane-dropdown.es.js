var ButaneDropdown = (function () {
    var FOCUSABLE_ELEMENTS = ['a[href]','input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
        'textarea:not([disabled]):not([aria-hidden])','button:not([disabled]):not([aria-hidden])',
        'iframe','object','embed','[contenteditable]','[tabindex]:not([tabindex^="-"])'];
    var KEY_CODES = {
        esc: 27,
        tab: 9,
        upArrow: 38,
        downArrow: 40
    };
    var Dropdown = function Dropdown(dropdown, ref) {
        var this$1 = this;
        var activeClass = ref.activeClass; if ( activeClass === void 0 ) activeClass = 'is-active';
        var onShow = ref.onShow; if ( onShow === void 0 ) onShow = function () {};
        var onHide = ref.onHide; if ( onHide === void 0 ) onHide = function () {};
        var onSelect = ref.onSelect; if ( onSelect === void 0 ) onSelect = function () {};

        this.config = {
            activeClass: activeClass,
            onShow: onShow,
            onHide: onHide,
            onSelect: onSelect
        };
        this.shown = false;
        this.dropdown = dropdown;
        this.trigger = this.dropdown.querySelector('[aria-controls]');
        this.menuId = this.trigger.getAttribute('aria-controls');
        this.menu = document.getElementById(this.menuId);
        this.menu.hidden = true;
        this.trigger.addEventListener('click', function () { return this$1.toggleDropdown(); });
        this.onClickOutside = this.onClickOutside.bind(this);
        this.onKeydown = this.onKeydown.bind(this);
    };
    Dropdown.prototype.addEventListeners = function addEventListeners () {
            var this$1 = this;

        this.menu.addEventListener('click', function (event) { return this$1.config.onSelect(event); });
        document.addEventListener('keydown', this.onKeydown);
    };
    Dropdown.prototype.removeEventListeners = function removeEventListeners () {
            var this$1 = this;

        this.menu.removeEventListener('click', function (event) { return this$1.config.onSelect(event); });
        document.removeEventListener('keydown', this.onKeydown);
    };
    Dropdown.prototype.toggleDropdown = function toggleDropdown () {
        this.shown ? this.hideDropdown() : this.showDropdown();
    };
    Dropdown.prototype.showDropdown = function showDropdown () {
        this.activeElement = document.activeElement;
        this.shown = true;
        this.addEventListeners();
        this.trigger.setAttribute('aria-expanded', 'true');
        this.dropdown.classList.add(this.config.activeClass);
        this.menu.hidden = false;
        this.setFocusToFirstNode();
        this.config.onShow(this.dropdown, event);
    };
    Dropdown.prototype.hideDropdown = function hideDropdown () {
        this.shown = false;
        this.removeEventListeners();
        this.trigger.setAttribute('aria-expanded', 'false');
        this.dropdown.classList.remove(this.config.activeClass);
        this.menu.hidden = true;
        this.activeElement.focus();
        this.config.onHide(this.dropdown, event);
    };
    Dropdown.prototype.onClickOutside = function onClickOutside (event) {
        var target = event.target;
        if (!this.menu.contains(target) && !this.trigger.contains(target)) {
            this.hideDropdown();
        }
    };
    Dropdown.prototype.onKeydown = function onKeydown (event) {
        if (event.keyCode === KEY_CODES.esc) 
            { this.hideDropdown(event); }
        if (event.keyCode === KEY_CODES.tab) 
            { this.maintainFocus(event); }
    };
    Dropdown.prototype.getFocusableNodes = function getFocusableNodes () {
        var nodes = this.dropdown.querySelectorAll(FOCUSABLE_ELEMENTS);
        return Object.keys(nodes).map(function (key) { return nodes[key]; });
    };
    Dropdown.prototype.setFocusToFirstNode = function setFocusToFirstNode () {
        var focusableNodes = this.getFocusableNodes();
        if (focusableNodes.length) 
            { focusableNodes[1].focus(); }
    };
    Dropdown.prototype.maintainFocus = function maintainFocus (event) {
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
    };
    var init = function (config) {
        var options = Object.assign({}, {
            dropdownAttr: 'data-butane-dropdown'
        }, config);
        var dropdowns = Array.from(document.querySelectorAll(("[" + (options.dropdownAttr) + "]")));
        dropdowns.forEach(function (dropdown) {
            new Dropdown(dropdown, options);
        });
    };
    return {
        init: init
    };
})();

export default ButaneDropdown;
//# sourceMappingURL=butane-dropdown.es.js.map
