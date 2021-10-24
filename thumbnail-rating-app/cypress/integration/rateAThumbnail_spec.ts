const getLastUrlPath = (url) => url.split("/").pop();

describe("a user navigates to the application", () => {
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
    cy.exec("rm -rf ./public/images/bad/bad.png", { failOnNonZeroExit: false });
  });

  it("display an thumbnail and two buttons the user can use to vote on the thumbnail", function () {
    cy.visit("http://localhost:8080/");
    cy.get("#image")
      .should("have.attr", "src")
      .as("firstThumbnailId")
      .should("matches", /(good\.png)|(bad\.png)/g);
    cy.get("#upvote").should("exist");
    cy.get("#downvote").should("exist");
  });

  it("moves the upvoted thumbnail to the good directory when upvote is clicked", function () {
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

  it("changes the image with a new id for the user to rate", function () {
    cy.get("#image")
      .should("have.attr", "src")
      .as("secondThumbnailId")
      .then((secondThumbnailId) => {
        expect(secondThumbnailId).to.not.equal(this.firstThumbnailId);
      });
  });

  it("moves the downvoted thumbnail to the bad directory when downvote is clicked", function () {
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

  it("sets the image src as undefined since no more backlog images exist", function () {
    cy.get("#image")
      .should("have.attr", "src")
      .then((finalThumbnailId) => {
        expect(getLastUrlPath(finalThumbnailId)).to.equal("");
      });
  });
});
