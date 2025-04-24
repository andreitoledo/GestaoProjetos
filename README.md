# 📋 Gestão de Projetos com React, Node.js e SQL Server

Sistema web completo para gestão de projetos, tarefas, comentários, uploads e usuários, com níveis de acesso por perfil (admin e cliente).

---

## 🚀 Tecnologias Utilizadas

Frontend: React.js, TailwindCSS
Backend: Node.js + Express
Banco de dados: SQL Server
ORM: Sequelize
Autenticação: JWT
Upload de arquivos: multipart/form-data (com armazenamento local)

---

## 🔐 Perfis de usuário

Tipo	Permissões principais
admin	Gerencia usuários e projetos
cliente	Gerencia apenas seus próprios projetos e tarefas

---

## 🧠 Estrutura do Projeto

gestao-projetos/ ├── backend-gestao-projetos/ │ └── Node.js + Express + SQL Server ├── frontend-gestao-projetos/ │ └── React.js + Context API + Axios

---

## 🧭 Funcionalidades

Autenticação com JWT (login com token)
Tela de login com retorno de token
Cadastro e gerenciamento de projetos por usuário
CRUD de tarefas por projeto
Controle de status das tarefas (todo, em andamento, concluído)
Comentários por tarefa
Upload e visualização de arquivos anexados
Tags associadas às tarefas
Dashboard com resumo gráfico (tarefas por status)
Painel administrativo para gerenciamento de usuários (apenas admin)

---
## 🖥️ Como rodar o projeto localmente

1. Clone este repositório
git clone https://github.com/seu-usuario/gestao-projetos.git
cd gestao-projetos

2. Crie o banco de dados no SQL Server
Crie um banco chamado GestaoProjetos
Execute os scripts da pasta scripts/sql (se aplicável)
Configure as variáveis no .env

3. Configuração do backend
cd backend-gestao-projetos
cp .env.example .env
npm install
npx sequelize db:migrate   # se houver migrations
npx sequelize db:seed:all   # se houver seeds
npm run dev

4. Configuração do frontend
cd ../frontend-gestao-projetos
npm install
npm start

 5. 🔑 Variáveis de ambiente (.env)
.env backend
DB_HOST=localhost
DB_PORT=1433
DB_NAME=GestaoProjetos
DB_USER=sa
DB_PASS=suasenha
JWT_SECRET=sua_chave_secreta
---

📸 Prints do sistema
Inclua algumas imagens aqui (dashboard, tela de tarefas, administração de usuários...)

---

🤝 Projeto desenvolvido para
Projeto criado com foco em testes práticos, demonstração de portfólio ou oportunidades freelancer.

---

📬 Contato
Desenvolvedor: Andrei Toledo
📧 Email: andreiltoledo@hotmail.com
LinkedIn: https://linkedin.com/in/andreilucianotoledo/

---




