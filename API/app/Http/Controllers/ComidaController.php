<?php

namespace App\Http\Controllers;

use App\Models\Comida;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ComidaController extends Controller
{

    public function index()
    {

    return response()->json(Comida::all(), 200);


    }


    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        $comida = Comida::create($request->all());
        return response()->json(Comida::all(), 200);
    }

    public function show($id)
{
    $comida = Comida::find($id);

    if (!$comida) {
        return response()->json(['error' => 'Comida não encontrada'], 404);
    }

    return response()->json($comida);
}

    public function edit(Comida $comida)
    {
        //
    }

    public function update(Request $request, $id)
{

    $comida = Comida::findOrFail($id);
    $comida->update($request->all());

    return response()->json($comida, 200);
}


public function destroy(Comida $comida)
    {
        $comida->delete();
        return $comida;
    }
}
