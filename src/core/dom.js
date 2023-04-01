class Dom {

}

export const $ = function() {
  return new Dom()
}

$.create = function(tagName, className) {
  const $el = document.createElement(tagName)
  $el.className = className
  return $el
}
