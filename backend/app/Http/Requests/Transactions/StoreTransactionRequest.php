<?php

namespace App\Http\Requests\Transactions;

use Illuminate\Foundation\Http\FormRequest;

class StoreTransactionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'description' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0.01',
            'type' => 'required|in:income,expense',
            'category_id' => 'nullable|exists:categories,id',
            'account_id' => 'nullable|exists:accounts,id',
            'transaction_date' => 'required|date',
            'notes' => 'nullable|string|max:1000'
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
            'exists' => 'O campo :attribute é inválido.',
        ];
    }

    public function attributes(): array
    {
        return [
            'description' => 'descrição',
            'amount' => 'valor',
            'type' => 'tipo',
            'category_id' => 'categoria',
            'account_id' => 'conta',
            'transaction_date' => 'data da transação',
            'notes' => 'notas',
        ];
    }
}
