// Importa o sqlite3
// precisei instalar com: npm install sqlite3
const sqlite3 = require('sqlite3')

// Cria ou abre o arquivo do banco de dados
// se o arquivo nao existir ele cria automatico
const db = new sqlite3.Database('./banco.db')

// Aqui eu crio a tabela de produtos
// o IF NOT EXISTS serve pra nao dar erro se a tabela ja existir
// aprendi isso tentando rodar duas vezes e dando erro sem esse IF
db.run(`
    CREATE TABLE IF NOT EXISTS produtos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        preco REAL
    )
`, (err) => {
    if(err) {
        // se der erro aparece aqui
        console.log('erro ao criar tabela', err)
    } else {
        console.log('tabela criada com sucesso!')
    }
})

// Inserindo um produto de teste manualmente
// isso é tipo o INSERT do SQL
// os ? sao os valores que vao entrar
db.run(`INSERT INTO produtos (nome, preco) VALUES (?, ?)`,
    ['Teclado', 150.00],
    function(err) {
        if(err) {
            console.log('erro ao inserir', err)
        } else {
            // o this.lastID pega o id gerado automatico
            console.log('produto inserido, id:', this.lastID)
        }
    }
)

// Consultando todos os produtos
// SELECT * significa pegar todos os campos
db.all('SELECT * FROM produtos', [], (err, rows) => {
    if(err) {
        console.log('erro na consulta', err)
    } else {
        // rows é um array com todos os resultados
        console.log('produtos no banco:')
        console.log(rows)
    }
})

/*
    O que eu entendi do LAB 2:

    Aqui eu instalei o SQLite e criei o banco de dados.
    O legal é que o banco fica salvo num arquivo chamado banco.db
    na pasta do projeto. Isso é bem diferente do array!

    O arquivo .db fica no HD, entao quando desligar o servidor
    os dados NAO somem, ficam guardados la.

    O AUTOINCREMENT faz o id crescer sozinho, nao precisei
    definir manualmente, achei muito util.
    
    Tambem vi no DB Browser que a tabela apareceu certa
    com as colunas id, nome e preco.
*/