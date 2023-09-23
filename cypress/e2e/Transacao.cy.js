/// <reference types="cypress" />

describe("Teste de Criação de conta", () => {
  let user = "test";
  let count = 7;
  let password = "12345";

  let destinationPay = "Teste 8"; // Alterar de acordo com o valor do count
  let destinationRequest = "Teste 7"; // Alterar de acordo com o valor do count
  let value = 1000;
  let valueRequested = 501;
  let transactionNumber = 1;
  let repeat = 2;

  context(
    "Transação para outra conta com possibilidade de loop aumentando o valor",
    () => {
      it.skip("Transferência", () => {
        cy.visit("/");
        cy.signIn(`${user}` + `${count}`, password);
        Cypress._.times(repeat, () => {
          cy.pay(destinationPay, value, transactionNumber);

          value += value;
          transactionNumber += transactionNumber;
        });
      });
    }
  );

  context("Fazer uma cobrança a outro usuário", () => {
    it.skip("Cobrança", () => {
      cy.visit("/");

      cy.signIn(`${user}` + `${count}`, password);
      Cypress._.times(repeat, () => {
        cy.requestPayment(destinationRequest, valueRequested);
      });
    });
  });

  context("Desafio", () => {
    Cypress._.times(1, () => {
      it.skip("Desafio", () => {
        cy.visit("/");

        cy.signIn(`${user}` + `${count}`, password);

        cy.pay(destinationPay, value, transactionNumber, repeat);

        cy.logout();

        count += 1;

        cy.signIn(`${user}` + `${count}`, password);

        cy.requestPayment(destinationRequest, valueRequested);

        cy.logout();

        count -= 1;

        cy.signIn(`${user}` + `${count}`, password);

        cy.get("a").contains("Mine").should("be.visible").click();

        cy.get('[class*="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-true"]')
          .should("be.visible")
          .contains("Teste 8")
          .click({ force: true });

        cy.get(".makeStyles-amountPositive-81")
          .should("be.visible")
          .contains("501");

        /// Necessário localizar onde guarda o valor da requisição e armazenar o mesmo
      });
    });
  });
});
