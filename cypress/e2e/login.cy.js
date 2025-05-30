/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when username is empty
 *   - should display alert when password is empty
 *   - should display alert when username and password are wrong
 *   - should login successfully and redirect to homepage
 */

describe('Login', () => {
  it('should display login page correctly', () => {

    cy.visit('http://localhost:5173/login')

    // verification element login page
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
  })

  it('should display alert when username is empty', () => {
    cy.visit('http://localhost:5173/login')
    cy.get('button').contains(/^Login$/).click();

    cy.on('window:alert', (str) => {
      const expectedAlert = String(str);
      expect(expectedAlert).to.equal('Error: "email" is not allowed to be empty');
    })
  })

  it('should display alert when password is empty', () => {
    cy.visit('http://localhost:5173/login')

    cy.get('input[placeholder="Email"]').should('be.visible').type('test@example.com');

    cy.get('button').contains(/^Login$/).click();

    cy.on('window:alert', (str) => {
      const expectedAlert = String(str);
      expect(expectedAlert).to.equal('Error: "password" is not allowed to be empty');
    })
  })

  it('should display alert when username and password are wrong', () => {
    cy.visit('http://localhost:5173/login')

    cy.get('input[placeholder="Email"]').should('be.visible').type('test@example.com');
    cy.get('input[placeholder="Password"]').should('be.visible').type('test123');
    cy.get('button').contains(/^Login$/).click();

    cy.on('window:alert', (str) => {
      const expectedAlert = String(str);
      expect(expectedAlert).to.equal('Error: email or password is wrong');
    })
  })

  it('should login successfully and redirect to homepage', () => {

    cy.visit('http://localhost:5173/login')

    // verification element login page
    cy.get('input[placeholder="Email"]').should('be.visible').type('tes@tes.co');
    cy.get('input[placeholder="Password"]').should('be.visible').type('tes123');
    cy.get('button').contains(/^Login$/).should('be.visible').click();
    
    // verification element homepage
    cy.url().should('eq', 'http://localhost:5173/')
    cy.get('button').contains(/^Sign out$/).should('be.visible');
  })
})