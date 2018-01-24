const ButaneDropdown = (() => {
  const FOCUSABLE_ELEMENTS = [
    'a[href]',
    'button:not([disabled]):not([aria-hidden])',
    '[tabindex]:not([tabindex^="-"])'
  ]

  const KEY_CODES = {
    esc: 27,
    tab: 9,
    upArrow: 38,
    downArrow: 40
  }

  class Dropdown {
    constructor (dropdown, {
      activeClass = 'is-active',
      onShow = () => {},
      onHide = () => {},
      onSelect = () => {}
    }) {
      this.config = { activeClass, onShow, onHide, onSelect }
      this.shown = false
      this.dropdown = dropdown
      this.trigger = this.dropdown.querySelector('[aria-controls]')
      this.menuId = this.trigger.getAttribute('aria-controls')
      this.menu = document.getElementById(this.menuId)
      this.menu.hidden = true

      this.trigger.addEventListener('click', () => this.toggleDropdown())

      this.onClickOutside = this.onClickOutside.bind(this)
      this.onKeydown = this.onKeydown.bind(this)
    }

    addEventListeners () {
      this.menu.addEventListener('click', (event) => this.config.onSelect(event))
      // document.addEventListener('click', this.onClickOutside)
      document.addEventListener('keydown', this.onKeydown)
    }

    removeEventListeners () {
      this.menu.removeEventListener('click', (event) => this.config.onSelect(event))
      // document.addEventListener('click', this.onClickOutside)
      document.removeEventListener('keydown', this.onKeydown)
    }

    toggleDropdown () {
      this.shown ? this.hideDropdown() : this.showDropdown()
    }

    showDropdown () {
      this.activeElement = document.activeElement
      this.shown = true
      this.addEventListeners()
      this.trigger.setAttribute('aria-expanded', 'true')
      this.dropdown.classList.add(this.config.activeClass)
      this.menu.hidden = false
      this.setFocusToFirstNode()
      this.config.onShow(this.dropdown, event)
    }

    hideDropdown () {
      this.shown = false
      this.removeEventListeners()
      this.trigger.setAttribute('aria-expanded', 'false')
      this.dropdown.classList.remove(this.config.activeClass)
      this.menu.hidden = true
      this.activeElement.focus()
      this.config.onHide(this.dropdown, event)
    }

    onClickOutside (event) {
      const target = event.target
      if (!this.menu.contains(target) && !this.trigger.contains(target)) {
        this.hideDropdown()
      }
    }

    onKeydown (event) {
      if (event.keyCode === KEY_CODES.esc) this.hideDropdown(event)
      if (event.keyCode === KEY_CODES.tab) this.maintainFocus(event)
    }

    getFocusableNodes () {
      const nodes = this.dropdown.querySelectorAll(FOCUSABLE_ELEMENTS)
      return Object.keys(nodes).map(key => nodes[key])
    }

    setFocusToFirstNode () {
      const focusableNodes = this.getFocusableNodes()
      if (focusableNodes.length) focusableNodes[1].focus()
    }

    maintainFocus (event) {
      const focusableNodes = this.getFocusableNodes()

      const focusedItemIndex = focusableNodes.indexOf(document.activeElement)

      if (event.shiftKey && focusedItemIndex === 0) {
        focusableNodes[focusableNodes.length - 1].focus()
        event.preventDefault()
      }

      if (!event.shiftKey && focusedItemIndex === focusableNodes.length - 1) {
        focusableNodes[0].focus()
        event.preventDefault()
      }
    }
  }

  const init = config => {
    const options = Object.assign({}, { dropdownAttr: 'data-butane-dropdown' }, config)

    const dropdowns = Array.from(document.querySelectorAll(`[${options.dropdownAttr}]`))

    dropdowns.forEach(dropdown => {
      new Dropdown(dropdown, options)
    })
  }

  return { init }
})()

export default ButaneDropdown
