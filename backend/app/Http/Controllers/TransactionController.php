<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        // Exemplo com dados mockados; depois você pode substituir por dados de DB.
        return response()->json([
            ['id' => 1, 'title' => 'Salário', 'amount' => 5000, 'type' => 'INCOME'],
            ['id' => 2, 'title' => 'Aluguel', 'amount' => -1800, 'type' => 'EXPENSE'],
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string'],
            'amount' => ['required', 'numeric'],
            'type' => ['required', 'in:INCOME,EXPENSE'],
        ]);

        // Aqui você salvaria no banco; por enquanto, apenas ecoa o payload
        return response()->json([
            'message' => 'Transaction created',
            'transaction' => $data,
        ], 201);
    }
}