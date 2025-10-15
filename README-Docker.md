# Finance Controller - Docker Setup

Este projeto foi configurado para rodar com Docker, incluindo frontend React, backend Laravel e banco de dados MySQL.

## Estrutura do Projeto

```
finance-controller/
├── front/                 # Frontend React
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── Dockerfile
├── backend/              # Backend Laravel
│   ├── app/
│   ├── database/
│   ├── routes/
│   ├── composer.json
│   └── Dockerfile
├── docker-compose.yml    # Orquestração dos serviços
└── .env.docker          # Variáveis de ambiente
```

## Serviços Disponíveis

- **Frontend (React)**: http://localhost:3000
- **Backend (Laravel)**: http://localhost:8000
- **MySQL**: localhost:3306
- **phpMyAdmin**: http://localhost:8080

## Como Executar

### 1. Construir e Iniciar os Containers

```bash
# Construir e iniciar todos os serviços
docker-compose up --build

# Ou em background
docker-compose up -d --build
```

### 2. Executar Migrations (Primeira vez)

```bash
# Acessar o container do backend
docker-compose exec backend bash

# Dentro do container, executar:
php artisan key:generate
php artisan migrate
php artisan db:seed  # Se houver seeders
```

### 3. Comandos Úteis

```bash
# Ver logs dos serviços
docker-compose logs -f

# Parar os serviços
docker-compose down

# Parar e remover volumes (cuidado: apaga dados do banco)
docker-compose down -v

# Reconstruir apenas um serviço
docker-compose build frontend
docker-compose build backend

# Acessar container específico
docker-compose exec frontend sh
docker-compose exec backend bash
docker-compose exec mysql mysql -u finance_user -p finance_controller
```

## Desenvolvimento

### Frontend (React)
- Código em: `./front/`
- Hot reload habilitado
- Modificações refletem automaticamente

### Backend (Laravel)
- Código em: `./backend/`
- Modificações refletem automaticamente
- Logs disponíveis via `docker-compose logs backend`

### Banco de Dados
- MySQL 8.0
- Dados persistidos em volume Docker
- Acesso via phpMyAdmin ou cliente MySQL

## Troubleshooting

### Problema de Permissões (Laravel)
```bash
docker-compose exec backend chown -R www-data:www-data /var/www/storage
docker-compose exec backend chmod -R 755 /var/www/storage
```

### Limpar Cache do Laravel
```bash
docker-compose exec backend php artisan cache:clear
docker-compose exec backend php artisan config:clear
docker-compose exec backend php artisan route:clear
```

### Reinstalar Dependências
```bash
# Frontend
docker-compose exec frontend npm install

# Backend
docker-compose exec backend composer install
```

## Variáveis de Ambiente

Edite o arquivo `.env.docker` para personalizar:
- Portas dos serviços
- Credenciais do banco de dados
- Nome do projeto

## Produção

Para produção, considere:
1. Usar imagens otimizadas
2. Configurar reverse proxy (Nginx)
3. Usar volumes externos para dados
4. Configurar backup do banco de dados
5. Implementar SSL/TLS