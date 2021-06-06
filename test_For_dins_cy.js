describe("API_test_by_cy.request",()=>{
   // смоук-тест запрос GET с существующими userId и title
    it("GET post with userId&title", ()=>{
        cy.request('GET','https://jsonplaceholder.typicode.com/posts?userId=1&title=qui est esse').then((response) =>{
            expect(response).to.have.property('status',200)
            expect(response.body).to.not.be.null
            expect(response.body).to.have.length(1)
        })
    })

    // смоук-тест запрос GET с не существующим валидным userId и существующим title
    it("GET empty list - the reason wrong userId", ()=>{
      cy.request('GET','https://jsonplaceholder.typicode.com/posts?userId=12&title=qui est esse').then((response) =>{
         expect(response).to.have.property('status',200)
         expect(response.body).to.not.be.null
         expect(response.body).to.have.length(0)
    })
})
    // смоук-тест запрос GET с существующим userId и не существующим title
    it("GET empty list - the reason wrong title", ()=>{
        cy.request('GET','https://jsonplaceholder.typicode.com/posts?userId=1&title=wrong title').then((response) =>{
            expect(response).to.have.property('status',200)
            expect(response.body).to.not.be.null
            expect(response.body).to.have.length(0)
        })
    })

    // смоук-тест запрос GET с не существующим валидным userId и не существующим title
    it("GET empty list - the reason wrong title and userId", ()=>{
        cy.request('GET','https://jsonplaceholder.typicode.com/posts?userId=15&title=wrong title').then((response) =>{
            expect(response).to.have.property('status',200)
            expect(response.body).to.not.be.null
            expect(response.body).to.have.length(0)
        })
    })

// тест запроса GET с невалидным UserId типа string
    it("GET empty list - the reason userId is string", ()=>{
        cy.request('GET','https://jsonplaceholder.typicode.com/posts?userId=one&title=qui est esse').then((response) =>{
            expect(response).to.have.property('status',200)
            expect(response.body).to.not.be.null
            expect(response.body).to.have.length(0)
        })
    })

    // тест запроса GET с UserId типа number, но превышающий формат числа
    it("GET empty list - the reason userId is more than type number", ()=>{
        cy.request('GET','https://jsonplaceholder.typicode.com/posts?userId=9007199254740992&title=qui est esse').then((response) =>{
            expect(response).to.have.property('status',200)
            expect(response.body).to.not.be.null
            expect(response.body).to.have.length(0)
        })
    })

    // тест запроса GET с пустым UserId
    it("GET empty list - the reason userId is empty", ()=>{
        cy.request('GET','https://jsonplaceholder.typicode.com/posts?userId&title=qui est esse').then((response) =>{
            expect(response).to.have.property('status',200)
            expect(response.body).to.not.be.null
            expect(response.body).to.have.length(0)
        })
    })

    // тест запроса GET с пробелом в UserId
    it("GET empty list - the reason userId with only one space", ()=>{
        cy.request('GET','https://jsonplaceholder.typicode.com/posts?userId= &title=qui est esse').then((response) =>{
            expect(response).to.have.property('status',200)
            expect(response.body).to.not.be.null
            expect(response.body).to.have.length(0)
        })
    })

    // тест запроса GET с частичным заполнением title
    it("GET four posts with word filter in title", ()=>{
        cy.request('GET','https://jsonplaceholder.typicode.com/posts?userId=1&title_like=qui').then((response) =>{
            expect(response).to.have.property('status',200)
            expect(response.body).to.not.be.null
            expect(response.body).to.have.length(4)
        })
    })

    // тест запроса GET с переизбыточным заполнением title
    it("GET empty list - the reason ADDITIONNALY WORD in title", ()=>{
        cy.request('GET','https://jsonplaceholder.typicode.com/posts?userId=1&title=qui est esse PRIMER').then((response) =>{
            expect(response).to.have.property('status',200)
            expect(response.body).to.not.be.null
            expect(response.body).to.have.length(0)
        })
    })

    // тест запроса GET с измененным порядком слов в title
    it("GET empty list - the reason incorrect word order in title", ()=>{
        cy.request('GET','https://jsonplaceholder.typicode.com/posts?userId=1&title=est qui esse').then((response) =>{
            expect(response).to.have.property('status',200)
            expect(response.body).to.not.be.null
            expect(response.body).to.have.length(0)
        })
    })

    // тест запроса GET с двойными пробелами в title
    it("GET empty list - the reason - double space in title", ()=>{
        cy.request('GET','https://jsonplaceholder.typicode.com/posts?userId=1&title=qui  est  esse').then((response) =>{
            expect(response).to.have.property('status',200)
            expect(response.body).to.not.be.null
            expect(response.body).to.have.length(0)
        })
    })

    // тест запроса GET с двумя существующими title одного пользователя
    it("GET two posts of one userId", ()=>{
        cy.request('GET','https://jsonplaceholder.typicode.com/posts?userId=1&title=qui est esse&title=nesciunt quas odio').then((response) =>{
            expect(response).to.have.property('status',200)
            expect(response.body).to.not.be.null
            expect(response.body).to.have.length(2)
        })
    })

    // тест запроса GET возвращает полную запись post, а не толко искомые значения
    it("GET respond full post", ()=> {
        cy.request('GET', 'https://jsonplaceholder.typicode.com/posts?userId=1&title=qui est esse').then((response) => {
            expect(response).to.have.property('status', 200)
            expect(response.body).to.not.be.null
            expect(response.body).to.have.length(1)
            expect(response.body.userId).to.not.be.null
            expect(response.body.id).to.not.be.null
            expect(response.body.title).to.not.be.null
            expect(response.body.body).to.not.be.null
        })
    })


})