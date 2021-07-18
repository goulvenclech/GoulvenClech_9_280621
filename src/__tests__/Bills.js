import { screen } from "@testing-library/dom"
import BillsUI from "../views/BillsUI.js"
import { bills } from "../fixtures/bills.js"

describe("Given I am connected as an employee", () => {
  describe("When I am on Bills Page", () => {
    describe("and there are Bills", () => {
      test("Then bill icon in vertical layout should be highlighted", () => {
        const html = BillsUI({ data: []})
        document.body.innerHTML = html
        //to-do write expect expression
      })
      test("Then bills should be ordered from earliest to latest", () => {
        const html = BillsUI({ data: bills })
        document.body.innerHTML = html
        const dates = screen.getAllByText(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i).map(a => a.innerHTML)
        const antiChrono = (a, b) => ((a < b) ? 1 : -1)
        const datesSorted = [...dates].sort(antiChrono)
        expect(dates).toEqual(datesSorted)
      })
    })
    describe("But it is loading", () => {
      test("Then, Loading page should be rendered", () => {
        document.body.innerHTML = BillsUI({ loading: true });
        expect(screen.getAllByText("Loading...")).toBeTruthy();
      });
    });
    describe("But an error occure", () => {
      test("Then, Error page should be rendered", () => {
        document.body.innerHTML = BillsUI({ error: "oops an error" });
        expect(screen.getAllByText("Erreur")).toBeTruthy();
      });
    });
  })
})