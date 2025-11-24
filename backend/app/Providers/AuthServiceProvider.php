<?php

namespace App\Providers;

use App\Models\Transaction;
use App\Models\Account;
use App\Models\Budget;
use App\Models\Goal;
use App\Models\Notification;
use App\Policies\TransactionPolicy;
use App\Policies\AccountPolicy;
use App\Policies\BudgetPolicy;
use App\Policies\GoalPolicy;
use App\Policies\NotificationPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Transaction::class => TransactionPolicy::class,
        Account::class => AccountPolicy::class,
        Budget::class => BudgetPolicy::class,
        Goal::class => GoalPolicy::class,
        Notification::class => NotificationPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        //
    }
}