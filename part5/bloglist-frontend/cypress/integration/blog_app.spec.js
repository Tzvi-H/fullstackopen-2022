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

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({
        username: "username",
        password: "password",
      });
    });

    it("A blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("#titleInput").type("cypress title");
      cy.get("#authorInput").type("cypress author");
      cy.get("#urlInput").type("cypress url");
      cy.get('input[type="submit"]').click();
      cy.contains("cypress title cypress author");
      cy.contains("cypress title by cypress author added");
    });

    describe("and a blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "cypress title",
          author: "cypress author",
          url: "cypress url",
        });
      });

      it.only("a user can like a blog", function () {
        cy.contains("cypress title cypress author").contains("view").click();
        cy.contains("like").click();
        cy.contains("likes 1");
      });
    });
  });
});
