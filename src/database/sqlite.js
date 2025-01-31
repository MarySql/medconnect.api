import sqlite3 from "sqlite3";

const SQLite = sqlite3.verbose();

// Inicializa a conexão com o banco de dados
const db = new SQLite.Database("./src/database/banco.db", SQLite.OPEN_READWRITE, (err) => {
    if (err) {
        console.error("Erro ao conectar com o banco:", err.message);
    } else {
        console.log("Conectado ao banco de dados SQLite.");
    }
});

// Função para executar queries no banco
const query = (command, params = [], method = "all") => {
    return new Promise((resolve, reject) => {
        db[method](command, params, function (error, result) {
            if (error) {
                console.error("Erro ao executar query:", error.message);
                return reject(error);
            }
            resolve(result);
        });
    });
};

export { db, query };
