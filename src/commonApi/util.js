export const deepCopy = (o) => {
  if (o instanceof Array) {
    let _o = []
    for (let i = 0; i < o.length; i++) {
      _o[i] = deepCopy(o[i])
    }
    return _o
  } else if (o instanceof Object) {
    let _o = {}
    for (let i in o) {
      _o[i] = deepCopy(o[i])
    }
    return _o
  } else {
    return o
  }
}
