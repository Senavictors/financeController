# 🏦 Finance Controller

Um aplicativo completo de gestão financeira pessoal desenvolvido com React e Laravel, projetado para ajudar usuários a controlar suas finanças, definir metas e alcançar a liberdade financeira.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação e Configuração](#instalação-e-configuração)
- [Uso](#uso)
- [API e Backend](#api-e-backend)
- [Banco de Dados](#banco-de-dados)
- [Próximos Passos](#próximos-passos)
- [Contribuição](#contribuição)
- [Licença](#licença)

## 🎯 Visão Geral

O Finance Controller é uma aplicação web moderna que permite aos usuários:

- Gerenciar transações financeiras diárias
- Controlar orçamentos por categoria
- Acompanhar metas financeiras
- Visualizar relatórios detalhados
- Gerenciar múltiplas contas bancárias e cartões
- Exportar dados e relatórios

## ✨ Funcionalidades

### Frontend (React)
- **Dashboard Interativo**: Visão geral completa das finanças com gráficos e métricas
- **Gestão de Transações**: CRUD completo de transações com categorização
- **Controle de Orçamentos**: Definição e acompanhamento de orçamentos por categoria
- **Metas Financeiras**: Definição de metas com acompanhamento de progresso
- **Relatórios**: Análises detalhadas com gráficos interativos
- **Gerenciamento de Contas**: Controle de contas bancárias e cartões de crédito
- **Configurações**: Personalização completa da aplicação

### Backend (Laravel)
- **API RESTful**: Endpoints bem documentados para todas as operações
- **Autenticação JWT**: Sistema seguro de autenticação
- **Gestão de Usuários**: Cadastro, perfil e preferências
- **Categorização Inteligente**: Sistema de categorias personalizáveis
- **Exportação de Dados**: Geração de relatórios em PDF e CSV
- **Notificações**: Sistema de alertas e lembretes

## 🛠 Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca JavaScript para construção de interfaces
- **Material-UI v5** - Componentes React seguindo as diretrizes do Material Design
- **React Router v6** - Roteamento client-side
- **Recharts** - Biblioteca de gráficos e visualizações
- **Axios** - Cliente HTTP para consumir APIs
- **React Hook Form** - Gerenciamento de formulários
- **Zustand** - Gerenciamento de estado global
- **TypeScript** - Superset JavaScript com tipagem estática

### Backend
- **Laravel 10** - Framework PHP robusto e escalável
- **MySQL/PostgreSQL** - Banco de dados relacional
- **Redis** - Cache e armazenamento de sessões
- **JWT** - Autenticação baseada em tokens
- **Laravel Sanctum** - Autenticação de API
- **PHP Unit** - Testes automatizados

### Infraestrutura
- **Docker** - Containerização da aplicação
- **Nginx** - Servidor web de alta performance
- **Git** - Controle de versão
- **Vercel** - Hospedagem do frontend
- **Digital Ocean/AWS** - Hospedagem do backend

## 📁 Estrutura do Projeto

```
finance-controller/
├── front/                    # Frontend React
│   ├── public/              # Arquivos públicos
│   ├── src/
│   │   ├── components/      # Componentes React reutilizáveis
│   │   ├── layouts/        # Layouts principais do sistema
│   │   │   ├── dashboard/   # Dashboard financeiro
│   │   │   ├── transactions/ # Página de transações
│   │   │   ├── accounts/    # Gerenciamento de contas
│   │   │   ├── budgets/     # Controle de orçamentos
│   │   │   ├── goals/       # Metas financeiras
│   │   │   ├── reports/     # Relatórios e análises
│   │   │   └── settings/    # Configurações do sistema
│   │   ├── hooks/          # Hooks customizados
│   │   ├── utils/          # Funções utilitárias
│   │   ├── context/        # Context API
│   │   ├── api/            # Integração com backend
│   │   └── routes.js       # Configuração de rotas
│   └── package.json
│
├── backend/                 # Backend Laravel
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/ # Controladores da API
│   │   │   ├── Middleware/  # Middlewares
│   │   │   └── Requests/    # Validações de requisição
│   │   ├── Models/          # Modelos Eloquent
│   │   ├── Services/       # Lógica de negócio
│   │   └── Jobs/           # Filas e jobs
│   ├── database/
│   │   ├── migrations/     # Migrações do banco
│   │   └── seeders/        # Dados iniciais
│   ├── routes/
│   │   ├── api.php         # Rotas da API
│   │   └── web.php         # Rotas web
│   ├── tests/              # Testes automatizados
│   └── composer.json
│
├── docker-compose.yml       # Configuração Docker
├── .env.example            # Exemplo de variáveis de ambiente
└── README.md
```

## 🚀 Instalação e Configuração

### Pré-requisitos
- Node.js (v18 ou superior)
- PHP (v8.1 ou superior)
- Composer
- MySQL ou PostgreSQL
- Docker (opcional)

### Frontend (React)

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/finance-controller.git
cd finance-controller/front

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Inicie o servidor de desenvolvimento
npm start

# Acesse http://localhost:3000
```

### Backend (Laravel)

```bash
# Navegue até o diretório backend
cd finance-controller/backend

# Instale as dependências do PHP
composer install

# Copie o arquivo de configuração
cp .env.example .env

# Gere a chave da aplicação
php artisan key:generate

# Configure o banco de dados no arquivo .env
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=finance_controller
# DB_USERNAME=seu_usuario
# DB_PASSWORD=sua_senha

# Execute as migrações
php artisan migrate

# Popule o banco com dados iniciais
php artisan db:seed

# Inicie o servidor
php artisan serve

# Acesse http://localhost:8000
```

### Docker (Opcional)

```bash
# Na raiz do projeto
docker-compose up -d

# Aguarde a inicialização dos containers
# Frontend: http://localhost:3000
# Backend: http://localhost:8000
# PHPMyAdmin: http://localhost:8080
```

## 📖 Uso

### Primeiros Passos
1. **Crie sua conta**: Acesse a página de cadastro e crie sua conta
2. **Configure seu perfil**: Adicione suas informações pessoais e preferências
3. **Adicione suas contas**: Cadastre suas contas bancárias e cartões
4. **Defina categorias**: Personalize as categorias de acordo com seu estilo de vida
5. **Registre transações**: Comece a registrar suas receitas e despesas
6. **Estabeleça metas**: Defina objetivos financeiros de curto, médio e longo prazo
7. **Acompanhe relatórios**: Monitore seu progresso através dos relatórios detalhados

### Dicas de Uso
- **Categorize tudo**: Mantenha suas transações bem categorizadas para melhores análises
- **Defina orçamentos realistas**: Comece com metas alcançáveis e ajuste conforme necessário
- **Revise regularmente**: Acompanhe seus relatórios mensalmente para identificar padrões
- **Use as metas**: Estabeleça objetivos claros para manter a motivação
- **Exporte dados**: Faça backup regular dos seus dados através da exportação

## 🔌 API e Backend

### Endpoints Principais

#### Autenticação
- `POST /api/auth/register` - Cadastro de novos usuários
- `POST /api/auth/login` - Login de usuários
- `POST /api/auth/logout` - Logout de usuários
- `GET /api/auth/profile` - Perfil do usuário autenticado

#### Transações
- `GET /api/transactions` - Listar todas as transações
- `POST /api/transactions` - Criar nova transação
- `GET /api/transactions/{id}` - Detalhes de uma transação
- `PUT /api/transactions/{id}` - Atualizar transação
- `DELETE /api/transactions/{id}` - Excluir transação

#### Categorias
- `GET /api/categories` - Listar categorias
- `POST /api/categories` - Criar nova categoria
- `PUT /api/categories/{id}` - Atualizar categoria
- `DELETE /api/categories/{id}` - Excluir categoria

#### Contas
- `GET /api/accounts` - Listar contas bancárias
- `POST /api/accounts` - Criar nova conta
- `PUT /api/accounts/{id}` - Atualizar conta
- `DELETE /api/accounts/{id}` - Excluir conta

#### Orçamentos
- `GET /api/budgets` - Listar orçamentos
- `POST /api/budgets` - Criar novo orçamento
- `PUT /api/budgets/{id}` - Atualizar orçamento
- `DELETE /api/budgets/{id}` - Excluir orçamento

#### Metas
- `GET /api/goals` - Listar metas financeiras
- `POST /api/goals` - Criar nova meta
- `PUT /api/goals/{id}` - Atualizar meta
- `DELETE /api/goals/{id}` - Excluir meta

### Documentação Completa da API
A documentação completa da API está disponível em: `http://localhost:8000/api/documentation`

## 💾 Banco de Dados

### Estrutura Principal

#### Tabelas de Usuário
- `users` - Informações dos usuários
- `password_resets` - Recuperação de senha
- `personal_access_tokens` - Tokens de API

#### Tabelas Financeiras
- `accounts` - Contas bancárias e cartões
- `categories` - Categorias de transações
- `transactions` - Registro de todas as transações
- `budgets` - Orçamentos mensais
- `goals` - Metas financeiras
- `goal_progress` - Progresso das metas

#### Tabelas de Relatórios
- `monthly_summaries` - Resumos mensais
- `category_summaries` - Resumos por categoria
- `account_balances` - Saldos históricos

### Relacionamentos
- Usuário → Transações (1:N)
- Usuário → Contas (1:N)
- Usuário → Categorias (1:N)
- Usuário → Orçamentos (1:N)
- Usuário → Metas (1:N)
- Transação → Categoria (N:1)
- Transação → Conta (N:1)
- Orçamento → Categoria (N:1)

## 🔮 Próximos Passos

### Funcionalidades Planejadas
- [ ] **Inteligência Artificial**: Previsões e recomendações financeiras
- [ ] **Integração Bancária**: Conexão direta com APIs bancárias
- [ ] **Investimentos**: Controle de carteira e acompanhamento de rendimentos
- [ ] **Planejamento Tributário**: Cálculo e otimização de impostos
- [ ] **App Mobile**: Versão mobile nativa (React Native)
- [ ] **Notificações Inteligentes**: Alertas personalizados baseados em padrões
- [ ] **Compartilhamento**: Contas compartilhadas para famílias
- [ ] **Moedas Internacionais**: Suporte a múltiplas moedas
- [ ] **Importação de Dados**: Importação de extratos bancários
- [ ] **Exportação Fiscal**: Geração de relatórios para declaração de imposto

### Melhorias Técnicas
- [ ] **Testes Automatizados**: Cobertura completa de testes
- [ ] **Performance**: Otimização de queries e cache
- [ ] **Segurança**: Auditoria de segurança completa
- [ ] **Monitoramento**: Sistema de logs e monitoramento
- [ ] **CI/CD**: Pipeline completo de integração contínua
- [ ] **Documentação**: Documentação técnica completa

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Diretrizes de Contribuição
- Mantenha o código limpo e bem documentado
- Siga os padrões de código existentes
- Adicione testes para novas funcionalidades
- Atualize a documentação conforme necessário
- Seja respeitoso e construtivo nos comentários

## 🐛 Reportando Bugs

Encontrou um bug? Por favor, abra uma issue com:
- Descrição detalhada do problema
- Passos para reproduzir
- Comportamento esperado vs comportamento atual
- Screenshots (se aplicável)
- Informações do ambiente (sistema operacional, navegador, versões)

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👥 Autores

- **João Silva** - *Desenvolvimento Frontend* - [GitHub](https://github.com/joaosilva)
- **Maria Santos** - *Desenvolvimento Backend* - [GitHub](https://github.com/mariasantos)
- **Pedro Oliveira** - *UI/UX Design* - [Behance](https://behance.net/pedrooliveira)

## 🙏 Agradecimentos

- Aos contribuidores do Material-UI por fornecer componentes incríveis
- À comunidade Laravel por tornar o desenvolvimento backend mais fácil
- Aos nossos beta testers por feedback valioso
- Aos criadores de bibliotecas open source que utilizamos

## 📞 Suporte

Para suporte, envie um email para: suporte@financecontroller.com ou entre em nosso [Discord](https://discord.gg/financecontroller)

---

**⭐ Se este projeto te ajudou, considere dar uma estrela no GitHub! ⭐**

---

*Última atualização: Novembro 2024*