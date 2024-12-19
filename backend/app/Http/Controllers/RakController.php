<?php

namespace App\Http\Controllers;

use App\Models\RakModel;
use Illuminate\Http\Request;

class RakController extends Controller
{
    public function index()
    {
        $raks = RakModel::all();
        return response()->json($raks, 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kode_rak' => 'required|string|max:255',
            'nama_rak' => 'required|string|max:255',
            'lokasi_rak' => 'required|string|max:255',
        ]);

        return RakModel::create($validated);
    }

    public function show($id_rak)
    {
        $rak = RakModel::where('id_rak', $id_rak)->firstOrFail();
        return response()->json($rak);
    }


    public function update(Request $request, $id_rak)
    {
        $rak = RakModel::where('id_rak', $id_rak)->firstOrFail();

        $validated = $request->validate([
            'kode_rak' => 'required|string|max:255',
            'nama_rak' => 'required|string|max:255',
            'lokasi_rak' => 'required|string',
        ]);

        $rak->update($validated);

        return response()->json($rak);
    }

    public function destroy($id_rak)
    {
        try {
            $rak = RakModel::findOrFail($id_rak); // Menemukan rak berdasarkan ID
            $rak->delete(); // Menghapus rak

            return response()->json(['message' => 'Rak deleted successfully'], 200); // Mengembalikan respons sukses
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete rak', 'message' => $e->getMessage()], 500); // Menangani kesalahan dengan respons 500
        }
    }
}
