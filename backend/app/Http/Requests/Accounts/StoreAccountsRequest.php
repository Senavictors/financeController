<?php

namespace App\Http\Requests\Accounts;

use Illuminate\Foundation\Http\FormRequest;

class StoreAccountsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'balance' => 'required|numeric|min:0',
            'type' => 'required|string|in:bank,credit_card,debit_card,savings,checking',
        ];
    }

    public function messages(): array
    {
        return [
            'required' => 'O campo :attribute é obrigatório.',
            'numeric' => 'O campo :attribute deve ser numérico.',
            'min' => 'O campo :attribute deve ser maior ou igual a :min.',
            'max' => 'O campo :attribute deve ser menor ou igual a :max.',
            'in' => 'O campo :attribute deve ser um dos seguintes valores: :values.',
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => 'nome',
            'balance' => 'saldo',
            'type' => 'tipo',
        ];
    }
}

