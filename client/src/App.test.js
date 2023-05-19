import validateEmail from './utils/validateEmail';

describe("Test validate email function", () => {
  it("valid email", () => {
    expect(validateEmail("test@gmail.com")).toBe(true)
  })
  it("string with no @", () => {
    expect(validateEmail("testgmail.com")).toBe(false)
  })
  it("string with no .", () => {
    expect(validateEmail("test@gmailcom")).toBe(false)
  })
  it("an integer is passed in", () => {
    expect(validateEmail(0)).toBe(false)
  })
})