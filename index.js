var append = require("insert/append")
var remove = require("insert/remove")
var after = require("insert/after")
var prepend = require("insert/prepend")

var expand = require("reducers/expand")

module.exports = SortedList

function SortedList(elements, container) {
    var previous = []
    var childNodes = container.childNodes

    return expand(elements, function (elementList) {
        // for all previous elems
        previous.forEach(function (prev) {
            // if no-longer in list remove from container
            if (elementList.indexOf(prev) === -1) {
                if (prev.parentNode === container) {
                    remove(prev)
                }
            }
        })

        // for all current elements
        elementList.forEach(function (elem, index) {
            var currentIndex = -1
            for (var i = 0; i < childNodes.length; i++) {
                if (childNodes[i] === elem) {
                    currentIndex = i
                    break;
                }
            }

            if (currentIndex === index) {
                return
            }

            var prev = container.childNodes[index - 1]

            return prev ? after(prev, elem) : prepend(container, elem)
        })

        previous = elementList
    })
}
