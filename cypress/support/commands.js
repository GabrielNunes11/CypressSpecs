/// <reference types="cypress" />

/// Comando para criação de conta no sistema.
Cypress.Commands.add(
  "signUp",
  (firstName, lastName, username, password, confirmPassword) => {
    cy.get("a")
      .contains("Don't have an account? Sign Up")
      .should("be.visible")
      .click();

    cy.get("#firstName").should("be.visible").type(firstName);
    cy.get("#lastName").should("be.visible").type(lastName);
    cy.get("#username").should("be.visible").type(username);
    cy.get("#password").should("be.visible").type(password, { log: false });
    cy.get("#confirmPassword")
      .should("be.visible")
      .type(confirmPassword, { log: false });

    cy.get("span").contains("Sign Up").should("be.visible").click();
  }
);

/// Comando para fazer Login no sistema.
Cypress.Commands.add("signIn", (username, password) => {
  cy.get("#username").should("be.visible").type(username);
  cy.get("#password").should("be.visible").type(password, { log: false });
  cy.get("button[type='submit'")
    .contains("Sign In")
    .should("be.visible")
    .click();
});

/// Comando para criação de banco ao primeiro acesso no sistema.
Cypress.Commands.add("createBank", (bankName, routingNumber, accountNumber) => {
  cy.visit("/");

  cy.get("span").contains("Next").should("be.visible").click();

  cy.get("#bankaccount-bankName-input").should("be.visible").type(bankName);
  cy.get("#bankaccount-routingNumber-input")
    .should("be.visible")
    .type(routingNumber);
  cy.get("#bankaccount-accountNumber-input")
    .should("be.visible")
    .type(accountNumber);
});

/// Comando para fazer Logout no sistema
Cypress.Commands.add("logout", () => {
  cy.visit("/");

  cy.get("span").contains("Logout").should("be.visible").click();
});

/// Comando para fazer pagamento a outro usuário com loop e atribuiçao se necessário.
Cypress.Commands.add("pay", (destinationPay, value, transaction) => {
  cy.visit("/");

  cy.get("a").contains("New").should("be.visible").click();

  cy.get("li").should("be.visible").contains(destinationPay).click();

  cy.get("#amount").should("be.visible").type(value);

  cy.get("#transaction-create-description-input")
    .should("be.visible")
    .type("transação nº " + transaction);

  cy.get("button").should("be.visible").contains("Pay").click();

  cy.get("h2").should("be.visible").contains("Paid");

  cy.get("span")
    .should("be.visible")
    .contains("Create Another Transaction")
    .click();
});

/// Comando para fazer uma cobrança a outro usuário.
Cypress.Commands.add("requestPayment", (destinationRequest, valueRequested) => {
  cy.visit("/");

  cy.get("a").contains("Notifications").should("be.visible").click();

  cy.get("a").contains("New").should("be.visible").click();

  cy.get("li").should("be.visible").contains(destinationRequest).click();

  cy.get("#amount").should("be.visible").type(valueRequested);

  cy.get("#transaction-create-description-input")
    .should("be.visible")
    .type("Me paga");

  cy.get("button").should("be.visible").contains("Request").click();

  cy.get("span")
    .should("be.visible")
    .contains("Create Another Transaction")
    .click();
});
