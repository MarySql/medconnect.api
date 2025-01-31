import serviceDoctor from "../services/service.doctor.js";

async function Listar(req, res) {
    try {
        const { name } = req.query;
        const doctors = await serviceDoctor.Listar(name);
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: "Erro ao listar médicos.", error: error.message });
    }
}

async function Inserir(req, res) {
    try {
        const { name, specialty, icon } = req.body;

        if (!name || !specialty || !icon) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios." });
        }

        const doctor = await serviceDoctor.Inserir(name, specialty, icon);
        res.status(201).json(doctor);
    } catch (error) {
        res.status(500).json({ message: "Erro ao inserir médico.", error: error.message });
    }
}

async function Editar(req, res) {
    try {
        const { id_doctor } = req.params;
        const { name, specialty, icon } = req.body;

        if (!id_doctor || !name || !specialty || !icon) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios." });
        }

        const doctor = await serviceDoctor.Editar(id_doctor, name, specialty, icon);
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ message: "Erro ao editar médico.", error: error.message });
    }
}

async function Excluir(req, res) {
    try {
        const { id_doctor } = req.params;

        if (!id_doctor) {
            return res.status(400).json({ message: "ID do médico é obrigatório." });
        }

        const doctor = await serviceDoctor.Excluir(id_doctor);
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ message: "Erro ao excluir médico.", error: error.message });
    }
}

async function ListarServicos(req, res) {
    try {
        const { id_doctor } = req.params;

        if (!id_doctor) {
            return res.status(400).json({ message: "ID do médico é obrigatório." });
        }

        const services = await serviceDoctor.ListarServicos(id_doctor);
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: "Erro ao listar serviços do médico.", error: error.message });
    }
}

export default { Listar, Inserir, Editar, Excluir, ListarServicos };
