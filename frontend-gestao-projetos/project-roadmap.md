# 🗂 Projeto: Gestão de Projetos Freelance

Sistema fullstack para gerenciamento de projetos e tarefas, voltado para freelancers, pequenos times e profissionais que desejam acompanhar o andamento de seus trabalhos com organização e eficiência.

---

## 📌 Tecnologias Utilizadas

### Backend
- Node.js + Express
- Sequelize ORM
- SQL Server
- JWT (Autenticação)
- BcryptJS
- CORS + Dotenv

### Frontend
- React.js (Vite ou CRA)
- Axios
- React Router DOM
- Context API (Auth)
- TailwindCSS ou Styled Components (em andamento)

---

## 📅 Roadmap por Sprints

### ✅ Sprint 1 – Setup Inicial + Autenticação

- [x] Estrutura do backend com Express e Sequelize
- [x] Conexão com SQL Server via `tedious`
- [x] CRUD básico de Usuários
- [x] Autenticação JWT
- [x] Cadastro e Login protegidos
- [x] Middleware de autenticação
- [x] Setup do frontend com React
- [x] Contexto de autenticação + login via API
- [x] Listagem de projetos protegida no dashboard

---

### 🚧 Sprint 2 – Gestão de Projetos e Tarefas

- [x] Modelo de Projetos e Tarefas
- [x] Relacionamento entre usuário → projeto → tarefa
- [ ] Formulário para criação de projeto no frontend
- [ ] Listagem de tarefas por projeto
- [ ] Criar nova tarefa
- [ ] Atualização de status da tarefa
- [ ] Validação visual e lógica

---

### 🎨 Sprint 3 – UI/UX e Visual Profissional

- [ ] Aplicar TailwindCSS ou Styled Components
- [ ] Layout responsivo (desktop + mobile)
- [ ] Feedbacks de carregamento e erros (toast, spinners)
- [ ] Logout funcional com botão e redirecionamento
- [ ] Indicadores visuais (tarefas por status, progresso do projeto)

---

### 🚀 Sprint 4 – Deploy + Portfólio

- [ ] Deploy do backend (Render.com)
- [ ] Deploy do frontend (Vercel ou Netlify)
- [ ] Documentação da API (via markdown ou Swagger)
- [ ] README completo com prints + links
- [ ] Adicionar ao perfil no 99freelas e GitHub

---

## 👨‍💻 Funcionalidades Alvo (MVP)

- Autenticação com JWT
- Cadastro de usuários (role: admin, cliente)
- CRUD de projetos e tarefas
- Visualização de tarefas por status
- Acesso protegido por token
- Experiência de uso fluida e limpa

---

## 🎯 Objetivo do Projeto

Esse sistema foi pensado como **vitrine técnica para captar clientes** em plataformas de freelancer, demonstrando domínio fullstack (Node + React + SQL Server), segurança, boas práticas e UX funcional.

---

## 📍 Status atual

> Última Sprint: **Sprint 2**
> - Backend finalizado
> - Frontend listando projetos
> - Tarefas: desenvolvimento iniciado

---

## 📎 Observações

- Próximas features possíveis: upload de arquivos por tarefa, comentários, cronômetro de tempo
- Pode evoluir para modelo SaaS em um segundo momento

