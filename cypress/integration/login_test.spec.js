import { PageElements } from "../support/selectors"

const pageElements = new PageElements()
describe('Test Suite', () => {
  beforeEach(() => {
    cy.visit('/')
    //сy.title().should('eq','Buy the Most Creative Phone Cases on Caseative – caseative')
    cy.get(pageElements.logInLink).should('be.visible').click()
    cy.url().should('include', 'account/login')

  })

  
  it('Main Test Case from Test Task', () => {
    cy.get(pageElements.emailInput).should('be.visible', 'have.attr', 'placeholder', 'Email').clear()
    .type('thomasshelbytest@gmail.com')
    cy.get(pageElements.passwordInput).should('be.visible', 'have.attr', 'placeholder', 'Password').clear()
    .type('Qwerty11111@')
    cy.get(pageElements.signInButton).first().click()
    cy.url().should('include', 'account')
    cy.get(pageElements.userName).should('contain', 'Thomas')
    cy.get(pageElements.logOutButton).should('be.visible').click()
    cy.url().should('include', '/')

  })
  it('Verify that user will not be able to login with empty fields', () => {
    cy.get(pageElements.emailInput).should('be.visible', 'have.attr', 'placeholder', 'Email').clear()
    cy.get(pageElements.passwordInput).should('be.visible', 'have.attr', 'placeholder', 'Password').clear()
    cy.get(pageElements.signInButton).first().click()
    cy.get(pageElements.logInError).should('contain', 'Incorrect email or password.')
          
  })

  it('Verify that user will not be able to sign in as unregistred user', () => {
    cy.get(pageElements.emailInput).should('be.visible', 'have.attr', 'placeholder', 'Email').clear()
    .type('MeowMeow@com')
    cy.get(pageElements.passwordInput).should('be.visible', 'have.attr', 'placeholder', 'Password').clear()
    .type('Passwordd')
    cy.get(pageElements.signInButton).first().click()
    cy.get(pageElements.logInError).should('contain', 'Incorrect email or password.')
          
  })

  it('Verify that user will not be able to sign in with email field only filled', () => {
    cy.get(pageElements.emailInput).should('be.visible', 'have.attr', 'placeholder', 'Email').clear()
    .type('thomasshelbytest@gmail.com')
    cy.get(pageElements.passwordInput).should('be.visible', 'have.attr', 'placeholder', 'Password').clear()
    cy.get(pageElements.signInButton).first().click()
    cy.get(pageElements.logInError).should('contain', 'Incorrect email or password.')
          
  })

  it('Verify that return to store link return on main page', () => {
    cy.contains('a', pageElements.returnToStore).should('be.visible').click()
    cy.url().should('include', '/')
  })

})
