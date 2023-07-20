const capitalize = (string) => {
  if (typeof string !== 'string') {
    return ''
  }

  return string[0].toUpperCase() + string.slice(1)
}

const isBoundFunction = (func) => {
  return func.name.startsWith('bound ') && func.prototype == null
}

const bindAll = (obj, targetThis) => {
  const checkBindNeed = (key, value) => {
    return !obj.hasOwnProperty(key) &&
      typeof value === 'function' &&
      key !== 'constructor'
  }

  const bindAllMethods = (currentObj) => {
    const keys = Object.getOwnPropertyNames(currentObj)

    keys.forEach((key) => {
      const value = currentObj[key]

      if (!checkBindNeed(key, value)) {
        return
      }

      if (isBoundFunction(value)) {
        throw new Error(`Function ${key} is already bound!`)
      }

      obj[key] = value.bind(targetThis)
    })

    currentObj = Object.getPrototypeOf(currentObj)

    if (currentObj && currentObj !== Object.prototype) {
      bindAllMethods(currentObj)
    }
  }

  bindAllMethods(obj)
}

const throttle = (cb, timeout) => {
  let lastThis = null
  let lastArguments = []
  let hasThrottled = false
  let hasSkipped = false

  return function throttledCb(...args) {
    lastThis = this
    lastArguments = args

    if (hasThrottled) {
      hasSkipped = true

      return
    }

    cb.apply(lastThis, lastArguments)
    hasThrottled = true

    setTimeout(() => {
      hasThrottled = false

      if (hasSkipped) {
        throttledCb.apply(lastThis, lastArguments)
        hasSkipped = false
      } else {
        lastThis = null
        lastArguments = []
      }
    }, timeout)
  }
}

const debounce = (cb, ms) => {
  let timeout

  return function(...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => cb.apply(this, args), ms)
  }
}

const getRange = (a, b) => {
  const min = Math.min(a, b)
  const max = Math.max(a, b)

  return Array.from({ length: max - min + 1 }, (_, index) => min + index)
}

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const transformCamelToDash = (str) => {
  return str.replace(/([a-z]+)([A-Z][a-z]?)/g, (_, g1, g2) => `${g1}-${g2.toLowerCase()}`)
}


const getStyleCSS = (styleMap) => {
  return Object.entries(styleMap)
      .map(([name, value]) => value ? `${transformCamelToDash(name)}: ${value}` : '')
      .filter(Boolean)
      .join(';')
}

const updateNestedObj = (targetObj, obj) => {
  Object.keys(obj).forEach((key) => {
    const currentData = targetObj[key]
    const nextData = obj[key]
    targetObj[key] = { ...currentData, ...nextData }
  })
}

const copyObj = (obj) => JSON.parse(JSON.stringify(obj))

const isEqual = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b)
}

const combineArrayItemsToGroups = (array, groupLength) => {
  const groupsCount = Math.ceil(array.length / groupLength)
  let groups = new Array(groupsCount)
      .fill(Array.from({ length: groupLength }))
  array = array.toReversed()
  groups = groups.map((group) => {
    return group.map(() => array.pop()).filter((item) => item != null)
  })

  return groups
}

const getID = () => Date.now().toString()

export {
  capitalize,
  bindAll,
  throttle,
  debounce,
  getRange,
  clamp,
  getStyleCSS,
  updateNestedObj,
  copyObj,
  isEqual,
  combineArrayItemsToGroups,
  getID,
}
