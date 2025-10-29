// Custom Cypress commands

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to click a button by text
       * @example cy.clickButton('Submit')
       */
      clickButton(text: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add("clickButton", (text: string) => {
  cy.contains("button", text).click();
});

export {};
