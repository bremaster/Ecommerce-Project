// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'
import 'jest-canvas-mock'

// reac-slick fails without this
// https://stackoverflow.com/questions/41366380/matchmedia-not-present-when-testing-create-react-app-component-which-contain-rea
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {
        //do nothing
      },
      removeListener: function () {
        //do nothing
      },
    }
  }

// because window.dataLayer.push fails on test
window.dataLayer = {
  push: jest.fn().mockImplementation((config) => {
    config.eventCallback()
  }),
}
