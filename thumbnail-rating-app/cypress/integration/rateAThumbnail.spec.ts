const getLastUrlPath = (url) => url.split("/").pop();

describe("a user rates the last two thumbnails in the backlog", () => {
  before(() => {
    cy.exec("cp ./cypress/fixtures/good.png ./public/images/backlog/good.png");
    cy.exec("cp ./cypress/fixtures/bad.png ./public/images/backlog/bad.png");
  });

  after(() => {
    cy.exec("rm -rf ./public/images/backlog/good.png", {
      failOnNonZeroExit: false,
    });
    cy.exec("rm -rf ./public/images/backlog/bad.png", {
      failOnNonZeroExit: false,
    });
    cy.exec("rm -rf ./public/images/good/good.png", {
      failOnNonZeroExit: false,
    });
    cy.exec("rm -rf ./public/images/good/bad.png", {
      failOnNonZeroExit: false,
    });
    cy.exec("rm -rf ./public/images/bad/bad.png", { failOnNonZeroExit: false });
    cy.exec("rm -rf ./public/images/bad/good.png", {
      failOnNonZeroExit: false,
    });
  });

  it("user can see the thumbnail on the page and vote on it via buttons", function () {
    cy.visit("http://localhost:8080/");
    cy.get("#image")
      .should("have.attr", "src")
      .as("firstThumbnailId")
      .should("matches", /(good\.png)|(bad\.png)/g);
    cy.get("#upvote").should("exist");
    cy.get("#downvote").should("exist");
  });

  it("user can upvote on the thumbnail which moves it to the good directory", function () {
    cy.get("#upvote").click();
    cy.wait(1000);
    cy.exec(
      `test -f ./public/images/good/${getLastUrlPath(this.firstThumbnailId)}`
    );
    cy.exec(
      `! test -f ./public/images/backlog/${getLastUrlPath(
        this.firstThumbnailId
      )}`
    );
  });

  it("user sees a new thumbnail on the screen", function () {
    cy.get("#image")
      .should("have.attr", "src")
      .as("secondThumbnailId")
      .then((secondThumbnailId) => {
        expect(secondThumbnailId).to.not.equal(this.firstThumbnailId);
      });
  });

  it("user downvotes the thumbnail which moves it to the bad directory", function () {
    cy.get("#downvote").click();
    cy.wait(1000);
    cy.exec(
      `test -f ./public/images/bad/${getLastUrlPath(this.secondThumbnailId)}`
    );
    cy.exec(
      `! test -f ./public/images/backlog/${this.secondThumbnailId
        .split("/")
        .pop()}`
    );
  });

  it("user no longer sees any thumbnail since the backlog is empty", function () {
    cy.get("#image")
      .should("have.attr", "src")
      .then((finalThumbnailId) => {
        expect(getLastUrlPath(finalThumbnailId)).to.equal("");
      });
  });
});
