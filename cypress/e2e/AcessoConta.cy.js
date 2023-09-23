describe("Teste de acesso a conta", () => {
  let user = "test";
  let count = 7;

  it.skip("Sign In com sucesso", () => {
    cy.visit("/");

    cy.signIn(`${user}${count}`, "12345");

    cy.screenshot("loginComSucesso");
  });

  it.skip("Sign In sem sucesso", () => {
    cy.visit("/");

    cy.signIn(`${user}${count}`, "12345a");

    cy.get("div")
      .contains("Username or password is invalid")
      .should("be.visible");

    cy.screenshot("loginSemSucesso");
  });

  it.skip("Logout", () => {
    cy.visit("/");

    cy.logout();

    cy.screenshot("logout");
  });
});
