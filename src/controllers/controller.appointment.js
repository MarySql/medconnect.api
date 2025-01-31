import serviceAppointment from "../services/service.appointment.js";

async function ListarByUser(req, res) {
    try {
        const id_user = req.id_user;
        const appointments = await serviceAppointment.Listar(id_user, "", "", "");
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Erro ao listar agendamentos do usuário.", error: error.message });
    }
}

async function Listar(req, res) {
    try {
        const { dt_start, dt_end, id_doctor } = req.query;
        const appointments = await serviceAppointment.Listar(0, dt_start, dt_end, id_doctor);
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Erro ao listar agendamentos.", error: error.message });
    }
}

async function ListarId(req, res) {
    try {
        const { id_appointment } = req.params;
        const appointment = await serviceAppointment.ListarId(id_appointment);
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: "Erro ao listar agendamento por ID.", error: error.message });
    }
}

async function Inserir(req, res) {
    return InserirAgendamento(req, res, false);
}

async function InserirAdmin(req, res) {
    return InserirAgendamento(req, res, true);
}

async function InserirAgendamento(req, res, isAdmin) {
    try {
        const { id_doctor, id_service, booking_date, booking_hour } = req.body;
        const id_user = isAdmin ? req.body.id_user : req.id_user;

        if (!id_user || !id_doctor || !id_service || !booking_date || !booking_hour) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios." });
        }

        const appointment = await serviceAppointment.Inserir(id_user, id_doctor, id_service, booking_date, booking_hour);
        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ message: "Erro ao inserir agendamento.", error: error.message });
    }
}

async function EditarAdmin(req, res) {
    try {
        const { id_appointment } = req.params;
        const { id_user, id_doctor, id_service, booking_date, booking_hour } = req.body;

        if (!id_appointment || !id_user || !id_doctor || !id_service || !booking_date || !booking_hour) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios." });
        }

        const appointment = await serviceAppointment.Editar(id_appointment, id_user, id_doctor, id_service, booking_date, booking_hour);
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: "Erro ao editar agendamento.", error: error.message });
    }
}

async function Excluir(req, res) {
    try {
        const id_user = req.id_user;
        const { id_appointment } = req.params;

        if (!id_appointment) {
            return res.status(400).json({ message: "ID do agendamento é obrigatório." });
        }

        const appointment = await serviceAppointment.Excluir(id_user, id_appointment);
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: "Erro ao excluir agendamento.", error: error.message });
    }
}

export default {
    Listar,
    ListarByUser,
    ListarId,
    Inserir,
    InserirAdmin,
    EditarAdmin,
    Excluir
};
