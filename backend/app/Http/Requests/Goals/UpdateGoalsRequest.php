<?php

namespace App\Http\Requests\Goals;

use Illuminate\Foundation\Http\FormRequest;

class UpdateGoalsRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'target_amount' => 'required|numeric|min:0',
            'current_amount' => 'required|numeric|min:0',
            'due_date' => 'required|date|after_or_equal:today',
        ];
    }

    public function messages(): array
    {
        return [
            'required' => 'O campo :attribute é obrigatório.',
            'numeric' => 'O campo :attribute deve ser numérico.',
            'min' => 'O campo :attribute deve ser maior ou igual a :min.',
            'max' => 'O campo :attribute deve ser menor ou igual a :max.',
            'after_or_equal' => 'O campo :attribute deve ser uma data igual ou posterior a hoje.',
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => 'nome',
            'target_amount' => 'meta',
            'current_amount' => 'atual',
            'due_date' => 'data de vencimento',
        ];
    }
}