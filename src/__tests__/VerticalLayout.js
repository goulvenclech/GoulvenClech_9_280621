import { screen } from "@testing-library/dom"
import router from "../app/Router.js"
import {setLocalStorage} from "../../setup-jest";
setLocalStorage('Employee')
jest.mock("../containers/Bills.js", () => {
    return jest.fn().mockImplementation(function () {
      return {getBills: async function () {
        return [];
        },
      }
  })
})

describe("Given I am connected as Employee", () => {
  describe("When I am on NewBill Page", () => {
    Object.defineProperty(window, "location", { value: { hash: "#employee/bill/new" } })
    document.body.innerHTML = `<div id="root"></div>`
    router()
    test("Then Icons should be rendered", () => {
      expect(screen.getByTestId("icon-window")).toBeTruthy()
      expect(screen.getByTestId("icon-mail")).toBeTruthy()
    })
    test("Then Newbill icon in vertical layout should be highlighted", () => {
      expect(screen.getByTestId("icon-window").classList.contains("active-icon")).not.toBeTruthy()
      expect(screen.getByTestId("icon-mail").classList.contains("active-icon")).toBeTruthy()
    })
  })
  describe("When I am on Bills Page", () => {
    Object.defineProperty(window, "location", { value: { hash: "#employee/bills" } })
    document.body.innerHTML = `<div id="root"></div>`
    router()
    test("Then Icons should be rendered", async () => {
      expect(screen.getByTestId("icon-window")).toBeTruthy()
      expect(screen.getByTestId("icon-mail")).toBeTruthy()
    })
    test("Then bill icon in vertical layout should be highlighted", () => {
      // WHY ????????
      window.location.hash = "#employee/bills";
      router()
      expect(screen.getByTestId("icon-window").classList.contains("active-icon")).toBeTruthy()
      expect(screen.getByTestId("icon-mail").classList.contains("active-icon")).not.toBeTruthy()
    })
  })
})
