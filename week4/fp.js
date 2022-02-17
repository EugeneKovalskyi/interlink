const figures = [
  { width: 1, height: 1, color: 'red' },
  { width: 6, height: 6, color: 'green' },
  { width: 2, height: 2, color: 'black' },
  { width: 4, height: 4, color: 'black' },
  { width: 5, height: 5, color: 'black' },
  { width: 3, height: 4, color: 'red' },
  { width: 5, height: 7, color: 'red' },
  { width: 8, height: 2, color: 'red' },
  { width: 1, height: 2, color: 'green' },
  { width: 3, height: 4, color: 'blue' },
]

const defineColor = (color) => (figure) => figure.color === color

const map = (fn) => (array) => array.map(fn)
const filter = (fn) => (array) => array.filter(fn)
const reduce = (fn, initValue) => (array) => array.reduce(fn, initValue)

const flow =
  (...funcs) =>
  (value) =>
    reduce((result, fn) => fn(result), value)(funcs)

const compose =
  (...funcs) =>
  (value) =>
    reduce((result, fn) => fn(result), value)(funcs.reverse())

const or = (check1, check2) => (figure) => check1(figure) || check2(figure)
const and = (check1, check2) => (figure) => check1(figure) && check2(figure)
const any =
  (...checks) =>
  (figure) =>
    checks.some((check) => check(figure) === true)
const all =
  (...checks) =>
  (figure) =>
    checks.every((check) => check(figure) === true)

const isSquare = (figure) => figure.width === figure.height
const isBlack = (figure) => figure.color === 'black'
const isRed = (figure) => figure.color === 'red'

const countArea = (figure) => figure.width * figure.height
const countPerimeter = (figure) => (figure.width + figure.height) * 2

const findMaxArea = (areas) => Math.max(...areas)
const sumPerimeters = (perimeters) =>
  perimeters.reduce((result, perimeter) => result + perimeter)

console.log(flow(filter(isRed), map(countPerimeter), sumPerimeters)(figures))

console.log(
  flow(filter(and(isBlack, isSquare)), map(countArea), findMaxArea)(figures)
)
