# Backend — Instruções (Banco MySQL + Testes)

Resumo
- Este backend foi originalmente implementado usando Supabase/Postgres (veja `server.js`).
- Fornecemos scripts MySQL para quem quiser rodar localmente: `backend/db/init.sql` e `backend/db/seed.sql`.

Pré-requisitos
- Node.js 14+ e npm
- MySQL server (local ou remoto)

Criar o banco de dados (MySQL)
1. Ajuste as variáveis em `.env` (baseado em `.env.example`).
2. Execute o script de criação:

```powershell
mysql -u <user> -p < backend/db/init.sql
```

3. Para popular dados de teste (ambiente dev):

```powershell
mysql -u <user> -p projeto_mensagem < backend/db/seed.sql
```

Observação sobre senhas: os hashes de senha no `seed.sql` são placeholders. Gere hashes reais com bcrypt:

```javascript
const bcrypt = require('bcryptjs');
const h = await bcrypt.hash('sua_senha', 10);
console.log(h);
```

Rodar o servidor (modo atual — Supabase)
1. Copie `.env.example` para `.env` e preencha `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` e `JWT_SECRET`.
2. Instale dependências:

```powershell
npm install
```

3. Inicie:

```powershell
npm run start
```

Notas sobre integração com MySQL
- O `server.js` atual usa Supabase (Postgres). Para migrar para MySQL você pode:
  1. Substituir chamadas ao Supabase por queries usando `mysql2` ou um ORM (Sequelize/Knex).
  2. Manter a API/contratos existentes — as tabelas criadas em `init.sql` contém colunas compatíveis com as que `server.js` espera (nomes como `users.id`, `messages.message`, `created_at`).

Testes / Homologação (fluxos essenciais)
- Login: POST `/login` com `{ email, password }` — retorna `token` JWT.
- Criar chat: POST `/chats` com `{ otherUserId }` (autenticado).
- Carregar histórico: GET `/messages/:chatId` (autenticado).
- Enviar mensagem (WebSocket): conectar via Socket.IO com autenticação `token` e emitir `send_message`.

Checklist de homologação manual
- [ ] Mobile enviando msg → backend salva → web mostra
- [ ] Web enviando msg → backend salva → mobile mostra
- [ ] Notificações push chegando (use tokens na tabela `devices` e FCM)
- [ ] Histórico carregando
- [ ] Login funcionando

Ajude a automatizar?
- Posso gerar um script Node de exemplo (`backend/scripts`) que conecta ao MySQL e valida endpoints básicos (criar user, criar chat, enviar mensagem). Quer que eu gere esse script agora?

Observação para usuários do PowerShell (Windows)
- No PowerShell o operador `<` é reservado e não funciona como redirecionamento para o cliente `mysql`.
- Duas opções seguras para executar os scripts SQL no PowerShell:

  1) Usar o `cmd.exe` para executar o redirecionamento como em shells Unix:

```powershell
cmd /c "mysql -u <seu_user> -p < backend\db\init.sql"
```

  2) Usar `Get-Content` e pipe para `mysql` (recomendado no PowerShell):

```powershell
Get-Content .\backend\db\init.sql -Raw | mysql -u <seu_user> -p <seu_banco>
```

- Atenção ao uso de flags: `-u` espera o NOME do usuário (ex: `-u root`). Se quiser passar o nome do banco diretamente, coloque-o após as flags, por exemplo `mysql -u root -p projeto_mensagem`.

Exemplos completos (ajuste `root` e `projeto_mensagem` conforme seu ambiente):

```powershell
# Criar banco com cmd.exe
cmd /c "mysql -u root -p < backend\db\init.sql"

# Ou usando Get-Content
Get-Content .\backend\db\init.sql -Raw | mysql -u root -p projeto_mensagem

# Popular dados de teste
Get-Content .\backend\db\seed.sql -Raw | mysql -u root -p projeto_mensagem
```
