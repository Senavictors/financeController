<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class BudgetController extends Controller
{
    public function index(): JsonResponse
    {
        $budgets = Auth::user()->budgets()
            ->with(['category', 'transactions' => function($query) {
                $query->whereBetween('transaction_date', [
                    DB::raw('budgets.start_date'),
                    DB::raw('budgets.end_date')
                ]);
            }])
            ->get();

        return response()->json($budgets);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'category_id' => 'nullable|exists:categories,id',
            'name' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'period' => 'required|in:weekly,monthly,quarterly,yearly',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'is_active' => 'boolean'
        ]);

        $budget = Auth::user()->budgets()->create($validated);

        return response()->json($budget->load('category'), 201);
    }

    public function show(Budget $budget): JsonResponse
    {
        $this->authorize('view', $budget);
        
        $budget->load(['category', 'transactions' => function($query) use ($budget) {
            $query->whereBetween('transaction_date', [$budget->start_date, $budget->end_date]);
        }]);

        return response()->json($budget);
    }

    public function update(Request $request, Budget $budget): JsonResponse
    {
        $this->authorize('update', $budget);

        $validated = $request->validate([
            'category_id' => 'nullable|exists:categories,id',
            'name' => 'sometimes|string|max:255',
            'amount' => 'sometimes|numeric|min:0',
            'period' => 'sometimes|in:weekly,monthly,quarterly,yearly',
            'start_date' => 'sometimes|date',
            'end_date' => 'sometimes|date|after:start_date',
            'is_active' => 'boolean'
        ]);

        $budget->update($validated);

        return response()->json($budget->load('category'));
    }

    public function destroy(Budget $budget): JsonResponse
    {
        $this->authorize('delete', $budget);
        
        $budget->delete();

        return response()->json(null, 204);
    }

    public function summary(): JsonResponse
    {
        $summary = Auth::user()->budgets()
            ->select('period', DB::raw('SUM(amount) as total_budget'), DB::raw('SUM(spent) as total_spent'))
            ->groupBy('period')
            ->get();

        return response()->json($summary);
    }
}