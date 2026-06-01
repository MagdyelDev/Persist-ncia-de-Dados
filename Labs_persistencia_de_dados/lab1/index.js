// Importa o express pra fazer o servidor
const express = require('express')

// Cria o app do servidor
const app = express()

// isso aqui serve pra conseguir ler o JSON que vem na requisição
app.use(express.json())

// Array que guarda os produtos
// aqui eu aprendi que isso fica na memoria RAM do computador
// entao quando desligar o servidor os dados somem
const produtos = []

// Rota pra cadastrar produto
// o cliente manda os dados e a gente guarda no array
app.post('/produtos/:nome', (req, res) => {
    const produto = req.body
    const nome = req.params.nome

    // empurra o produto novo no array
    produtos.push(nome)

    // retorna o produto que foi salvo
    res.send(nome)
})

// Rota pra listar todos os produtos
// aqui eu testei e os dados apareceram certinho
app.get('/produtos', (req, res) => {
    res.send(produtos)
})

// Liga o servidor na porta 3000
app.listen(3000, () => {
    console.log('servidor rodando')
})

/*
  O que eu entendi do LAB 1:
  
  Quando eu cadastrei os produtos e consultei, funcionou.
  Mas quando eu derrubei o servidor com alt+f4 e reiniciei,
  os dados sumiram. Isso acontece porque o array fica na 
  memoria RAM, que é temporaria.
  
  Apesar de tudo, é necessario um banco de dados para poder
  guardar todos os dados do sistema, mesmo que o servidor seja
  desligado.
*/