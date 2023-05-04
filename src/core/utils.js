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

export { capitalize, bindAll }
