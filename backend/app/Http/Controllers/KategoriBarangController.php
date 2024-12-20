<?php

namespace App\Http\Controllers;

use App\Models\KategoriBarangModel;
use Illuminate\Http\Request;

class KategoriBarangController extends Controller
{
    // Menampilkan semua kategori
    public function index()
    {
        $kategori = KategoriBarangModel::all();
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
    public function show($id_kategori)
    {
        // Mencari kategori berdasarkan ID
        $kategori = KategoriBarangModel::find($id_kategori);

        // Memeriksa apakah kategori ditemukan
        if ($kategori) {
            // Mengembalikan data kategori dalam format JSON
            return response()->json($kategori);
        } else {
            // Jika kategori tidak ditemukan, mengembalikan response error
            return response()->json(['message' => 'Kategori tidak ditemukan'], 404);
        }
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
