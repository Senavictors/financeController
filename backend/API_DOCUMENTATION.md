# API de Controle Financeiro - Documentação

## Visão Geral
API RESTful para sistema de controle financeiro pessoal desenvolvida em Laravel.

## Autenticação
A API usa Laravel Sanctum para autenticação via tokens.

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
    "email": "teste@example.com",
    "password": "password123"
}
```

### Registro
```http
POST /api/auth/register
Content-Type: application/json

{
    "name": "Nome do Usuário",
    "email": "usuario@example.com",
    "password": "senha123",
    "password_confirmation": "senha123"
}
```

### Logout
```http
POST /api/auth/logout
Authorization: Bearer {token}
```

## Endpoints

### Transações
- `GET /api/transactions` - Listar todas as transações
- `POST /api/transactions` - Criar nova transação
- `GET /api/transactions/{id}` - Buscar transação específica
- `PUT /api/transactions/{id}` - Atualizar transação
- `DELETE /api/transactions/{id}` - Deletar transação
- `GET /api/transactions/summary` - Resumo de transações

### Categorias
- `GET /api/categories` - Listar categorias
- `POST /api/categories` - Criar categoria
- `GET /api/categories/{id}` - Buscar categoria
- `PUT /api/categories/{id}` - Atualizar categoria
- `DELETE /api/categories/{id}` - Deletar categoria

### Contas
- `GET /api/accounts` - Listar contas bancárias
- `POST /api/accounts` - Criar conta bancária
- `GET /api/accounts/{id}` - Buscar conta
- `PUT /api/accounts/{id}` - Atualizar conta
- `DELETE /api/accounts/{id}` - Deletar conta
- `GET /api/accounts/balance/summary` - Resumo de saldos

### Orçamentos
- `GET /api/budgets` - Listar orçamentos
- `POST /api/budgets` - Criar orçamento
- `GET /api/budgets/{id}` - Buscar orçamento
- `PUT /api/budgets/{id}` - Atualizar orçamento
- `DELETE /api/budgets/{id}` - Deletar orçamento
- `GET /api/budgets/summary/all` - Resumo de orçamentos

### Metas
- `GET /api/goals` - Listar metas
- `POST /api/goals` - Criar meta
- `GET /api/goals/{id}` - Buscar meta
- `PUT /api/goals/{id}` - Atualizar meta
- `DELETE /api/goals/{id}` - Deletar meta
- `GET /api/goals/progress/all` - Progresso das metas

### Relatórios
- `GET /api/reports/dashboard` - Dashboard com resumos
- `GET /api/reports/expenses-by-category` - Despesas por categoria
- `GET /api/reports/income-vs-expenses` - Receitas vs Despesas
- `GET /api/reports/export?type=csv` - Exportar relatório

### Notificações
- `GET /api/notifications` - Listar notificações
- `GET /api/notifications/unread` - Notificações não lidas
- `PUT /api/notifications/{id}/read` - Marcar como lida
- `PUT /api/notifications/read-all` - Marcar todas como lidas
- `DELETE /api/notifications/{id}` - Deletar notificação
- `DELETE /api/notifications/clear` - Limpar todas

### Configurações
- `GET /api/settings` - Configurações do usuário
- `PUT /api/settings/profile` - Atualizar perfil
- `PUT /api/settings/preferences` - Atualizar preferências
- `GET /api/settings/notifications` - Config de notificações
- `PUT /api/settings/notifications` - Atualizar config de notificações

### Usuário
- `GET /api/user` - Dados do usuário
- `PUT /api/user` - Atualizar usuário
- `PUT /api/user/preferences` - Atualizar preferências
- `DELETE /api/user` - Deletar conta

## Exemplos de Uso

### Criar Transação
```http
POST /api/transactions
Authorization: Bearer {token}
Content-Type: application/json

{
    "description": "Supermercado",
    "amount": 150.50,
    "type": "expense",
    "category_id": 3,
    "account_id": 1,
    "transaction_date": "2025-11-21",
    "notes": "Compras do mês"
}
```

### Criar Conta
```http
POST /api/accounts
Authorization: Bearer {token}
Content-Type: application/json

{
    "name": "Conta Poupança",
    "type": "savings",
    "institution": "Banco do Brasil",
    "balance": 10000.00,
    "account_number": "54321-0",
    "is_active": true
}
```

### Criar Orçamento
```http
POST /api/budgets
Authorization: Bearer {token}
Content-Type: application/json

{
    "category_id": 3,
    "name": "Orçamento Alimentação",
    "amount": 800.00,
    "period": "monthly",
    "start_date": "2025-11-01",
    "end_date": "2025-11-30",
    "is_active": true
}
```

### Criar Meta
```http
POST /api/goals
Authorization: Bearer {token}
Content-Type: application/json

{
    "name": "Viagem para Europa",
    "description": "Economizar para viagem dos sonhos",
    "target_amount": 15000.00,
    "current_amount": 3000.00,
    "deadline": "2025-12-31",
    "category": "Viagem",
    "priority": "high",
    "is_achieved": false
}
```

## Códigos de Status HTTP

- `200` - Sucesso
- `201` - Criado com sucesso
- `204` - Deletado com sucesso
- `400` - Requisição inválida
- `401` - Não autorizado
- `403` - Proibido
- `404` - Não encontrado
- `422` - Erro de validação
- `500` - Erro interno do servidor

## Testando a API

O servidor está rodando em: http://127.0.0.1:8001

### Credenciais de Teste
- Email: `teste@example.com`
- Senha: `password123`

### Exemplo de Login
```bash
curl -X POST http://127.0.0.1:8001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "teste@example.com", "password": "password123"}'
```

### Exemplo de Listar Transações
```bash
curl -X GET http://127.0.0.1:8001/api/transactions \
  -H "Authorization: Bearer {token}"
```

Substitua `{token}` pelo token recebido no login.