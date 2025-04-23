# 🧩 Sistema de Gestão de Projetos Freelance

Sistema completo de gestão de projetos e tarefas voltado para freelancers, pequenos times ou empresas que desejam acompanhar o andamento de seus projetos com organização e agilidade.

> 💼 Desenvolvido com foco em portfólio para apresentação em plataformas de freelancer (99freelas, Workana, etc.).

---

## 🚀 Tecnologias Utilizadas

### Backend
- Node.js + Express
- Sequelize ORM (SQL Server)
- JWT + Bcrypt para autenticação
- Dotenv + CORS
- Arquitetura MVC

### Frontend
- React.js
- Axios + Context API (Auth)
- React Router DOM
- (Em progresso) TailwindCSS para layout responsivo

---

## 🔐 Funcionalidades Principais

- Login seguro com JWT
- Proteção de rotas via middleware e context
- CRUD de Projetos
- CRUD de Tarefas
- Relacionamento entre Usuário → Projeto → Tarefas
- Listagem de tarefas por status
- Controle de acesso por tipo de usuário (admin / cliente)

---

## 🧠 Estrutura do Projeto

gestao-projetos/ ├── backend-gestao-projetos/ │ └── Node.js + Express + SQL Server ├── frontend-gestao-projetos/ │ └── React.js + Context API + Axios


---

## 📷 Prints do Sistema (em breve)

- [ ] Tela de Login
- [ ] Dashboard de Projetos
- [ ] Visualização de Tarefas
- [ ] Criação de Projeto

---

## 🗂 Roadmap por Sprints

Consulte o [project-roadmap.md](./project-roadmap.md) para acompanhar a evolução por sprint.

---

## 🛠️ Como Rodar o Projeto

### Backend
1. Acesse `/backend-gestao-projetos`
2. Configure o `.env` com as informações do seu SQL Server
3. Instale as dependências:
```bash
npm install


Inicie com:

npx nodemon server.js


Frontend
Acesse /frontend-gestao-projetos

Instale as dependências:

npm install

npm start

🌍 Deploy (em breve)
Backend: Render

Frontend: Vercel

📄 Licença
Este projeto é de uso pessoal e pode ser adaptado livremente para fins de aprendizado, portfólio e demonstrações profissionais.

🤝 Contato
Desenvolvedor: Andrei
📧 Email: andreiltoledo@hotmail.com
🔗 Perfil 99freelas: andrei-toledo


---



