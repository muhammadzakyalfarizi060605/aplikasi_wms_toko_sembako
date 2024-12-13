<?php

namespace App\Http\Controllers;

use App\Models\BarangModel;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use Illuminate\Support\Facades\Validator as FacadesValidator;

class BarangController extends Controller
{
    // Get all barang data
    public function index()
    {
        // Ambil data barang beserta relasi kategori
        $barang = BarangModel::with('kategori')->get();

        // Kembalikan data dalam format JSON
        return response()->json($barang);
    }

    public function store(Request $request)
    {
        // Validasi data input
        $validator = Validator::make($request->all(), [
            'id_kategori' => 'required|exists:kategori_barang,id_kategori',
            'nama_barang' => 'required|string|max:255',
            'gambar_barang' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'jumlah_stok' => 'required|integer|min:0',
            'satuan' => 'required|string|max:100',
            'harga_jual_persatuan' => 'required|numeric|min:0',
        ]);

        // Cek apakah validasi gagal
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Upload file gambar
        $file = $request->file('gambar_barang');
        $fileName = time() . '_' . $file->getClientOriginalName();
        $filePath = "images/" . $fileName;

        // Simpan file ke folder storage/app/public/images
        Storage::disk('public')->put($filePath, file_get_contents($file));

        // Simpan data ke database
        $barang = new BarangModel();
        $barang->id_kategori = $request->id_kategori;
        $barang->nama_barang = $request->nama_barang;
        $barang->alamat_gambar = $filePath; // Hanya menyimpan path gambar
        $barang->jumlah_stok = $request->jumlah_stok;
        $barang->satuan = $request->satuan;
        $barang->harga_jual_persatuan = $request->harga_jual_persatuan;
        $barang->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Barang berhasil ditambahkan',
            'data' => $barang,
        ], 201);
    }


    // Update an existing barang
    public function update(Request $request, $id_barang)
    {
        // Validasi data input
        $validator = Validator::make($request->all(), [
            'id_kategori' => 'required|exists:kategori_barang,id_kategori',
            'nama_barang' => 'required|string|max:255',
            'jumlah_stok' => 'required|integer|min:0',
            'satuan' => 'required|string|max:100',
            'harga_jual_persatuan' => 'required|numeric|min:0',
        ]);

        // Cek apakah validasi gagal
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Cari data barang berdasarkan id
        $barang = BarangModel::find($id_barang);
        if (!$barang) {
            return response()->json([
                'status' => 'error',
                'message' => 'Barang tidak ditemukan',
            ], 404);
        }

        // Perbarui data barang tanpa mengubah gambar
        $barang->id_kategori = $request->id_kategori;
        $barang->nama_barang = $request->nama_barang;
        $barang->jumlah_stok = $request->jumlah_stok;
        $barang->satuan = $request->satuan;
        $barang->harga_jual_persatuan = $request->harga_jual_persatuan;
        $barang->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Barang berhasil diperbarui tanpa mengubah gambar',
            'data' => $barang,
        ], 200);
    }







    // Delete a barang
    public function destroy($id)
    {
        // Find the barang by ID
        $barang = BarangModel::find($id);

        // Check if barang exists
        if (!$barang) {
            return response()->json([
                'status' => 'error',
                'message' => 'Data barang tidak ditemukan.'
            ], 404);
        }

        // Delete the file from storage if it exists
        if ($barang->alamat_gambar && Storage::exists('public/' . $barang->alamat_gambar)) {
            Storage::delete('public/' . $barang->alamat_gambar);
        }

        // Delete the barang from the database
        $barang->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Data barang berhasil dihapus.'
        ], 200);
    }
    public function show($id_barang)
    {
        $barang = BarangModel::with('kategori')->find($id_barang);

        if (!$barang) {
            return response()->json(['message' => 'Barang not found'], 404);
        }

        return response()->json($barang);
    }
}
