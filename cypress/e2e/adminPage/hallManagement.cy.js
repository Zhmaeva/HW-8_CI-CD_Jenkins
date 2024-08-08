import loginHappyPath from "../../fixtures/loginHappyPath.json";
import selectors from "../../fixtures/selectors";

describe('Тесты для проверки админки сайта "ИДЁМВКИНО"', () => {
  beforeEach(() => {
    cy.visit('/admin/');
    cy.autorization(loginHappyPath.data.login, loginHappyPath.data.password);
  });

  it('hall management', () => {
    cy.get(selectors.hallTitle)
      .should('have.text', 'Управление залами')
      .and('have.css', 'font-size', '22px');
  });

  it('create hall', () => {
    cy.contains('Создать зал').click();
    cy.get(selectors.popupTitle)
      .should('contain', 'Добавление зала');
    cy.get(selectors.inputNewHall).type('Самый лучший зал');
    cy.get(selectors.btnNewHall).click();
    cy.get(selectors.availableHalls)
      .should('contain', 'Самый лучший зал');
  });

  it('delete hall', () => {
    const list = cy.get(selectors.listHall);
    const hallElement = list.contains('Самый лучший зал');
    const deleteButton = hallElement.find("button");
    deleteButton.click();
    cy.get(selectors.btnDeleteHall).click();
    cy.get(selectors.listHall).contains('Самый лучший зал').should('not.exist');
  });
})