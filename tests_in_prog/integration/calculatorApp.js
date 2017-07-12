const {jsdom} = require('jsdom')
const React = require('react')
const e = React.createElement
const ReactDom = require('react-dom')
const CalculatorApp = require('../../lib/calculator-app')

describe('calculator app component', function () {
  beforeAll(function () {
    global.document = jsdom(`<!doctype html><html><body><div id="container"/></div></body></html>`)
    global.window = document.defaultView
  })

  afterAll(function () {
    delete global.window
    delete global.document
  })

  it('should work', function () {
    ReactDom.render(e(CalculatorApp), document.getElementById('container'))

    const displayElement = document.querySelector('.display')

    expect(displayElement.textContent).toBe('0')

    const digit4Element = document.querySelector('.digit-4')
    const digit2Element = document.querySelector('.digit-2')
    const operatorMultiply = document.querySelector('.operator-multiply')
    const operatorEquals = document.querySelector('.operator-equals')

    digit4Element.click()
    digit2Element.click()
    operatorMultiply.click()
    digit2Element.click()
    operatorEquals.click()

    expect(displayElement.textContent).toBe('84')
  })
})
