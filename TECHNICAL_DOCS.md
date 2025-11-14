# 📚 Documentação Técnica - Finance Controller

## 🎯 Visão Geral

Esta documentação técnica fornece informações detalhadas sobre a arquitetura, componentes e padrões utilizados no desenvolvimento do Finance Controller.

## 🏗️ Arquitetura do Sistema

### Arquitetura Frontend (React)

```
┌─────────────────────────────────────────────────────────────┐
│                     React Application                       │
├─────────────────────────────────────────────────────────────┤
│  Pages/Layouts  │  Components  │  Hooks  │  Utils  │  API  │
├─────────────────────────────────────────────────────────────┤
│                    Context API                             │
├─────────────────────────────────────────────────────────────┤
│                  Material-UI Theme                         │
├─────────────────────────────────────────────────────────────┤
│                    React Router                            │
└─────────────────────────────────────────────────────────────┘
```

### Arquitetura Backend (Laravel)

```
┌─────────────────────────────────────────────────────────────┐
│                    API RESTful                              │
├─────────────────────────────────────────────────────────────┤
│                Controllers/Resources                        │
├─────────────────────────────────────────────────────────────┤
│                   Services/Business                         │
├─────────────────────────────────────────────────────────────┤
│                    Models/Eloquent                          │
├─────────────────────────────────────────────────────────────┤
│                  Database/Migrations                          │
└─────────────────────────────────────────────────────────────┘
```

## 📋 Padrões de Desenvolvimento

### Frontend Patterns

#### 1. Component Structure
```javascript
/**
 * Componente React seguindo padrão funcional
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Material-UI imports
import { Card, Grid, Typography } from '@mui/material';

// Custom components
import MDBox from 'components/MDBox';

// Utils and hooks
import { formatCurrency } from 'utils/formatters';
import { useFinancialData } from 'hooks/useFinancialData';

const FinancialCard = ({ title, amount, type, onAction }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { data, loading } = useFinancialData();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleAction = () => {
    onAction && onAction(amount);
  };

  return (
    <Card>
      <MDBox p={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">
              {title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" color={type === 'income' ? 'success' : 'error'}>
              {formatCurrency(amount)}
            </Typography>
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
};

FinancialCard.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['income', 'expense']).isRequired,
  onAction: PropTypes.func,
};

FinancialCard.defaultProps = {
  onAction: null,
};

export default FinancialCard;
```

#### 2. Custom Hooks
```javascript
/**
 * Hook customizado para dados financeiros
 */
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { financialAPI } from 'api/financial';

export const useFinancialData = (filters = {}) => {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['financialData', filters],
    queryFn: () => financialAPI.getSummary(filters),
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 3,
  });

  useEffect(() => {
    if (data) {
      setSummary({
        totalIncome: data.totalIncome || 0,
        totalExpense: data.totalExpense || 0,
        balance: data.balance || 0,
      });
    }
  }, [data]);

  return {
    data: summary,
    loading: isLoading,
    error,
    refetch,
  };
};
```

#### 3. State Management (Zustand)
```javascript
/**
 * Gerenciamento de estado global com Zustand
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (user, token) => {
        set({ user, token, isAuthenticated: true });
        localStorage.setItem('token', token);
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        localStorage.removeItem('token');
      },

      updateUser: (userData) => {
        set({ user: { ...get().user, ...userData } });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
```

### Backend Patterns

