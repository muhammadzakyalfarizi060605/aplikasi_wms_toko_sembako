<?php

namespace App\Http\Controllers;

use App\Models\KategoriBarangModel;
use Illuminate\Http\Request;

class KategoriBarangController extends Controller
{
    // Menampilkan semua kategori
    public function index()
    {
        $kategori = KategoriBarangModel::all(['id_kategori', 'nama_kategori']);
        return response()->json($kategori);
    }

    // Menyimpan kategori baru
    public function store(Request $request)
    {
        $request->validate([
            'nama_kategori' => 'required|string|max:255',
            'deskripsi' => 'required|string',
        ]);

        $kategori = KategoriBarangModel::create($request->all());

        return response()->json($kategori, 201);
    }

    // Menampilkan kategori berdasarkan ID
    public function show($id)
    {
        return response()->json(KategoriBarangModel::find($id));
    }

    // Mengupdate kategori
    public function update(Request $request, $id)
    {
        $kategori = KategoriBarangModel::findOrFail($id);
        $kategori->update($request->all());

        return response()->json($kategori);
    }

    // Menghapus kategori
    public function destroy($id)
    {
        $kategori = KategoriBarangModel::findOrFail($id);
        $kategori->delete();

        return response()->json(null, 204);
    }
}
