<?php

namespace App\Http\Controllers;

use App\Models\BarangModel;
use Exception;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BarangController extends Controller
{
    // Fungsi untuk menampilkan daftar barang
    public function index()
    {
        return BarangModel::with('kategori')->get();
    }

    // Fungsi untuk menyimpan barang baru
    public function store(Request $request)
    {
        // Validasi input
        $validated = $request->validate([
            'id_kategori' => 'required|exists:kategori_barang,id_kategori',
            'nama_barang' => 'required|string|max:255',
            'gambar_barang' => 'nullable|image|mimes:jpg,png,jpeg,gif',
            'jumlah_stok' => 'required|integer',
            'satuan' => 'required|string|max:50',
            'harga_jual_persatuan' => 'required|numeric',
        ]);

        // Cek jika ada file gambar
        if ($request->hasFile('gambar_barang')) {
            // Ambil file gambar
            $gambar = $request->file('gambar_barang');

            // Simpan gambar baru di folder 'uploads' public storage
            $path = $gambar->store('uploads', 'public');

            // Simpan path gambar di dalam data yang akan disimpan di database
            $validated['gambar_barang'] = $path;
        }

        // Buat record baru di database menggunakan data yang sudah tervalidasi
        BarangModel::create($validated);

        // Response sukses
        return response()->json(['message' => 'Barang berhasil ditambahkan'], 201);
    }

    // Fungsi untuk menampilkan barang berdasarkan ID
    public function show($id)
    {
        $barang = BarangModel::with('kategori')->find($id);
        if (!$barang) {
            return response()->json(['error' => 'Barang tidak ditemukan'], 404);
        }
        return response()->json($barang);
    }



    // Fungsi untuk memperbarui data barang
    // Method untuk update data barang
    public function update(Request $request, $id_barang)

    // Log semua input untuk debugging

    {
        try {
            // Validasi input
            $validated = $request->validate([
                'id_kategori' => 'required|exists:kategori_barang,id_kategori',
                'nama_barang' => 'required|string|max:255',
                'jumlah_stok' => 'required|integer',
                'satuan' => 'required|string|max:255',
                'harga_jual_persatuan' => 'required|numeric',
                'gambar_barang' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);



            // Cari data barang berdasarkan ID
            $barang = BarangModel::findOrFail($id_barang);

            // Proses upload gambar jika ada file baru
            if ($request->hasFile('gambar_barang')) {
                // Hapus gambar lama jika ada
                if ($barang->gambar_barang && Storage::exists($barang->gambar_barang)) {
                    Storage::delete($barang->gambar_barang);
                }
                // Simpan gambar baru
                $validated['gambar_barang'] = $request->file('gambar_barang')->store('uploads', 'public');
            } else {
                // Tetap gunakan gambar lama
                $validated['gambar_barang'] = $barang->gambar_barang;
            }

            // Update properti dan simpan ke database
            $barang->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Barang berhasil diperbarui.',
                'data' => $barang,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan: ' . $e->getMessage(),
            ], 500);
        }
    }





    // Fungsi untuk menghapus barang
    public function destroy($id_barang)
    {
        try {
            $barang = BarangModel::findOrFail($id_barang);

            // Menghapus gambar jika ada
            if ($barang->gambar_barang) {
                $gambarPath = public_path('storage/uploads/' . $barang->gambar_barang);
                if (file_exists($gambarPath)) {
                    unlink($gambarPath);
                }
            }

            $barang->delete();
            return response()->json(['message' => 'Barang berhasil dihapus'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Terjadi kesalahan saat menghapus barang', 'error' => $e->getMessage()], 500);
        }
    }
}
