
# Desafio Técnico – Perfil de Usuário | Sync360

Este repositório contém a primeira parte do projeto desenvolvido para o desafio técnico da **Sync360**. Neste momento, está concluída a **estrutura do backend** utilizando **Node.js + Express** conectado a um banco de dados **MySQL**.

O frontend está em desenvolvimento e será integrado posteriormente.

---

## ✅ Status Atual

- [x] Backend com rotas GET e POST funcionando
- [ ] Banco de dados populado com dados reais
- [ ] Frontend com tela de perfil e edição
- [ ] Responsividade completa
- [ ] Deploy

---

## 📁 Estrutura do Projeto

```
Sync360/
├── backend/        → Código do servidor Node.js (com Express e MySQL)
├── frontend/       → Estrutura inicial do React (em construção)
└── README.md       → Documentação principal
```

---

## 📦 Pré-requisitos para rodar o backend

Antes de rodar o projeto localmente, você precisa ter instalado:

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [npm](https://www.npmjs.com/) (gerenciador de pacotes, vem com o Node.js)
- [MySQL](https://dev.mysql.com/downloads/mysql/) (v5.7+ ou superior)
- Um editor como [VS Code](https://code.visualstudio.com/)

---

## 🧱 Como configurar o backend

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/sync360-perfil-usuario.git
cd sync360-perfil-usuario/backend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o ambiente

Crie um arquivo `.env` na raiz da pasta `backend/` com o seguinte conteúdo (ajuste conforme sua instalação do MySQL):

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=senha_do_mysql
DB_NAME=perfil_usuario
PORT=3000
```

### 4. Crie o banco de dados no MySQL

Acesse o MySQL (via terminal ou ferramenta como MySQL Workbench) e execute:

```sql
CREATE DATABASE case-sync360;

USE `case-sync360`;

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

> O servidor estará rodando em: `http://localhost:3000`

Rotas disponíveis:
- `GET /usuario` → Retorna os dados do usuário
- `POST /usuario` → Atualiza ou salva os dados enviados

---

## ✍️ Desenvolvedor

Projeto desenvolvido por **Ailton Rodrigues** como parte do desafio técnico da Sync360.

---

## 📌 Próximos passos

- Criar e conectar o frontend com React
- Aplicar layout responsivo e estilização com TailwindCSS
- Incluir validação, máscara e feedback visual
- Fazer deploy e adicionar link ao README
