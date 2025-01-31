import { query } from "../database/sqlite.js";

async function Listar(id_user, dt_start, dt_end, id_doctor) {
    try {
        let filtros = [];
        let whereClauses = ["a.id_appointment > 0"];

        if (id_user) {
            filtros.push(id_user);
            whereClauses.push("a.id_user = ?");
        }

        if (dt_start) {
            filtros.push(dt_start);
            whereClauses.push("a.booking_date >= ?");
        }

        if (dt_end) {
            filtros.push(dt_end);
            whereClauses.push("a.booking_date <= ?");
        }

        if (id_doctor) {
            filtros.push(id_doctor);
            whereClauses.push("a.id_doctor = ?");
        }

        const sql = `
            SELECT a.id_appointment, s.description AS service, 
                   d.name AS doctor, d.specialty,
                   a.booking_date, a.booking_hour, u.name AS user, 
                   ds.price, a.id_doctor, a.id_service, a.id_user
            FROM appointments a
            JOIN services s ON s.id_service = a.id_service
            JOIN doctors d ON d.id_doctor = a.id_doctor
            JOIN users u ON u.id_user = a.id_user
            JOIN doctors_services ds 
                ON ds.id_doctor = a.id_doctor 
                AND ds.id_service = a.id_service
            WHERE ${whereClauses.join(" AND ")}
            ORDER BY a.booking_date, a.booking_hour
        `;

        return await query(sql, filtros);
    } catch (error) {
        console.error("Erro ao listar agendamentos:", error.message);
        throw error;
    }
}

async function ListarId(id_appointment) {
    try {
        const sql = `
            SELECT a.id_appointment, s.description AS service, 
                   d.name AS doctor, d.specialty,
                   a.booking_date, a.booking_hour, u.name AS user, 
                   ds.price, a.id_doctor, a.id_service, a.id_user
            FROM appointments a
            JOIN services s ON s.id_service = a.id_service
            JOIN doctors d ON d.id_doctor = a.id_doctor
            JOIN users u ON u.id_user = a.id_user
            JOIN doctors_services ds 
                ON ds.id_doctor = a.id_doctor 
                AND ds.id_service = a.id_service
            WHERE a.id_appointment = ?
        `;

        const result = await query(sql, [id_appointment]);
        return result[0] || null;
    } catch (error) {
        console.error("Erro ao buscar agendamento por ID:", error.message);
        throw error;
    }
}

async function Inserir(id_user, id_doctor, id_service, booking_date, booking_hour) {
    try {
        const sql = `
            INSERT INTO appointments (id_user, id_doctor, id_service, booking_date, booking_hour) 
            VALUES (?, ?, ?, ?, ?) 
            RETURNING id_appointment
        `;

        const result = await query(sql, [id_user, id_doctor, id_service, booking_date, booking_hour]);
        return result[0];
    } catch (error) {
        console.error("Erro ao inserir agendamento:", error.message);
        throw error;
    }
}

async function Excluir(id_user, id_appointment) {
    try {
        const sql = `DELETE FROM appointments WHERE id_appointment = ?`;

        await query(sql, [id_appointment]);
        return { id_appointment };
    } catch (error) {
        console.error("Erro ao excluir agendamento:", error.message);
        throw error;
    }
}

async function Editar(id_appointment, id_user, id_doctor, id_service, booking_date, booking_hour) {
    try {
        const sql = `
            UPDATE appointments 
            SET id_user = ?, id_doctor = ?, id_service = ?, booking_date = ?, booking_hour = ? 
            WHERE id_appointment = ?
        `;

        await query(sql, [id_user, id_doctor, id_service, booking_date, booking_hour, id_appointment]);
        return { id_appointment };
    } catch (error) {
        console.error("Erro ao editar agendamento:", error.message);
        throw error;
    }
}

export default { Listar, ListarId, Inserir, Excluir, Editar };
