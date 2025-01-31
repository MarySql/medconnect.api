# MedConnect API 🩺💉
> A API MedConnect é um sistema para o gerenciamento de agendamentos médicos, desenvolvido com o objetivo de facilitar a marcação e o gerenciamento de consultas entre usuários, médicos e administradores. A aplicação é construída utilizando Node.js com o framework Express e o banco de dados SQLite para armazenar as informações de usuários, médicos, serviços e agendamentos.

## Funcionalidades

- **Cadastro de usuários:** Permite o registro de novos usuários no sistema e o login com autenticação via JWT (JSON Web Token).

- **Cadastro de médicos:** Permite o cadastro de médicos com informações como nome, especialidade e ícone.

- **Agendamentos médicos:** Usuários podem agendar, editar e cancelar consultas com médicos, sendo possível consultar agendamentos por data, médico e usuário.

- **Administração:** O sistema também possui uma interface administrativa para gerenciamento de usuários e agendamentos, permitindo que administradores possam visualizar e gerenciar todos os dados no sistema.

## Tecnologias utilizadas

- <img align="center" alt="Mary-node" height="30" width="40" src="https://devicon-website.vercel.app/api/nodejs/original.svg"> **Node.js:** Ambiente de execução JavaScript.
- <img align="center" alt="Express" height="30" width="40" src="https://devicon-website.vercel.app/api/express/original.svg?color=%23FFFFFF"></img> **Express:** Framework para construção de APIs RESTful.
- <img align="center" alt="Express" height="30" width="40" src="https://devicon-website.vercel.app/api/sqlite/original.svg"></img> **SQLite:** Banco de dados relacional utilizado para persistência dos dados.
- **JWT (JSON Web Token):** Utilizado para autenticação e autorização de usuários e administradores.
## Endpoints
`POST` */users/register:* __Cria um novo usuário.__

`POST` */users/login:* __Realiza o login de um usuário.__

`GET` */users/profile:* __Obtém o perfil do usuário logado.__

***

`POST` */appointments:* __Cria um novo agendamento para o usuário.__

`GET` */appointments:* __Lista os agendamentos do usuário logado.__

`DELETE` */appointments/:id_appointment:* __Exclui um agendamento do usuário logado.__

***

`GET` */doctors:*  __Lista médicos cadastrados.__

`POST` */doctors:* __Cria um novo médico.__

`PUT` */doctors/:id_doctor:* __Atualiza as informações de um médico.__

`DELETE` */doctors/:id_doctor:* __Exclui um médico do sistema.__

***

## Endpoints Administrativos
`GET` */admin/appointments:* __Lista todos os agendamentos (para administradores).__

`GET` */admin/users:* __Lista todos os usuários (para administradores).__

`POST` */admin/appointments:* __Cria um agendamento para o usuário (admin).__

`PUT` */admin/appointments/:id_appointment:* __Atualiza um agendamento (admin).__

`DELETE` */admin/appointments/:id_appointment:* __Exclui um agendamento (admin).__
