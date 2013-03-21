var test = require("tape")
var h = require("hyperscript")

var event = require("event/event")
var send = require("event/send")
var fold = require("reducers/fold")

var SortedList = require("../index")

test("SortedList is a function", function (assert) {
    assert.equal(typeof SortedList, "function")
    assert.end()
})

test("can give it multiple lists and sorts correctly", function (assert) {
    var source = event()
    var container = h("div")
    var one = h("div", "one")
    var two = h("div", "two")
    var three = h("div", "three")
    var four = h("div", "four")

    var list = SortedList(source, container)

    fold(list, function () {})

    assert.deepEqual(text(), [])

    send(source, [one])

    assert.deepEqual(text(), ["one"])

    send(source, [two, one])

    assert.deepEqual(text(), ["two", "one"])

    send(source, [two, three, one])

    assert.deepEqual(text(), ["two", "three", "one"])

    send(source, [two, one])

    assert.deepEqual(text(), ["two", "one"])

    send(source, [two, one, three])

    assert.deepEqual(text(), ["two", "one", "three"])

    send(source, [one, two, three])

    assert.deepEqual(text(), ["one", "two", "three"])

    send(source, [three, two, four, one])

    assert.deepEqual(text(), ["three", "two", "four", "one"])

    assert.end()

    function text() {
        return [].slice.call(container.childNodes).map(function (elem) {
            return elem.textContent
        })
    }
})
