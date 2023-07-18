class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string' ?
      document.querySelector(selector) :
      selector

    if (!this.$el) {
      throw new Error(`Dom instance doesn't have $el!`)
    }
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }

    return this.$el.outerHTML.trim()
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  clear() {
    this.html('')

    return this
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }

    this.$el.append(node)

    return this
  }

  find(selector) {
    return $(this.$el.querySelector(selector))
  }

  text(text) {
    const property = this.$el.tagName === 'INPUT' ? 'value' : 'textContent'

    if (typeof text === 'string') {
      this.$el[property] = text

      return this
    }


    return this.$el[property]
  }

  attr(name, value) {
    if (value) {
      this.$el.setAttribute(name, value)

      return this
    }

    return this.$el.getAttribute(name)
  }
}

export const $ = function(selector) {
  return new Dom(selector)
}

$.create = function(tagName = 'div', className = '') {
  const $el = document.createElement(tagName)
  $el.className = className

  return $($el)
}