#### 1. Repository Pattern
```php
<?php

namespace App\Repositories;

use App\Models\Transaction;
use App\Interfaces\TransactionRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class TransactionRepository implements TransactionRepositoryInterface
{
    protected Transaction $model;

    public function __construct(Transaction $model)
    {
        $this->model = $model;
    }

    public function getUserTransactions(int $userId, array $filters = []): LengthAwarePaginator
    {
        return $this->model
            ->where('user_id', $userId)
            ->when($filters['category_id'] ?? null, function ($query, $categoryId) {
                $query->where('category_id', $categoryId);
            })
            ->when($filters['account_id'] ?? null, function ($query, $accountId) {
                $query->where('account_id', $accountId);
            })
            ->when($filters['date_from'] ?? null, function ($query, $dateFrom) {
                $query->whereDate('transaction_date', '>=', $dateFrom);
            })
            ->when($filters['date_to'] ?? null, function ($query, $dateTo) {
                $query->whereDate('transaction_date', '<=', $dateTo);
            })
            ->with(['category', 'account'])
            ->orderBy('transaction_date', 'desc')
            ->paginate($filters['per_page'] ?? 15);
    }

    public function createTransaction(array $data): Transaction
    {
        return $this->model->create($data);
    }

    public function updateTransaction(int $id, array $data): bool
    {
        return $this->model->where('id', $id)->update($data);
    }

    public function deleteTransaction(int $id): bool
    {
        return $this->model->where('id', $id)->delete();
    }

    public function getMonthlySummary(int $userId, string $month): array
    {
        return $this->model
            ->where('user_id', $userId)
            ->whereMonth('transaction_date', $month)
            ->selectRaw('
                SUM(CASE WHEN type = "income" THEN amount ELSE 0 END) as total_income,
                SUM(CASE WHEN type = "expense" THEN amount ELSE 0 END) as total_expense,
                COUNT(*) as transaction_count
            ')
            ->first()
            ->toArray();
    }
}
```

#### 2. Service Layer
```php
<?php

namespace App\Services;

use App\Models\Transaction;
use App\Repositories\TransactionRepository;
use App\Services\CategoryService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class TransactionService
{
    protected TransactionRepository $repository;
    protected CategoryService $categoryService;

    public function __construct(
        TransactionRepository $repository,
        CategoryService $categoryService
    ) {
        $this->repository = $repository;
        $this->categoryService = $categoryService;
    }

    public function createTransaction(array $data): Transaction
    {
        return DB::transaction(function () use ($data) {
            try {
                // Valida a categoria
                $category = $this->categoryService->validateUserCategory(
                    $data['user_id'],
                    $data['category_id']
                );

                // Cria a transação
                $transaction = $this->repository->createTransaction([
                    'user_id' => $data['user_id'],
                    'account_id' => $data['account_id'],
                    'category_id' => $data['category_id'],
                    'amount' => $data['amount'],
                    'type' => $data['type'],
                    'description' => $data['description'],
                    'transaction_date' => $data['transaction_date'],
                    'tags' => $data['tags'] ?? null,
                ]);

                // Atualiza o saldo da conta
                $this->updateAccountBalance($transaction);

                // Verifica alertas de orçamento
                $this->checkBudgetAlerts($transaction);

                Log::info('Transaction created successfully', [
                    'transaction_id' => $transaction->id,
                    'user_id' => $data['user_id']
                ]);

                return $transaction;

            } catch (\Exception $e) {
                Log::error('Failed to create transaction', [
                    'error' => $e->getMessage(),
                    'data' => $data
                ]);
                throw $e;
            }
        });
    }

    private function updateAccountBalance(Transaction $transaction): void
    {
        $account = $transaction->account;
        
        if ($transaction->type === 'income') {
            $account->balance += $transaction->amount;
        } else {
            $account->balance -= $transaction->amount;
        }

        $account->save();
    }

    private function checkBudgetAlerts(Transaction $transaction): void
    {
        $budgetService = app(BudgetService::class);
        $budgetService->checkBudgetLimit($transaction);
    }
}
```

## 🗃️ Estrutura de Dados

### Modelos Principais

#### User Model
```php
<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'birth_date',
        'currency',
        'language',
        'timezone',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'birth_date' => 'date',
    ];

    // Relationships
    public function accounts()
    {
        return $this->hasMany(Account::class);
    }

    public function categories()
    {
        return $this->hasMany(Category::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public function budgets()
    {
        return $this->hasMany(Budget::class);
    }

    public function goals()
    {
        return $this->hasMany(Goal::class);
    }
}
```

