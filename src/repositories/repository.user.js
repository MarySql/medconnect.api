import { query } from "../database/sqlite.js";

async function Inserir(name, email, password) {
    const sql = `
        INSERT INTO users (name, email, password) 
        VALUES (?, ?, ?) 
        RETURNING id_user
    `;
    const user = await query(sql, [name, email, password]);
    return user[0];
}

async function ListarByEmail(email) {
    const sql = `SELECT * FROM users WHERE email = ?`;
    const user = await query(sql, [email]);
    return user.length ? user[0] : null;
}

async function Profile(id_user) {
    const sql = `SELECT id_user, name, email FROM users WHERE id_user = ?`;
    const user = await query(sql, [id_user]);
    return user[0];
}

async function InserirAdmin(name, email, password) {
    const sql = `
        INSERT INTO admins (name, email, password) 
        VALUES (?, ?, ?) 
        RETURNING id_admin
    `;
    const user = await query(sql, [name, email, password]);
    return user[0];
}

async function ListarByEmailAdmin(email) {
    const sql = `SELECT * FROM admins WHERE email = ?`;
    const user = await query(sql, [email]);
    return user.length ? user[0] : null;
}

async function Listar() {
    const sql = `SELECT id_user, name, email FROM users ORDER BY name`;
    const users = await query(sql, []);
    return users;
}

export default { Inserir, ListarByEmail, Profile, InserirAdmin, ListarByEmailAdmin, Listar };
