MedConnect API
A API MedConnect é um sistema para o gerenciamento de agendamentos médicos, desenvolvido com o objetivo de facilitar a marcação e o gerenciamento de consultas entre usuários, médicos e administradores. A aplicação é construída utilizando Node.js com o framework Express e o banco de dados SQLite para armazenar as informações de usuários, médicos, serviços e agendamentos.

Funcionalidades
Cadastro de usuários: Permite o registro de novos usuários no sistema e o login com autenticação via JWT (JSON Web Token).
Cadastro de médicos: Permite o cadastro de médicos com informações como nome, especialidade e ícone.
Agendamentos médicos: Usuários podem agendar, editar e cancelar consultas com médicos, sendo possível consultar agendamentos por data, médico e usuário.
Administração: O sistema também possui uma interface administrativa para gerenciamento de usuários e agendamentos, permitindo que administradores possam visualizar e gerenciar todos os dados no sistema.
Tecnologias utilizadas
Node.js: Ambiente de execução JavaScript.
Express: Framework para construção de APIs RESTful.
SQLite: Banco de dados relacional utilizado para persistência dos dados.
JWT (JSON Web Token): Utilizado para autenticação e autorização de usuários e administradores.
Endpoints
POST /users/register: Cria um novo usuário.
POST /users/login: Realiza o login de um usuário.
GET /users/profile: Obtém o perfil do usuário logado.
POST /appointments: Cria um novo agendamento para o usuário.
GET /appointments: Lista os agendamentos do usuário logado.
DELETE /appointments/:id_appointment: Exclui um agendamento do usuário logado.
GET /doctors: Lista médicos cadastrados.
POST /doctors: Cria um novo médico.
PUT /doctors/:id_doctor: Atualiza as informações de um médico.
DELETE /doctors/:id_doctor: Exclui um médico do sistema.
Endpoints Administrativos
GET /admin/appointments: Lista todos os agendamentos (para administradores).
GET /admin/users: Lista todos os usuários (para administradores).
POST /admin/appointments: Cria um agendamento para o usuário (admin).
PUT /admin/appointments/:id_appointment: Atualiza um agendamento (admin).
DELETE /admin/appointments/:id_appointment: Exclui um agendamento (admin).
