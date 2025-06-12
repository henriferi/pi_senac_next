
# GOP - Gestão Odontolegal Pericial

## Introdução

A **GOP - Gestão Odontolegal Pericial** é uma aplicação fullstack voltada à gestão de casos forenses odontológicos, contemplando autenticação, gerenciamento de usuários, evidências, vítimas, laudos e relatórios. A aplicação conta com:

- **API RESTful** desenvolvida em **Node.js + Express** com persistência de dados via **MongoDB**.
- **Frontend** desenvolvido em **Next.js** com rotas otimizadas, interfaces organizadas e navegação dinâmica.

## Tecnologias Utilizadas

- **Next.js 13+** com estrutura de rotas baseada em diretórios
- **TypeScript**
- **PostCSS** / **TailwindCSS**
- **Axios** (comunicação com API)

## Estrutura de Pastas (Frontend)

A seguir, um resumo da estrutura visual da aplicação Next.js (presente em `src/app`):

```
📁 src/app
├── 📁 casos
│   ├── 📁 [id]
│   │   └── page.tsx
│   ├── 📁 criar
│   │   └── page.tsx
│   ├── 📁 visualizar
│   │   └── page.tsx
├── 📁 components
│   └── dashboard
│       └── page.tsx
├── 📁 login
│   └── page.tsx
├── favicon.ico
├── globals.css
├── layout.tsx
├── page.tsx
```

> ⚙️ A estrutura está em conformidade com o modelo de **App Router** do Next.js 13+.

## Instalação do Projeto

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd nome-do-projeto
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um `.env` com as seguintes chaves:

   ```env
   MONGODB_URI=<string de conexão>
   PORT=5000
   JWT_SECRET=<chave jwt>
   GEMINI_API_KEY=<api opcional>
   ```

4. **Execute os servidores:**

   - Para o backend:
     ```bash
     npm start
     ```

   - Para o frontend (caso separado ou monorepo com script específico):
     ```bash
     npm run dev
     ```

## Documentação da API

Acesse via Swagger:
```
https://plataforma-gestao-analise-pericial-b2a1.onrender.com/api-docs
```
Consulte o repositório da API [aqui](https://github.com/kethyllecury/Plataforma-Gestao-Analise-Pericial-Backend).

## Contribuidores

- [Gabriel de Santana](https://github.com/gabrieldsantana)
- [Henrique Fernandes](https://github.com/henriferi)
- [Kethylle Cury](https://github.com/kethyllecury)

---
