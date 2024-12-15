<?php

namespace App\Http\Controllers;

use App\Models\SupplierModel;
use App\Models\TransaksiBarangModel;
use App\Models\UserModel;
use Illuminate\Http\Request;

class TransaksiBarangController extends Controller
{
    public function index()
    {
        // Fetch the transaction data with relationships
        $transaksiBarang = TransaksiBarangModel::with(['user', 'supplier'])->get();

        return response()->json($transaksiBarang);
    }
    // Menampilkan form edit
    // Menampilkan form edit transaksi

    // Mengupdate transaksi berdasarkan ID
    public function update(Request $request, $id)
    {
        $request->validate([
            'id_user' => 'required|integer',
            'id_supplier' => 'required|integer',
            'tanggal_transaksi' => 'required|date',
        ]);

        $transaksi = TransaksiBarangModel::find($id);

        if (!$transaksi) {
            return response()->json(['message' => 'Data not found'], 404);
        }

        $transaksi->update($request->all());

        return response()->json(['message' => 'Data updated successfully'], 200);
    }
    // Store data transaksi barang
    public function store(Request $request)
    {
        // Validasi data yang masuk
        $request->validate([
            'user_id' => 'required|exists:users,id', // Pastikan user_id ada di tabel users (kolom id)
            'supplier_id' => 'required|exists:suppliers,id_supplier', // Pastikan supplier_id ada di tabel suppliers (kolom id_supplier)
            'tanggal_transaksi' => 'required|date', // Validasi format tanggal
        ]);

        // Simpan data transaksi
        try {
            $transaksi = TransaksiBarangModel::create([
                'id_user' => $request->input('user_id'), // Sesuaikan nama field yang ada
                'id_supplier' => $request->input('supplier_id'), // Sesuaikan nama field yang ada
                'tanggal_transaksi' => $request->input('tanggal_transaksi'),
            ]);

            return response()->json([
                'message' => 'Transaksi berhasil disimpan.',
                'data' => $transaksi,
            ], 201);
        } catch (\Exception $e) {
            // Log error untuk memudahkan debugging
            return response()->json([
                'message' => 'Terjadi kesalahan saat menyimpan data.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    public function show($id)
    {
        $transaksi = TransaksiBarangModel::with('user', 'supplier')->find($id);

        if (!$transaksi) {
            return response()->json(['message' => 'Data not found'], 404);
        }

        return response()->json($transaksi);
    }
    // Method untuk menghapus transaksi barang berdasarkan ID
    public function destroy($id)
    {
        try {
            // Cari transaksi berdasarkan ID
            $transaksi = TransaksiBarangModel::findOrFail($id);

            // Hapus data transaksi barang
            $transaksi->delete();

            // Mengembalikan response sukses jika berhasil dihapus
            return response()->json([
                'message' => 'Transaksi barang berhasil dihapus.'
            ], 200);
        } catch (\Exception $e) {
            // Mengembalikan response error jika terjadi masalah
            return response()->json([
                'error' => 'Terjadi kesalahan saat menghapus transaksi barang.',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
