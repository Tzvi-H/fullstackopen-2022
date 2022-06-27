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

      it("a user can like a blog", function () {
        cy.contains("cypress title cypress author").contains("view").click();
        cy.contains("like").click();
        cy.contains("likes 1");
      });

      it("a user can delete a blog", function () {
        cy.contains("cypress title cypress author").contains("view").click();
        cy.get("html").should("contain", "cypress title cypress author");
        cy.contains("remove").click();
        cy.get("html").should("not.contain", "cypress title cypress author");
      });
    });

    describe("and multiple blogs exist", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "cypress title 1",
          author: "cypress author 1",
          url: "cypress url 1",
          likes: 1,
        });

        cy.createBlog({
          title: "cypress title 2",
          author: "cypress author 2",
          url: "cypress url 2",
          likes: 2,
        });

        cy.createBlog({
          title: "cypress title 3",
          author: "cypress author 3",
          url: "cypress url 3",
          likes: 3,
        });
      });

      it("blogs will be ordered by likes in descending order", function () {
        cy.get(".blog").eq(0).should("contain", "cypress title 3");
        cy.get(".blog").eq(1).should("contain", "cypress title 2");
        cy.get(".blog").eq(2).should("contain", "cypress title 1");

        cy.contains("cypress title 2").as("title2").contains("view").click();
        cy.get("@title2").contains("like").click();
        cy.get("@title2").contains("likes 3").contains("like").click();

        cy.contains("cypress title 1").as("title1").contains("view").click();
        cy.get("@title1").contains("like").click();
        cy.get("@title1").contains("likes 2").contains("like").click();
        cy.get("@title1").contains("likes 3").contains("like").click();
        cy.get("@title1").contains("likes 4").contains("like").click();
        cy.get("@title1").contains("likes 5");

        cy.get(".blog").eq(0).should("contain", "cypress title 1");
        cy.get(".blog").eq(1).should("contain", "cypress title 2");
        cy.get(".blog").eq(2).should("contain", "cypress title 3");
      });
    });
  });
});
