describe("Teste de Primeiro Acesso", () => {
  let repeat = 2;
  let user = "test";
  let count = 8;

  let bankName = "TestBank";
  let routingNumber = "123456789";
  let accountNumber = "123456789";

  it.skip("Sign Up com sucesso", () => {
    cy.visit("/");
    Cypress._.times(repeat, () => {
      cy.signUp("Teste", count, `${user}${count}`, "12345", "12345");

      count += 1;
    });

    cy.screenshot("signUpComSucesso");
  });

  it.skip("Sign Up sem sucesso", () => {
    cy.visit("/");

    cy.signUp("Teste", "01", username, "123456", "12345");

    cy.get("#confirmPassword-helper-text").should("be.visible");

    cy.screenshot("signUpSemSucesso");
  });

  it.skip("Primeiro acesso e Criação de banco com sucesso", () => {
    cy.visit("/");
    Cypress._.times(repeat, () => {
      cy.signIn(`${user}${count}`, "12345");

      cy.createBank(bankName, routingNumber, accountNumber);

      cy.get("span").contains("Save").should("be.visible").click();

      cy.get("span").contains("Done").should("be.visible").click();

      count += 1;
    });

    cy.screenshot("bancoCriadoComSucesso");
  });

  it.skip("Primeiro acesso e Criação de banco sem sucesso", () => {
    cy.visit("/");

    cy.signIn(`${user}${count}`, "12345");

    cy.createBank("a", "1", "1");

    cy.get("#bankaccount-bankName-input-helper-text").should("be.visible");

    cy.get("#bankaccount-routingNumber-input-helper-text").should("be.visible");

    cy.get("#bankaccount-accountNumber-input-helper-text").should("be.visible");

    cy.screenshot("bancoNaoCriado");
  });

  it.skip("Logout", () => {
    cy.visit("/");

    cy.logout();

    cy.screenshot("logout");
  });
});
