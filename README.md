# sorted-list

[![build status][1]][2] [![dependency status][3]][4]

[![browser support][5]][6]

Render a reducible of sorted lists

## Example

```js
var SortedList = require("sorted-list")
var foldp = require("reducers/reductions")
var map = require("reducers/map")
var fold = require("reducers/fold")

// Accumulate a state representation of a list
var state = foldp(input, function (list, event) {
    if (event.type === "add") {
        return list.concat(event.value)
    }
    return list
})

// make sure it's sorted! and that's it's a list of elements
var sorted = map(state, function (list) {
    return list.sort(function (a, b) {
        return a.timestamp < b.timestamp ? -1 : 1
    }).map(function (x) {
        return x.view
    })
})

var container = document.getElementById("some-container")

// SortedList will ensure it's all in there correctly in
// order of your array
var list = SortedList(sorted, container)

// make sure to fold reducible somewhere!
fold(list, function () {})
```

## Installation

`npm install sorted-list`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Colingo/sorted-list.png
  [2]: http://travis-ci.org/Colingo/sorted-list
  [3]: https://david-dm.org/Colingo/sorted-list/status.png
  [4]: https://david-dm.org/Colingo/sorted-list
  [5]: https://ci.testling.com/Colingo/sorted-list.png
  [6]: https://ci.testling.com/Colingo/sorted-list
