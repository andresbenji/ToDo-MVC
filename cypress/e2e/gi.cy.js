describe('GI tests', () => {
  let TODO_ITEM_ONE = 'Make every second count'
  let TODO_ITEM_TWO = 'Invest in yourself'
  let TODO_ITEM_THREE = 'Learn Cypress'

  beforeEach(function () {
    cy.visit('http://localhost:8888')
  })

  it('should add three todos', () => {
    cy.get('.new-todo')
    .type(`${TODO_ITEM_ONE}{enter}`)
    .type(`${TODO_ITEM_TWO}{enter}`)
    .type(`${TODO_ITEM_THREE}{enter}`)
  })

  it('should mark (Learn Cypress) as completed', () => {
    cy.createTodo(TODO_ITEM_THREE).as('thirdTodo')
    cy.get('@thirdTodo')
    .find('.toggle')
    .check()

    cy.get('@thirdTodo')
    .should('have.class', 'completed')
  })

  it('should render and validate todo items', () => {
    cy.createTodo(TODO_ITEM_ONE).as('firstTodo')
    cy.createTodo(TODO_ITEM_TWO).as('secondTodo')
    cy.createTodo(TODO_ITEM_THREE).as('thirdTodo')

    cy.get('.todo-list li').should('have.length', 3)

    cy.get('.todo-list').each(() => {
      cy.get('@firstTodo').should('contain.text', TODO_ITEM_ONE)
      cy.get('@secondTodo').should('contain.text', TODO_ITEM_TWO)
      cy.get('@thirdTodo').should('contain.text', TODO_ITEM_THREE)
    })
  })
})

