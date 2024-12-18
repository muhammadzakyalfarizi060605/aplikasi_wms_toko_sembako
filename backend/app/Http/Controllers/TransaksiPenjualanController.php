<?php

namespace App\Http\Controllers;

use App\Models\TransaksiPenjualanModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class TransaksiPenjualanController extends Controller
{
    // Mengambil data transaksi penjualan dengan relasi user
    public function index()
    {
        // Mengambil data transaksi penjualan dengan relasi ke user
        $transaksi = TransaksiPenjualanModel::with('user:id,nama_lengkap')->get();


        return response()->json($transaksi);
    }
    public function store(Request $request)
    {
        // Validate input data from the form
        $validator = Validator::make($request->all(), [
            'nama_pembeli' => 'required|string|max:255',
            'total_harga' => 'required|numeric',
            'diskon' => 'required|numeric|min:0|max:100',
            'harga_setelah_diskon' => 'required|numeric',
            'kasir_id' => 'required|exists:users,id', // Ensure kasir_id exists in the users table
        ]);

        // If validation fails
        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ], 400);
        }

        // Get the current date and time (you can customize this if needed)
        $tanggalPenjualan = now(); // Laravel's `now()` function to get the current timestamp

        // Save the sale transaction data
        $transaksi = TransaksiPenjualanModel::create([
            'nama_pembeli' => $request->nama_pembeli,
            'total_harga' => $request->total_harga,
            'diskon' => $request->diskon,
            'harga_setelah_diskon' => $request->harga_setelah_diskon,
            'id_user' => $request->kasir_id, // Save the kasir_id
            'tanggal_penjualan' => $tanggalPenjualan, // Add the current date as tanggal_penjualan
        ]);

        // Return success response
        return response()->json([
            'message' => 'Transaction data successfully added!',
            'data' => $transaksi
        ], 201);
    }
    // Function to get a specific transaction by its id
    public function show($id)
    {
        // Ambil transaksi penjualan dengan relasi kasir (user)
        $transaksi = TransaksiPenjualanModel::with('user:id,nama_lengkap')
            ->findOrFail($id);

        // Ubah nama properti id_user menjadi kasir_id
        $transaksi->kasir_id = $transaksi->id_user; // Menambahkan kasir_id

        // Hapus id_user jika tidak diperlukan lagi
        unset($transaksi->id_user);

        return response()->json($transaksi);
    }
    public function update(Request $request, $id)
    {
        // Validasi input data dari form
        $validator = Validator::make($request->all(), [
            'nama_pembeli' => 'required|string|max:255',
            'total_harga' => 'required|numeric',
            'diskon' => 'required|numeric|min:0|max:100',
            'harga_setelah_diskon' => 'required|numeric',
            'kasir_id' => 'required|exists:users,id', // Pastikan kasir_id ada di tabel users
        ]);

        // Jika validasi gagal
        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ], 400);
        }

        // Cari transaksi penjualan berdasarkan id
        $transaksi = TransaksiPenjualanModel::findOrFail($id);

        // Perbarui data transaksi penjualan
        $transaksi->update([
            'nama_pembeli' => $request->nama_pembeli,
            'total_harga' => $request->total_harga,
            'diskon' => $request->diskon,
            'harga_setelah_diskon' => $request->harga_setelah_diskon,
            'id_user' => $request->kasir_id, // Perbarui kasir_id (id_user di database)
        ]);

        // Kembalikan respons sukses
        return response()->json([
            'message' => 'Transaction data successfully updated!',
            'data' => $transaksi
        ], 200);
    }
    // Fungsi destroy untuk menghapus transaksi berdasarkan ID
    public function destroy($id)
    {
        try {
            // Cari data transaksi berdasarkan ID
            $transaksi = TransaksiPenjualanModel::findOrFail($id);

            // Hapus transaksi yang ditemukan
            $transaksi->delete();

            // Kembalikan response sukses
            return response()->json([
                'message' => 'Transaksi berhasil dihapus',
            ], 200);
        } catch (\Exception $e) {
            // Jika ada error, tangani dan kembalikan error message
            return response()->json([
                'message' => 'Terjadi kesalahan saat menghapus transaksi',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
