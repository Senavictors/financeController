<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Http\Requests\Transactions\StoreTransactionRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Auth::user()->transactions()->with(['category', 'account']);

        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->has('account_id')) {
            $query->where('account_id', $request->account_id);
        }

        if ($request->has('start_date')) {
            $query->where('transaction_date', '>=', $request->start_date);
        }

        if ($request->has('end_date')) {
            $query->where('transaction_date', '<=', $request->end_date);
        }

        $transactions = $query->orderBy('transaction_date', 'desc')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()->json($transactions);
    }

    public function store(StoreTransactionRequest $request): JsonResponse
    {
        $transaction = Auth::user()->transactions()->create($request->validated());
        
        return response()->json($transaction->load(['category', 'account']), 201);
    }

    public function show(Transaction $transaction): JsonResponse
    {
        $this->authorize('view', $transaction);
        
        return response()->json($transaction->load(['category', 'account', 'user']));
    }

    public function update(StoreTransactionRequest $request, Transaction $transaction): JsonResponse
    {
        $this->authorize('update', $transaction);

        $transaction->update($request->validated());

        return response()->json($transaction->load(['category', 'account']));
    }

    public function destroy(Transaction $transaction): JsonResponse
    {
        $this->authorize('delete', $transaction);
        
        $transaction->delete();

        return response()->json(null, 204);
    }

    public function list(Request $request): JsonResponse
    {
        return $this->index($request);
    }

    public function summary(Request $request): JsonResponse
    {
        $query = Auth::user()->transactions();

        if ($request->has('start_date')) {
            $query->where('transaction_date', '>=', $request->start_date);
        }

        if ($request->has('end_date')) {
            $query->where('transaction_date', '<=', $request->end_date);
        }

        $summary = $query->selectRaw('
            SUM(CASE WHEN type = "income" THEN amount ELSE 0 END) as total_income,
            SUM(CASE WHEN type = "expense" THEN amount ELSE 0 END) as total_expense,
            COUNT(CASE WHEN type = "income" THEN 1 END) as income_count,
            COUNT(CASE WHEN type = "expense" THEN 1 END) as expense_count
        ')->first();

        $summary->balance = $summary->total_income - $summary->total_expense;

        return response()->json($summary);
    }
}