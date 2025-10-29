// Cypress E2E support file
// This is loaded before every test file

// Import commands
import "./commands";

// Optionally configure Cypress behavior
Cypress.on("uncaught:exception", (_err, _runnable) => {
  // Returning false here prevents Cypress from failing the test
  // on uncaught exceptions - customize as needed
  return false;
});
