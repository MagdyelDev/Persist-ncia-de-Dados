// importa as bibliotecas necessarias
const express = require('express')
const sqlite3 = require('sqlite3')

const app = express()

// precisa disso pra ler o body da requisicao em JSON
app.use(express.json())

// conecta com o banco de dados
// o arquivo banco.db vai ser criado na pasta do lab3
const db = new sqlite3.Database('./banco.db', (err) => {
    if (err) {
        console.log('nao conseguiu conectar no banco', err)
    } else {
        console.log('conectou no banco!')
    }
})

// Cria a tabela se ela nao existir ainda
// coloquei isso no inicio pra garantir que a tabela existe
// quando o servidor ligar
db.run(`CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    preco REAL
)`)

// Rota POST pra cadastrar produto no banco
// agora os dados vao pro banco e nao pro array!
app.post('/produtos', (req, res) => {
    // pega os dados do corpo da requisicao
    const nome = req.body.nome
    const preco = req.body.preco

    // comando SQL pra inserir no banco
    // uso ? pra evitar problema de segurança (aprendi isso na aula)
    db.run(
        'INSERT INTO produtos (nome, preco) VALUES (?, ?)',
        [nome, preco],
        function (err) {
            if (err) {
                // se der erro manda mensagem de erro
                res.send('erro ao salvar produto')
            } else {
                // manda de volta confirmando que salvou
                res.send({
                    id: this.lastID,
                    nome: nome,
                    preco: preco
                })
            }
        }
    )
})

// Rota GET pra listar todos os produtos do banco
app.get('/produtos', (req, res) => {
    // SELECT * busca todos os registros da tabela
    db.all('SELECT * FROM produtos', [], (err, rows) => {
        if (err) {
            res.send('erro ao buscar produtos')
        } else {
            // rows tem todos os produtos, manda pra quem pediu
            res.send(rows)
        }
    })
})

// sobe o servidor na porta 3000
app.listen(3000, () => {
    console.log('servidor rodando')
})