<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Criar usuário de teste
        $user = User::create([
            'name' => 'Usuário Teste',
            'email' => 'teste@example.com',
            'password' => Hash::make('password123'),
        ]);

        // Criar categorias padrão
        $categories = [
            ['name' => 'Salário', 'description' => 'Renda principal', 'color' => '#10B981', 'type' => 'income'],
            ['name' => 'Freelance', 'description' => 'Trabalhos freelancer', 'color' => '#3B82F6', 'type' => 'income'],
            ['name' => 'Alimentação', 'description' => 'Supermercado, restaurantes', 'color' => '#EF4444', 'type' => 'expense'],
            ['name' => 'Transporte', 'description' => 'Gasolina, transporte público', 'color' => '#F59E0B', 'type' => 'expense'],
            ['name' => 'Moradia', 'description' => 'Aluguel, condomínio, contas', 'color' => '#8B5CF6', 'type' => 'expense'],
            ['name' => 'Lazer', 'description' => 'Cinema, viagens, hobbies', 'color' => '#EC4899', 'type' => 'expense'],
            ['name' => 'Saúde', 'description' => 'Consultas, medicamentos', 'color' => '#06B6D4', 'type' => 'expense'],
            ['name' => 'Educação', 'description' => 'Cursos, livros, material', 'color' => '#84CC16', 'type' => 'expense'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }

        // Criar conta bancária de teste
        $user->accounts()->create([
            'name' => 'Conta Corrente Principal',
            'type' => 'checking',
            'institution' => 'Banco Teste',
            'balance' => 5000.00,
            'account_number' => '12345-6',
            'is_active' => true,
        ]);

        // Criar preferências do usuário
        $user->preference()->create([
            'currency' => 'BRL',
            'timezone' => 'America/Sao_Paulo',
            'language' => 'pt',
            'date_format' => 'd/m/Y',
            'week_starts_on' => 'sunday',
            'theme' => 'light',
            'notifications_enabled' => true,
            'email_notifications' => true,
            'push_notifications' => true,
        ]);
    }
}
