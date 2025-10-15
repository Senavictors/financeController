# Finance Controller

Uma aplicação completa de controle financeiro desenvolvida com React (frontend) e Laravel (backend), totalmente dockerizada para facilitar o desenvolvimento e deploy.

## 📋 Sobre o Projeto

O Finance Controller é uma aplicação web moderna para gerenciamento de finanças pessoais, permitindo o controle de receitas, despesas e categorização de transações. A aplicação oferece uma interface intuitiva baseada no Material Dashboard 2 React e uma API robusta construída com Laravel.

## 🏗️ Arquitetura

### Frontend (React)
- **Localização**: `./front/`
- **Framework**: React 18 com Material-UI
- **Template**: Material Dashboard 2 React
- **Porta**: 3000

### Backend (Laravel)
- **Localização**: `./backend/`
- **Framework**: Laravel 12
- **PHP**: 8.2
- **Porta**: 8000

### Banco de Dados
- **MySQL**: 8.0
- **Porta**: 3306
- **phpMyAdmin**: Porta 8080

## 🚀 Funcionalidades

### ✅ Implementadas
- Dashboard principal com Material Design
- Sistema de categorias de transações
- CRUD completo de transações
- API RESTful com Laravel
- Dockerização completa
- Migrations e estrutura de banco
- Interface responsiva

### 🔄 Em Desenvolvimento
- Sistema de autenticação
- Relatórios e gráficos
- Filtros avançados
- Exportação de dados

## 🛠️ Tecnologias Utilizadas

### Frontend
- React 18
- Material-UI (MUI)
- React Router
- Axios
- Material Dashboard 2 React

### Backend
- Laravel 12
- PHP 8.2
- MySQL 8.0
- Nginx
- Supervisor

### DevOps
- Docker & Docker Compose
- Multi-stage builds
- Volume persistence

## 📦 Instalação e Execução

### Pré-requisitos
- Docker
- Docker Compose

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd finance-controller
```

### 2. Execute com Docker
```bash
# Construir e iniciar todos os serviços
docker-compose up --build

# Ou em background
docker-compose up -d --build
```

### 3. Configure o backend (primeira execução)
```bash
# Gerar chave da aplicação Laravel
docker-compose exec backend php artisan key:generate

# Executar migrations
docker-compose exec backend php artisan migrate

# (Opcional) Executar seeders
docker-compose exec backend php artisan db:seed
```

## 🌐 Acessos

Após executar o docker-compose, os serviços estarão disponíveis em:

- **Frontend React**: http://localhost:3000
- **Backend Laravel**: http://localhost:8000
- **phpMyAdmin**: http://localhost:8080
- **MySQL**: localhost:3306

### Credenciais do Banco
- **Database**: finance_controller
- **Username**: finance_user
- **Password**: finance_password
- **Root Password**: root_password

## 📁 Estrutura do Projeto

```
finance-controller/
├── front/                    # Frontend React
│   ├── src/
│   │   ├── components/       # Componentes reutilizáveis
│   │   ├── layouts/          # Layouts da aplicação
│   │   ├── examples/         # Componentes de exemplo
│   │   ├── assets/           # Imagens, estilos, temas
│   │   ├── api/              # Configuração da API
│   │   └── context/          # Context API do React
│   ├── public/
│   ├── package.json
│   └── Dockerfile
├── backend/                  # Backend Laravel
│   ├── app/
│   │   ├── Http/Controllers/ # Controllers da API
│   │   └── Models/           # Models Eloquent
│   ├── database/
│   │   ├── migrations/       # Migrations do banco
│   │   └── seeders/          # Seeders
│   ├── routes/
│   │   └── api.php           # Rotas da API
│   ├── docker/               # Configurações Docker
│   ├── composer.json
│   └── Dockerfile
├── docker-compose.yml        # Orquestração dos serviços
├── .gitignore               # Arquivos ignorados pelo Git
└── README.md                # Este arquivo
```

## 🔧 Comandos Úteis

### Docker
```bash
# Ver logs dos serviços
docker-compose logs -f

# Parar os serviços
docker-compose down

# Reconstruir um serviço específico
docker-compose build frontend
docker-compose build backend

# Acessar container
docker-compose exec frontend sh
docker-compose exec backend bash
```

### Laravel (Backend)
```bash
# Executar migrations
docker-compose exec backend php artisan migrate

# Rollback migrations
docker-compose exec backend php artisan migrate:rollback

# Limpar cache
docker-compose exec backend php artisan cache:clear
docker-compose exec backend php artisan config:clear

# Gerar nova chave
docker-compose exec backend php artisan key:generate
```

### React (Frontend)
```bash
# Instalar dependências
docker-compose exec frontend npm install

# Build de produção
docker-compose exec frontend npm run build
```

## 🗄️ Banco de Dados

### Tabelas Principais

#### Categories
- `id`: Primary key
- `name`: Nome da categoria
- `description`: Descrição da categoria
- `created_at`, `updated_at`: Timestamps

#### Transactions
- `id`: Primary key
- `category_id`: Foreign key para categories
- `amount`: Valor da transação
- `description`: Descrição da transação
- `type`: Tipo (income/expense)
- `date`: Data da transação
- `created_at`, `updated_at`: Timestamps

## 🚨 Troubleshooting

### Problemas Comuns

#### Backend não responde (502 Bad Gateway)
```bash
# Verificar logs do backend
docker-compose logs backend

# Reconstruir o container
docker-compose build backend
docker-compose up -d backend
```

#### Erro de permissões (Laravel)
```bash
docker-compose exec backend chown -R www-data:www-data /var/www/storage
docker-compose exec backend chmod -R 755 /var/www/storage
```

#### Frontend não carrega
```bash
# Verificar se as dependências estão instaladas
docker-compose exec frontend npm install

# Reconstruir o container
docker-compose build frontend
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para suporte e dúvidas:
- Abra uma issue no GitHub
- Consulte a documentação do Docker
- Verifique os logs dos containers

---

**Desenvolvido com ❤️ usando React, Laravel e Docker**