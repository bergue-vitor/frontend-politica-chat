# Frontend - Assistente de Políticas

Interface web de um assistente de chat com inteligência artificial voltado para auditoria. O sistema responde perguntas com base em documentos e políticas internas da empresa.

**Funcionalidades:**
- Login com controle de perfil simulado
- Área de chat com IA atualmente mockada
- Painel administrativo com telas de usuários, catálogos e tokens
- Telas reservadas para documentos e linha do tempo
- Controle de acesso por perfil de usuário

---

## Tecnologias

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [React Router DOM](https://reactrouter.com/)

---

## Pré-requisitos

Antes de começar, você precisa instalar as seguintes ferramentas no seu computador:

### 1. Node.js
O Node.js já vem com o `npm` (gerenciador de pacotes) incluso.

- Acesse: https://nodejs.org
- Baixe a versão **LTS** (recomendada)
- Instale normalmente seguindo os passos do instalador

Para verificar se instalou corretamente, abra o terminal e digite:
```bash
node -v
npm -v
```
Ambos devem exibir um número de versão.

### 2. Git
Necessário para clonar o repositório.

- Acesse: https://git-scm.com
- Baixe e instale para o seu sistema operacional

Para verificar:
```bash
git --version
```

---

## Como rodar o projeto

### Passo 1 — Clone o repositório

Abra o terminal, navegue até a pasta onde deseja salvar o projeto e execute:

```bash
git clone https://github.com/bergue-vitor/frontend-politica-chat.git
```

### Passo 2 — Entre na pasta do projeto

```bash
cd frontend-politica-chat/main
```

### Passo 3 — Instale as dependências

```bash
npm install
```

> Isso pode demorar alguns minutos na primeira vez.

### Passo 4 — Rode o servidor de desenvolvimento

```bash
npm run dev
```

O terminal vai exibir algo como:

```
  VITE v8.x.x  ready in 500ms

  ➜  Local:   http://localhost:5173/
```

Abra o navegador e acesse **http://localhost:5173**

---

## Outros comandos úteis

| Comando | O que faz |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a versão de produção na pasta `dist/` |
| `npm run preview` | Visualiza a build de produção localmente |
| `npm run lint` | Verifica erros de código |

---

## Estrutura de pastas

```
main/
├── src/
│   ├── components/     # Componentes reutilizáveis
│   ├── contexts/       # Contextos React (ex: autenticação)
│   ├── layouts/        # Layouts de página
│   ├── pages/          # Páginas da aplicação
│   │   ├── Chat/       # Tela de chat
│   │   ├── Login/      # Tela de login
│   │   ├── AdminUsers/ # Gestão de usuários
│   │   └── ...
│   ├── styles/         # Arquivos CSS globais
│   └── types/          # Tipos TypeScript
├── index.html
├── package.json
└── vite.config.ts
```

---

## Problemas comuns

**`npm install` deu erro de permissão**
> No Windows, abra o terminal como Administrador e tente novamente.

**Porta 5173 já está em uso**
> Outro processo está usando a porta. O Vite automaticamente tenta a próxima porta disponível (ex: 5174).

**Comando `npm` não reconhecido**
> O Node.js não foi instalado corretamente. Reinstale e reinicie o terminal.
