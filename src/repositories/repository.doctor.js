import { query } from "../database/sqlite.js";

async function Listar(name) {
    let params = [];
    let conditions = [];
    
    if (name) {
        conditions.push("name LIKE ?");
        params.push(`%${name}%`);
    }

    const sql = `
        SELECT * FROM doctors
        ${conditions.length ? "WHERE " + conditions.join(" AND ") : ""}
        ORDER BY name
    `;

    return await query(sql, params);
}

async function Inserir(name, specialty, icon) {
    const sql = `
        INSERT INTO doctors (name, specialty, icon) 
        VALUES (?, ?, ?) 
        RETURNING id_doctor
    `;

    const doctor = await query(sql, [name, specialty, icon]);
    return doctor[0];
}

async function Editar(id_doctor, name, specialty, icon) {
    const sql = `
        UPDATE doctors 
        SET name = ?, specialty = ?, icon = ? 
        WHERE id_doctor = ?
    `;

    await query(sql, [name, specialty, icon, id_doctor]);
    return { id_doctor };
}

async function Excluir(id_doctor) {
    const sql = `DELETE FROM doctors WHERE id_doctor = ?`;
    await query(sql, [id_doctor]);
    return { id_doctor };
}

async function ListarServicos(id_doctor) {
    const sql = `
        SELECT d.id_service, s.description, d.price
        FROM doctors_services d
        JOIN services s ON s.id_service = d.id_service
        WHERE d.id_doctor = ?
        ORDER BY s.description
    `;

    return await query(sql, [id_doctor]);
}

export default { Listar, Inserir, Editar, Excluir, ListarServicos };
