<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comida extends Model
{
    use HasFactory;
    protected $fillable = ['marca','preco','validade','tipo', 'sabor','dt_entrada'];
}
