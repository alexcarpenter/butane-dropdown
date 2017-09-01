const keyCodes = {
  esc: 27,
  tab: 9,
  upArrow: 38,
  rightArrow: 39,
  downArrow: 40,
  leftArrow: 37
};

class ButaneDropdown {
  constructor (element) {
    if (!element) {
      throw new Error(`Element reference is required.`)
    }

    this.dropdown = element;
    this.dropdownButton = this.dropdown.querySelector('[data-butane-dropdown-controls]');
    this.dropdownMenuId = this.dropdownButton.getAttribute('data-butane-dropdown-controls');

    if (!this.dropdownButton) {
      throw new Error('No dropdown button found.')
    }

    // Set the initial button aria values
    this.dropdownButton.setAttribute('aria-haspopup', true);
    this.dropdownButton.setAttribute('aria-expanded', false);
    this.dropdownButton.setAttribute('aria-controls', this.dropdownMenuId);

    this.menu = this.dropdown.querySelector(`#${this.dropdownMenuId}`);

    // If the menu doesn't exist, exit with
    // an error referencing the missing menu's id
    if (!this.menu) {
      throw new Error(`Element #${this.menuId} not found.`)
    }

    // Set the initial menu aria values
    this.menu.setAttribute('role', 'menu');

    // Hide the menu
    this.menu.hidden = true;

    // Collect the menu item buttons
    this.menuItems = this.menu.querySelectorAll('button');

    if (this.menuItems.length < 1) {
      throw new Error(`The #${this.menuId} menu has no menu items`)
    }

    Array.from(this.menuItems).forEach(item => {
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

    this.dropdownButton.addEventListener('click', this._toggleDropdown);
    this.dropdown.addEventListener('keydown', this._bindKeyPress);
  }

  toggleDropdown () {
    return this.menu.hidden ? this._showDropdown() : this._hideDropdown()
  }

  showDropdown () {
    this.dropdown.classList.add('is-active');
    this.dropdownButton.setAttribute('aria-expanded', true);
    this.menu.hidden = false;
    this.menuItemFirst.focus();
  }

  hideDropdown () {
    this.dropdown.classList.remove('is-active');
    this.dropdownButton.setAttribute('aria-expanded', false);
    this.menu.hidden = true;
    this.dropdownButton.focus();
  }

  bindKeyPress (e) {
    const which = e.which;
    const target = e.target;

    // Go to previous/next menu items or loop
    // around to first/last menu item. Close
    // menu when esc or tab is pressed.
    switch (which) {
      case keyCodes.downArrow:
      case keyCodes.rightArrow:
        const menuItemLastActive = target === this.menuItemLast;
        menuItemLastActive ? this.menuItemFirst.focus() : target.nextElementSibling.focus();
        break
      case keyCodes.upArrow:
      case keyCodes.leftArrow:
        const menuItemFirstActive = target === this.menuItemFirst;
        menuItemFirstActive ? this.menuItemLast.focus() : target.previousElementSibling.focus();
        break
      case keyCodes.esc:
      case keyCodes.tab:
        this._hideDropdown();
        break
    }
  }
}

const init = () => {
  const butaneDropdowns = document.querySelectorAll('[data-butane-dropdown]');
  butaneDropdowns.forEach(dropdown => {
    new ButaneDropdown(dropdown);
  });
};

var main = { init };

export default main;
