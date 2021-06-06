describe("API_test_for_bug_report",()=> {
    it("GET posts/101 for report", () => {
        cy.request('GET', 'https://jsonplaceholder.typicode.com/posts/101').then((response) => {
            // проверям возврат пустого списка
            expect(response).to.have.property('status', 200)
            expect(response.body).to.not.be.null
            expect(response.body).to.have.length(0)
        })
    })
})