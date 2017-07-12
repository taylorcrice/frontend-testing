const path = require('path')
const express = require('express')
const retry = require('promise-retry')
const {prepareDriver, cleanupDriver} = require('../utils/browser-automation')
const {By} = require('selenium-webdriver')

describe('calculator app', function () {
  let driver
  let server

  this.timeout(60000)

  beforeAll((done) => {
    const app = express()
    app.use('/', express.static(path.resolve(__dirname, '../../dist')))
    server = app.listen(8080, done)
  })
  after(() => {
    server.close()
  })

  beforeAll(async () => {
    driver = await prepareDriver()
  })
  afterAll(() => cleanupDriver(driver))

  it('should work', async function () {
    await driver.get('http://localhost:8080')

    await retry(async () => {
      const title = await driver.getTitle()

      expect(title).toBe('Calculator')
    })

    await retry(async () => {
      const displayElement = await driver.findElement(By.css('.display'))
      const displayText = await displayElement.getText()

      expect(displayText).toBe('0')
    })

    const digit4Element = await driver.findElement(By.css('.digit-4'))
    const digit2Element = await driver.findElement(By.css('.digit-2'))
    const operatorMultiply = await driver.findElement(By.css('.operator-multiply'))
    const operatorEquals = await driver.findElement(By.css('.operator-equals'))

    await digit4Element.click()
    await digit2Element.click()
    await operatorMultiply.click()
    await digit2Element.click()
    await operatorEquals.click()

    await retry(async () => {
      const displayElement = await driver.findElement(By.css('.display'))
      const displayText = await displayElement.getText()

      expect(displayText).toBe('84')
    })
  })
})
