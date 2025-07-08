
# 🧪 Desafio Técnico – Perfil de Usuário | Sync360

Este repositório contém o projeto desenvolvido para o desafio técnico da **Sync360**. A proposta consiste em uma aplicação web com frontend em **React** e backend em **Node.js**, utilizando **Express** e banco de dados **MySQL**.

---

## ✅ Status Atual

- [x] Backend com rotas **GET** e **POST** funcionando
- [x] Banco de dados criado e conectado
- [x] Frontend funcional com:
  - Tela de perfil com dados reais do banco
  - Página de edição com envio de dados para o backend
  - Validações básicas nos campos
- [ ] Estilização da interface (em andamento)
- [ ] Responsividade completa (em andamento)
- [ ] Deploy (pendente)

---

## 📁 Estrutura do Projeto

```
Sync360/
├── backend/        → Código do servidor Node.js (Express + MySQL)
├── frontend/       → Aplicação React com React Router e Axios
└── README.md       → Documentação principal do projeto
```

---

## 📦 Pré-requisitos

Antes de rodar o projeto localmente, instale:

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [npm](https://www.npmjs.com/)
- [MySQL](https://dev.mysql.com/downloads/mysql/)
- Um editor como [VS Code](https://code.visualstudio.com/)

---

## ⚙️ Backend - Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/sync360-perfil-usuario.git
cd sync360-perfil-usuario/backend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Crie o arquivo `.env`

Na pasta `backend/`, crie um arquivo `.env` com:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=senha_do_mysql
DB_NAME=case_sync360
PORT=3000
```

### 4. Crie o banco de dados

Acesse o MySQL e execute:

```sql
CREATE DATABASE case_sync360;

USE case_sync360;

CREATE TABLE IF NOT EXISTS usuario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  idade INT,
  rua VARCHAR(100),
  bairro VARCHAR(100),
  estado VARCHAR(50),
  biografia TEXT,
  imagemPerfil TEXT
);
```

### 5. Inicie o servidor

```bash
node server.js
```

O backend estará disponível em: [http://localhost:3000](http://localhost:3000)

Rotas disponíveis:

- `GET /usuario` → Retorna os dados do usuário
- `POST /usuario` → Cria ou atualiza os dados

---

## 💻 Frontend - React

### 1. Vá para a pasta do frontend

```bash
cd ../frontend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Estrutura atual

- **`pages/Perfil/Perfil.jsx`**: Página que exibe os dados do usuário
- **`pages/EditarPerfil/EditarPerfil.jsx`**: Página para editar os dados do usuário
- **`services/api.js`**: Configuração base do Axios

### 4. Inicie o projeto

```bash
npm run dev
```

Acesse: [http://localhost:5173](http://localhost:5173)

Funcionalidades atuais:

- Tela de **Perfil do Usuário**
- Tela de **Edição com validações**
- Integração com backend via Axios
- Navegação com React Router

> ⚠️ A interface ainda **não está estilizada** — foco atual foi em **funcionalidade e validação**.

---

## 🧠 Tecnologias Utilizadas

| Camada    | Tecnologias                     |
|-----------|---------------------------------|
| Backend   | Node.js, Express, MySQL, dotenv |
| Frontend  | React, React Router, Axios      |
| Outros    | Vite, VS Code, Postman          |

---

## 🧭 Navegação

- `/perfil` → Página que exibe os dados do usuário
- `/editar` → Página que permite editar os dados

---

## ✍️ Desenvolvedor

Desenvolvido por **Ailton Rodrigues** como parte do desafio técnico da empresa **Sync360**.

---

## 📌 Próximos Passos

- [ ] Estilizar a aplicação com TailwindCSS ou CSS Modules
- [ ] Tornar totalmente responsivo (mobile e desktop)
- [ ] Realizar deploy:
  - Backend (Render ou Railway)
  - Frontend (Vercel ou Netlify)

---
