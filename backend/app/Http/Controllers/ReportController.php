<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Transaction;
use App\Models\Budget;
use App\Models\Goal;
use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function dashboard(): JsonResponse
    {
        $user = Auth::user();
        
        $totalIncome = $user->transactions()
            ->where('type', 'income')
            ->whereMonth('transaction_date', now()->month)
            ->sum('amount');

        $totalExpense = $user->transactions()
            ->where('type', 'expense')
            ->whereMonth('transaction_date', now()->month)
            ->sum('amount');

        $balance = $totalIncome - $totalExpense;
        $totalBalance = $user->accounts()->sum('balance');

        $recentTransactions = $user->transactions()
            ->with('category')
            ->latest()
            ->limit(5)
            ->get();

        $budgetStatus = $user->budgets()
            ->where('is_active', true)
            ->select('name', 'amount', 'spent')
            ->get()
            ->map(function ($budget) {
                $budget->percentage = $budget->amount > 0 
                    ? round(($budget->spent / $budget->amount) * 100, 2) 
                    : 0;
                return $budget;
            });

        return response()->json([
            'summary' => [
                'total_income' => $totalIncome,
                'total_expense' => $totalExpense,
                'balance' => $balance,
                'total_account_balance' => $totalBalance
            ],
            'recent_transactions' => $recentTransactions,
            'budget_status' => $budgetStatus
        ]);
    }

    public function expensesByCategory(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date'
        ]);

        $expenses = Auth::user()->transactions()
            ->where('type', 'expense')
            ->whereBetween('transaction_date', [$validated['start_date'], $validated['end_date']])
            ->select('category_id', DB::raw('SUM(amount) as total'))
            ->with('category:id,name,color')
            ->groupBy('category_id')
            ->get();

        return response()->json($expenses);
    }

    public function incomeVsExpenses(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'period' => 'required|in:daily,weekly,monthly,yearly',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date'
        ]);

        $format = $this->getDateFormat($validated['period']);

        $data = Auth::user()->transactions()
            ->whereBetween('transaction_date', [$validated['start_date'], $validated['end_date']])
            ->select(
                DB::raw("DATE_FORMAT(transaction_date, '{$format}') as period"),
                DB::raw("SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as income"),
                DB::raw("SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as expense")
            )
            ->groupBy('period')
            ->orderBy('period')
            ->get();

        return response()->json($data);
    }

    public function export(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'type' => 'required|in:csv,pdf',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'format' => 'sometimes|in:detailed,summary'
        ]);

        $transactions = Auth::user()->transactions()
            ->with(['category', 'account'])
            ->whereBetween('transaction_date', [$validated['start_date'], $validated['end_date']])
            ->orderBy('transaction_date', 'desc')
            ->get();

        if ($validated['type'] === 'csv') {
            return $this->exportCSV($transactions, $validated['format'] ?? 'detailed');
        }

        return response()->json([
            'message' => 'Exportação de PDF não implementada',
            'transactions' => $transactions
        ]);
    }

    private function getDateFormat(string $period): string
    {
        return match ($period) {
            'daily' => '%Y-%m-%d',
            'weekly' => '%Y-%u',
            'monthly' => '%Y-%m',
            'yearly' => '%Y',
            default => '%Y-%m'
        };
    }

    private function exportCSV($transactions, string $format): JsonResponse
    {
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="relatorio-transacoes.csv"'
        ];

        $callback = function () use ($transactions, $format) {
            $file = fopen('php://output', 'w');
            
            if ($format === 'detailed') {
                fputcsv($file, ['Data', 'Descrição', 'Categoria', 'Conta', 'Tipo', 'Valor']);
                
                foreach ($transactions as $transaction) {
                    fputcsv($file, [
                        $transaction->transaction_date->format('d/m/Y'),
                        $transaction->description,
                        $transaction->category?->name ?? 'Sem categoria',
                        $transaction->account?->name ?? 'Sem conta',
                        $transaction->type === 'income' ? 'Receita' : 'Despesa',
                        number_format($transaction->amount, 2, ',', '.')
                    ]);
                }
            } else {
                fputcsv($file, ['Tipo', 'Total']);
                
                $summary = $transactions->groupBy('type')->map(function ($group) {
                    return $group->sum('amount');
                });
                
                foreach ($summary as $type => $total) {
                    fputcsv($file, [
                        $type === 'income' ? 'Receita' : 'Despesa',
                        number_format($total, 2, ',', '.')
                    ]);
                }
            }
            
            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}