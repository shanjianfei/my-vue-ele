export const setStore = (key, value) => {
  if (!key) {
    return
  }
  if (typeof(value) === 'object') {
  	value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

export const getStore = key => {
  return window.localStorage.getItem(key)
}

export const removeItem = key => {
  window.localStorage.removeItem(key)
}

export const clearStore = key => {
  window.localStorage.clear()
}
