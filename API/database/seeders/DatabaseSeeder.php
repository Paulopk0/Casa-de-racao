<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\comida;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        comida::create([
            'id' => '4',
            'marca' => 'wiskas',
            'preco' => 20.35,
            'validade' => '14/03/2029',
            'tipo' => 'gato',
            'sabor' => 'salmao',
            'dt_entrada' => '14/12/2028',
        ]);
        comida::create([
            'id' => '2',
            'marca' => 'teste2',
            'preco' => 20.35,
            'validade' => '14/03/2029',
            'tipo' => 'gato',
            'sabor' => 'salmao',
            'dt_entrada' => '14/12/2028',
        ]);
        comida::create([
            'id' => '3',
            'marca' => 'teste3',
            'preco' => 20.35,
            'validade' => '14/03/2029',
            'tipo' => 'gato',
            'sabor' => 'salmao',
            'dt_entrada' => '14/12/2028',
        ]);
    }
}
