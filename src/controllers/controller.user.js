import serviceUser from "../services/service.user.js";

async function Inserir(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios." });
        }

        const user = await serviceUser.Inserir(name, email, password);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar usuário.", error: error.message });
    }
}

async function Login(req, res) {
    return handleLogin(req, res, false);
}

async function LoginAdmin(req, res) {
    return handleLogin(req, res, true);
}

async function handleLogin(req, res, isAdmin) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "E-mail e senha são obrigatórios." });
        }

        const user = isAdmin 
            ? await serviceUser.LoginAdmin(email, password)
            : await serviceUser.Login(email, password);

        if (!user || user.length === 0) {
            return res.status(401).json({ error: "E-mail ou senha inválidos." });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Erro ao realizar login.", error: error.message });
    }
}

async function Profile(req, res) {
    try {
        const id_user = req.id_user;
        const user = await serviceUser.Profile(id_user);

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar perfil.", error: error.message });
    }
}

async function InserirAdmin(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios." });
        }

        const user = await serviceUser.InserirAdmin(name, email, password);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar administrador.", error: error.message });
    }
}

async function Listar(req, res) {
    try {
        const users = await serviceUser.Listar();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Erro ao listar usuários.", error: error.message });
    }
}

export default { Inserir, Login, Profile, InserirAdmin, LoginAdmin, Listar };
