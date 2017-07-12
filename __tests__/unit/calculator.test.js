const calculator = require('../../lib/calculator')

/* toBe toEqual .not. toBeNull toBeDefined toBeTruthy toBeFalsy toMatch
  toThrow toContain toMatch beforeAll test.only
*/

describe('calculator', function () {
  const stream = (characters, calculatorState = calculator.initialState) =>
    !characters
      ? calculatorState
      : stream(characters.slice(1),
               calculator.nextState(calculatorState, characters[0]))

  test('should show initial display correctly', () => {
    expect(calculator.initialState.display).toBe('0')
  })

  test('should replace 0 in initialState', () => {
    expect(stream('4').display).toBe('4')
  })

  test('should add a digit if not in initial state', () => {
    expect(stream('34').display).toBe('34')
  })

  describe('operators & computing', function () {
    test('should not change display if operator appears', () => {
      expect(stream('3+').display).toBe('3')
    })

    test('should change display to digit when digit appears after operator', () => {
      expect(stream('37+4').display).toBe('4')
    })

    test('should compute 37+42= to be 79', () => {
      expect(stream('37+42=').display).toBe('79')
    })

    test('should compute another expression after "="', () => {
      expect(stream('1+2=4*5=').display).toBe('20')
    })

    test('should enabling using computation result in next computation', () => {
      expect(stream('1+2=*5=').display).toBe('15')
    })

    test('second operator is also an equal', () => {
      expect(stream('1+2*').display).toBe('3')
    })

    test('second operator is also an equal but it can continue after that', () => {
      expect(stream('1+2*11=').display).toBe('33')
    })

    test('+42= should compute to 42', () => {
      expect(stream('+42=').display).toBe('42')
    })

    test('*42= should compute to 0', () => {
      expect(stream('*42=').display).toBe('0')
    })

    test('47-48= should compute to -1', () => {
      expect(stream('47-48=').display).toBe('-1')
    })

    test('8/2= should compute to 4', () => {
      expect(stream('8/2=').display).toBe('4')
    })
  })

  describe('clear button', function () {
    let state = null
    beforeEach(function () {
      state = stream('4+2=')
    })

    test('should set display to 6', function () {
      expect(state.display).toBe('6')
    })

    test('should set calculator state to new initialState', function () {
      const newState = stream('c')
      expect(newState.display).toBe('0')
      expect(newState.dispaly).not.toBe(state.display)
    })
  })
})
