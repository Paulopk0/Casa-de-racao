<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

use App\Http\Controllers\ComidaController;
Route::apiResource('comida', ComidaController::class);
Route::put('/comida/update/{id}', [ComidaController::class, 'update']);
