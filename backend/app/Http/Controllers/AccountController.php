<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class AccountController extends Controller
{
    public function index(): JsonResponse
    {
        $accounts = Auth::user()->accounts()->with('transactions')->get();
        return response()->json($accounts);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:checking,savings,credit_card,investment,other',
            'institution' => 'nullable|string|max:255',
            'balance' => 'nullable|numeric|min:0',
            'account_number' => 'nullable|string|max:100',
            'is_active' => 'boolean'
        ]);

        $account = Auth::user()->accounts()->create($validated);

        return response()->json($account, 201);
    }

    public function show(Account $account): JsonResponse
    {
        $this->authorize('view', $account);
        
        return response()->json($account->load('transactions'));
    }

    public function update(Request $request, Account $account): JsonResponse
    {
        $this->authorize('update', $account);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'type' => 'sometimes|in:checking,savings,credit_card,investment,other',
            'institution' => 'nullable|string|max:255',
            'balance' => 'sometimes|numeric',
            'account_number' => 'nullable|string|max:100',
            'is_active' => 'boolean'
        ]);

        $account->update($validated);

        return response()->json($account);
    }

    public function destroy(Account $account): JsonResponse
    {
        $this->authorize('delete', $account);
        
        $account->delete();

        return response()->json(null, 204);
    }

    public function balance(): JsonResponse
    {
        $totalBalance = Auth::user()->accounts()->sum('balance');
        $accounts = Auth::user()->accounts()->select('id', 'name', 'balance', 'type')->get();

        return response()->json([
            'total_balance' => $totalBalance,
            'accounts' => $accounts
        ]);
    }
}