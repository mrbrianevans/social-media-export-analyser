declare module 'assert-js' {
  class Assert {
    /**
     * @param {object} objectValue
     * @param {function} expectedInstance
     * @param {string} [message]
     */
    static instanceOf(
      objectValue: any,
      expectedInstance: any,
      message?: string
    ): void
    static instanceOneOf(
      objectValue: any,
      expectedInstances: any,
      message?: string
    ): void
    /**
     * @param {int} integerValue
     * @param {string} [message]
     */
    static integer(integerValue: any, message?: string): void
    /**
     * @param {number} numberValue
     * @param {string} [message]
     */
    static number(numberValue: any, message?: string): void
    /**
     * @param {string} stringValue
     * @param {string} [message]
     */
    static string(stringValue: string, message?: string): void
    /**
     * @param {boolean} booleanValue
     * @param {string} [message]
     */
    static boolean(booleanValue: boolean, message?: string): void
    /**
     *
     * Asserts that expression or value is equal to **true**.
     *
     * @example
     Assert.true(1 === 2); // this will throw an Error.
     let falseValue = false;
     Assert.true(falseValue); // this will throw an Error.
     * @param {boolean} value
     * @param {string} [message]
     */
    static true(value: boolean, message?: string): void
    /**
     * Asserts that expression or value is equal to **false**.
     *
     * @example

     Assert.false(1 !== 2); // this will throw an Error.
     let falseValue = true;
     Assert.false(falseValue); // this will throw an Error.

     * @param {boolean} value
     * @param {string} [message]
     */
    static false(value: boolean, message?: string): void
    /**
     * @param value
     * @param expectedValue
     * @param {string} [message]
     */
    static equal<T>(value: T, expectedValue: T, message?: string): void
    /**
     * @param {object} object
     * @param {object} expectedObject
     * @param {string} [message]
     */
    static objectEqual(object: any, expectedObject: any, message?: string): void
    /**
     * @param {object} objectValue
     * @param {string} [message]
     */
    static object(objectValue: any, message?: string): void
    /**
     * @param {string} expectedFunctionName
     * @param {object} objectValue
     * @param {string} [message]
     */
    static hasFunction(
      expectedFunctionName: any,
      objectValue: any,
      message?: string
    ): void
    /**
     * @param {string} expectedPropertyName
     * @param {object} objectValue
     * @param {string} [message]
     */
    static hasProperty(
      expectedPropertyName: any,
      objectValue: any,
      message?: string
    ): void
    /**
     * @param {array} expectedProperties
     * @param {object} objectValue
     * @param {string} [message]
     */
    static hasProperties<T extends Record<string, any>>(
      expectedProperties: (keyof T)[],
      objectValue: T,
      message?: string
    ): void
    /**
     * @param {array} arrayValue
     * @param {string} [message]
     */
    static array(arrayValue: any[], message?: string): void
    /**
     * @param {*} value
     * @param {array} expectedElements
     * @param {string} [message]
     */
    static oneOf(value: any, expectedElements: any, message?: string): void
    /**
     * @param {function} functionValue
     * @param {string} [message]
     */
    static isFunction(functionValue: Function, message?: string): void
    /**
     * @param {int} expected
     * @param {int} integerValue
     * @param {string} [message]
     */
    static greaterThan(expected: any, integerValue: any, message?: string): void
    /**
     * @param {int} expected
     * @param {int} integerValue
     * @param {string} [message]
     */
    static greaterThanOrEqual(
      expected: any,
      integerValue: any,
      message?: string
    ): void
    /**
     * @param {int} expected
     * @param {int} integerValue
     * @param {string} [message]
     */
    static lessThan(expected: any, integerValue: any, message?: string): void
    /**
     * @param {int} expected
     * @param {int} integerValue
     * @param {string} [message]
     */
    static lessThanOrEqual(
      expected: any,
      integerValue: any,
      message?: string
    ): void
    /**
     * @param {array} arrayValue
     * @param {function} expectedInstance
     * @param {string} [message]
     */
    static containsOnly(
      arrayValue: any,
      expectedInstance: any,
      message?: string
    ): void
    /**
     * @param {array} arrayValue
     * @param {string} [message]
     */
    static containsOnlyString(arrayValue: any, message?: string): void
    /**
     * @param {array} arrayValue
     * @param {string} [message]
     */
    static containsOnlyInteger(arrayValue: any, message?: string): void
    /**
     * @param {array} arrayValue
     * @param {string} [message]
     */
    static containsOnlyNumber(arrayValue: any, message?: string): void
    /**
     * @param {int} expectedCount
     * @param {array} arrayValue
     * @param {string} [message]
     */
    static count(expectedCount: any, arrayValue: any, message?: string): void
    /**
     * @param {*} value
     * @param {string} [message]
     */
    static notEmpty(value: any, message?: string): void
    /**
     * @param {int} integerValue
     * @param {string} [message]
     */
    static oddNumber(integerValue: any, message?: string): void
    /**
     * @param {int} integerValue
     * @param {string} [message]
     */
    static evenNumber(integerValue: any, message?: string): void
    /**
     * @param {string} stringValue
     * @param {string} [message]
     */
    static jsonString(stringValue: any, message?: string): void
    /**
     * @param {string} emailValue
     * @param {string} [message]
     */
    static email(emailValue: any, message?: string): void
    /**
     * @param {string} urlValue
     * @param {string} [message]
     */
    static url(urlValue: any, message?: string): void
    /**
     * @param {string} uuidValue
     * @param {string} [message]
     */
    static uuid(uuidValue: any, message?: string): void
    /**
     * @param {string} selector
     * @param {HTMLElement|HTMLDocument} htmlElement
     * @param {string} [message]
     */
    static hasElement(selector: any, htmlElement: any, message?: string): void
    /**
     * @param {string} attributeName
     * @param {HTMLElement} htmlElement
     * @param {string} [message]
     */
    static hasAttribute(
      attributeName: any,
      htmlElement: any,
      message?: string
    ): void
    /**
     * @param {array} attributes
     * @param {HTMLElement} htmlElement
     * @param {string} [message]
     */
    static hasAttributes(
      attributes: any,
      htmlElement: any,
      message?: string
    ): void
    /**
     * @param {function} callback
     * @param {object} [expectedError]
     */
    static throws(callback: any, expectedError?: Error): void
  }
  export = Assert
}
