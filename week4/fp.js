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

const hasColor = (color) => (data) => data.color === color

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

const or = (check1, check2) => (data) => check1(data) || check2(data)
const and = (check1, check2) => (data) => check1(data) && check2(data)
const any =
  (...checks) =>
  (data) =>
    checks.some((check) => check(data) === true)
const all =
  (...checks) =>
  (data) =>
    checks.every((check) => check(data) === true)

const isSquare = (figure) => figure.width === figure.height
const isBlack = hasColor('black')
const isRed = hasColor('red')

const calcArea = (figure) => figure.width * figure.height
const calcPerimeter = (figure) => (figure.width + figure.height) * 2

const findMax = (list) => Math.max(...list)
const sum = reduce((result, item) => result + item, 0)

const sumRedPerimeter = flow(filter(isRed), map(calcPerimeter), sum)

const maxBlackSquareArea = flow(
  filter(and(isBlack, isSquare)),
  map(calcArea),
  findMax
)

console.log(sumRedPerimeter(figures))
console.log(maxBlackSquareArea(figures))