#### Transaction Model
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Transaction extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'account_id',
        'category_id',
        'amount',
        'type', // income, expense
        'description',
        'transaction_date',
        'tags',
        'is_recurring',
        'recurring_frequency',
        'attachment_path',
    ];

    protected $casts = [
        'transaction_date' => 'date',
        'amount' => 'decimal:2',
        'is_recurring' => 'boolean',
    ];

    protected $dates = ['deleted_at'];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function account()
    {
        return $this->belongsTo(Account::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // Scopes
    public function scopeIncome($query)
    {
        return $query->where('type', 'income');
    }

    public function scopeExpense($query)
    {
        return $query->where('type', 'expense');
    }

    public function scopeByDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('transaction_date', [$startDate, $endDate]);
    }

    // Accessors
    public function getFormattedAmountAttribute()
    {
        return number_format($this->amount, 2, ',', '.');
    }

    public function getTypeLabelAttribute()
    {
        return $this->type === 'income' ? 'Receita' : 'Despesa';
    }
}
```

## 🔧 Configurações e Variáveis de Ambiente

### Frontend (.env)
```bash
# API Configuration
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_API_TIMEOUT=30000

# Authentication
REACT_APP_JWT_SECRET=your-jwt-secret-here

# Features
REACT_APP_ENABLE_ANALYTICS=true
REACT_APP_ENABLE_NOTIFICATIONS=true

# UI Configuration
REACT_APP_DEFAULT_CURRENCY=BRL
REACT_APP_DEFAULT_LANGUAGE=pt-BR
REACT_APP_DATE_FORMAT=DD/MM/YYYY

# External Services
REACT_APP_PLAID_CLIENT_ID=your-plaid-client-id
REACT_APP_PLAID_ENVIRONMENT=sandbox
```

### Backend (.env)
```bash
# Application
APP_NAME="Finance Controller"
APP_ENV=local
APP_KEY=base64:your-app-key
APP_DEBUG=true
APP_URL=http://localhost:8000

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=finance_controller
DB_USERNAME=root
DB_PASSWORD=

# Cache
CACHE_DRIVER=redis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

# Queue
QUEUE_CONNECTION=redis

# Mail
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS=noreply@financecontroller.com
MAIL_FROM_NAME="${APP_NAME}"

# JWT
JWT_SECRET=your-jwt-secret-here
JWT_TTL=1440
JWT_REFRESH_TTL=20160

# External APIs
PLAID_CLIENT_ID=your-plaid-client-id
PLAID_CLIENT_SECRET=your-plaid-secret
PLAID_ENV=sandbox

# Financial APIs
ALPHA_VANTAGE_API_KEY=your-alpha-vantage-key
CURRENCY_API_KEY=your-currency-api-key
```

## 🧪 Testes

### Testes Frontend
```bash
# Executar todos os testes
npm test

# Testes com cobertura
npm run test:coverage

# Testes E2E
npm run test:e2e

# Testes de componentes específicos
npm test -- --testPathPattern=FinancialCard
```

### Testes Backend
```bash
# Executar todos os testes
php artisan test

# Testes com cobertura
php artisan test --coverage

# Testes de feature específica
php artisan test --filter=TransactionTest

# Testes de API
php artisan test --testsuite=Feature
```

## 📊 Performance e Otimização

### Frontend Optimization
- Code splitting com React.lazy
- Memoização com useMemo e useCallback
- Virtualização de listas grandes
- Lazy loading de imagens
- Cache de requisições com React Query

### Backend Optimization
- Query optimization com eager loading
- Cache com Redis
- Database indexing
- Queue para processamento assíncrono
- Rate limiting para API

## 🔐 Segurança

### Frontend Security
- Input validation
- XSS protection
- CSRF tokens
- Secure storage de tokens
- HTTPS enforcement

### Backend Security
- JWT authentication
- Rate limiting
- SQL injection prevention
- XSS protection
- File upload validation
- API throttling

## 🚀 Deployment

### Frontend Deployment (Vercel)
```bash
# Build otimizado
npm run build

# Deploy para Vercel
vercel --prod
```

### Backend Deployment (Laravel Forge)
```bash
# Configuração do servidor
# 1. Configure o ambiente
# 2. Configure o banco de dados
# 3. Configure o Redis
# 4. Configure o queue worker
# 5. Configure o cron jobs

# Deploy script
git pull origin main
composer install --no-dev
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan queue:restart
```

## 📈 Monitoramento e Logs

### Frontend Monitoring
- React DevTools Profiler
- Performance monitoring
- Error tracking com Sentry
- Analytics com Google Analytics

### Backend Monitoring
- Laravel Telescope
- Log aggregation
- Error tracking
- Performance monitoring
- Health checks

---

*Esta documentação é mantida e atualizada pela equipe de desenvolvimento do Finance Controller.*