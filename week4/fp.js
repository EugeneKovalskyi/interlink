const flow = function (...functions) {
  return function (value) {
    return functions.reduce(function (res, fn) {
      return fn(res)
    }, value)
  }
}

const figures = [
  { width: 1, height: 1, color: 'red' },
  { width: 2, height: 3, color: 'green' },
  { width: 4, height: 5, color: 'blue' },
]

function defineColor(color) {
  return function (figure) {
    return figure.color === color
  }
}

function map(array, fn) {
  const newArray = []

  for (let index = 0; index < array.length; index++)
    newArray.push(fn(array[index], index, array))

  return newArray

  // return array.map(fn)
}

function filter(array, fn) {
  const newArray = []

  for (let index = 0; index < array.length; index++)
    if (fn(item, index, array)) newArray.push(item)

  return newArray
}

function reduce(array, fn, initValue) {
  let accumulator = initValue || array[0]
  let index = initValue ? 0 : 1

  for (; index < array.length; index++)
    accumulator = fn(accumulator, array[index], index, array)

  return accumulator
}

function flow(...functions) {
  return function (value) {
    return reduce(
      functions,
      function (accumulator, fn) {
        return fn(accumulator)
      },
      value
    )
  }
}

function compose(...functions) {
  return function (value) {
    return reduce(
      functions.reverse(),
      function (accumulator, fn) {
        return fn(accumulator)
      },
      value
    )
  }
}
