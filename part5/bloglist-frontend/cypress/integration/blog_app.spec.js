describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.createUser({
      username: "username",
      password: "password",
      name: "cypress",
    });
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
    cy.contains("username");
    cy.contains("password");
    cy.contains("log in");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("username");
      cy.get("#password").type("password");
      cy.get("#login-button").click();
      cy.contains("cypress logged in successfully").should(
        "have.css",
        "color",
        "rgb(0, 128, 0)"
      );
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("username");
      cy.get("#password").type("wrong password");
      cy.get("#login-button").click();
      cy.contains("wrong username or password").should(
        "have.css",
        "color",
        "rgb(255, 0, 0)"
      );
    });
  });
});
