<?php

namespace App\Http\Controllers;

use App\Models\BarangModel;
use App\Models\DetailTransaksiPenjualanModel;
use App\Models\TransaksiPenjualanModel;
use Illuminate\Http\Request;

class DetailTransaksiPenjualanController extends Controller
{
    // Menampilkan semua data detail transaksi penjualan
    public function index()
    {
        // Mengambil data detail transaksi penjualan dengan nama_pembeli dan nama_barang
        $data = DetailTransaksiPenjualanModel::with(['penjualan', 'barang']) // eager load penjualan dan barang
            ->get()
            ->map(function ($item) {
                // Menambahkan nama_pembeli dan nama_barang dalam response
                return [
                    'id_detail_penjualan' => $item->id_detail_penjualan,
                    'id_penjualan' => $item->id_penjualan,
                    'nama_pembeli' => $item->penjualan->nama_pembeli, // Ambil nama_pembeli dari relasi penjualan
                    'id_barang' => $item->id_barang,
                    'nama_barang' => $item->barang->nama_barang, // Ambil nama_barang dari relasi barang
                    'harga_jual_persatuan' => $item->harga_jual_persatuan,
                    'jumlah_barang' => $item->jumlah_barang,
                    'subtotal' => $item->subtotal,
                ];
            });

        return response()->json($data);
    }
    public function update(Request $request, $id)
    {
        // Validasi input data
        $validatedData = $request->validate([
            'id_penjualan' => 'required|exists:transaksi_penjualan,id_penjualan', // Memastikan id_penjualan valid
            'id_barang' => 'required|exists:barang,id_barang', // Memastikan id_barang valid
            'harga_jual_persatuan' => 'required|numeric',
            'jumlah_barang' => 'required|numeric|min:1',
            'subtotal' => 'required|numeric',
        ]);

        // Ambil data barang dan detail transaksi penjualan yang akan diperbarui
        $barang = BarangModel::find($validatedData['id_barang']);
        $detailTransaksi = DetailTransaksiPenjualanModel::find($id);

        if (!$barang || !$detailTransaksi) {
            return response()->json([
                'message' => 'Data tidak ditemukan.',
            ], 404);
        }

        // Simpan jumlah stok yang lama sebelum diubah
        $previousJumlahBarang = $detailTransaksi->jumlah_barang;

        // Update jumlah barang pada detail transaksi
        $detailTransaksi->jumlah_barang = $validatedData['jumlah_barang'];

        // Update subtotal berdasarkan jumlah barang dan harga jual per satuan
        $detailTransaksi->subtotal = $validatedData['harga_jual_persatuan'] * $validatedData['jumlah_barang'];

        // Perbarui stok barang
        if ($validatedData['jumlah_barang'] > $previousJumlahBarang) {
            // Jika jumlah barang bertambah, cek stok barang
            $stokYangDikurangi = $validatedData['jumlah_barang'] - $previousJumlahBarang;
            if ($barang->jumlah_stok < $stokYangDikurangi) {
                return response()->json([
                    'message' => 'Stok barang tidak mencukupi.',
                ], 400);
            }
            // Kurangi stok barang
            $barang->jumlah_stok -= $stokYangDikurangi;
        } elseif ($validatedData['jumlah_barang'] < $previousJumlahBarang) {
            // Jika jumlah barang berkurang, kembalikan stok barang
            $stokYangDitambah = $previousJumlahBarang - $validatedData['jumlah_barang'];
            $barang->jumlah_stok += $stokYangDitambah;
        }

        $barang->save();

        // Simpan perubahan pada detail transaksi
        $detailTransaksi->save();

        // Update total harga di transaksi penjualan
        $transaksiPenjualan = TransaksiPenjualanModel::find($validatedData['id_penjualan']);
        if ($transaksiPenjualan) {
            // Hitung ulang total harga
            $totalHargaBaru = $transaksiPenjualan->detailTransaksi()->sum('subtotal');
            $transaksiPenjualan->total_harga = $totalHargaBaru;
            $transaksiPenjualan->save(); // Simpan perubahan pada total_harga
        }

        // Kembalikan respon berhasil
        return response()->json([
            'message' => 'Data berhasil diperbarui.',
            'data' => $detailTransaksi,
        ], 200);
    }


    // Method untuk menampilkan detail data berdasarkan ID
    public function show($id)
    {
        // Ambil data dengan relasi barang dan transaksi_penjualan (termasuk pembeli)
        $detailTransaksi = DetailTransaksiPenjualanModel::with(['barang', 'penjualan'])->find($id);

        if (!$detailTransaksi) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        // Format respon dengan data terkait
        return response()->json([
            'nama_pembeli' => $detailTransaksi->penjualan->nama_pembeli ?? null, // Nama pembeli
            'nama_barang' => $detailTransaksi->barang->nama_barang ?? null, // Nama barang
            'harga_jual_persatuan' => $detailTransaksi->harga_jual_persatuan,
            'jumlah_barang' => $detailTransaksi->jumlah_barang,
            'subtotal' => $detailTransaksi->subtotal,
        ]);
    }


    public function destroy($id)
    {
        // Cari detail transaksi yang akan dihapus
        $detailTransaksi = DetailTransaksiPenjualanModel::findOrFail($id);

        // Ambil data barang yang terkait dengan transaksi ini
        $barang = $detailTransaksi->barang;

        // Menghitung total harga yang dibayar untuk barang tersebut
        $totalHarga = $detailTransaksi->jumlah_barang * $detailTransaksi->harga_jual_persatuan;

        // Mengupdate total harga transaksi berdasarkan id_penjualan
        $transaksiPenjualan = TransaksiPenjualanModel::find($detailTransaksi->id_penjualan);

        if ($transaksiPenjualan) {
            // Kurangi total harga transaksi dengan total harga yang dihapus
            $newTotalHarga = $transaksiPenjualan->total_harga - $totalHarga;

            // Periksa apakah total harga tetap valid (tidak negatif)
            if ($newTotalHarga >= 0) {
                // Update total harga transaksi
                $transaksiPenjualan->update(['total_harga' => $newTotalHarga]);
            } else {
                // Jika total harga menjadi negatif, beri pesan atau tangani sesuai kebutuhan
                return response()->json(['message' => 'Total harga tidak valid.'], 400);
            }
        }

        // Kembalikan jumlah barang yang dibeli ke stok
        $barang->jumlah_stok += $detailTransaksi->jumlah_barang;
        $barang->save();

        // Hapus detail transaksi
        $detailTransaksi->delete();

        return response()->json(['message' => 'Transaksi dan stok berhasil diperbarui, total harga dikembalikan']);
    }
    public function store(Request $request)
    {
        // Validasi input data
        $validatedData = $request->validate([
            'id_penjualan' => 'required|exists:transaksi_penjualan,id_penjualan', // Memastikan id_penjualan valid
            'id_barang' => 'required|exists:barang,id_barang', // Memastikan id_barang valid
            'harga_jual_persatuan' => 'required|numeric',
            'jumlah_barang' => 'required|numeric|min:1',
            'subtotal' => 'required|numeric',
        ]);

        // Ambil data barang berdasarkan id_barang
        $barang = BarangModel::find($validatedData['id_barang']);
        if (!$barang) {
            return response()->json(['message' => 'Barang tidak ditemukan'], 404);
        }

        // Cek stok barang
        if ($barang->jumlah_stok < $validatedData['jumlah_barang']) {
            return response()->json(['message' => 'Stok barang tidak mencukupi'], 400);
        }

        // Kurangi stok barang
        $barang->jumlah_stok -= $validatedData['jumlah_barang'];
        $barang->save();

        // Simpan data detail transaksi penjualan
        $detailTransaksi = new DetailTransaksiPenjualanModel();
        $detailTransaksi->id_penjualan = $validatedData['id_penjualan'];
        $detailTransaksi->id_barang = $validatedData['id_barang'];
        $detailTransaksi->harga_jual_persatuan = $validatedData['harga_jual_persatuan'];
        $detailTransaksi->jumlah_barang = $validatedData['jumlah_barang'];
        $detailTransaksi->subtotal = $validatedData['subtotal'];
        $detailTransaksi->save();

        // Update total harga pada transaksi penjualan
        $transaksiPenjualan = TransaksiPenjualanModel::find($validatedData['id_penjualan']);
        if ($transaksiPenjualan) {
            // Hitung ulang total harga
            $totalHargaBaru = $transaksiPenjualan->detailTransaksi()->sum('subtotal');
            $transaksiPenjualan->total_harga = $totalHargaBaru;
            $transaksiPenjualan->save(); // Simpan perubahan pada total_harga
        }

        // Kembalikan respon berhasil
        return response()->json([
            'message' => 'Detail transaksi berhasil ditambahkan.',
            'data' => $detailTransaksi,
        ], 201);
    }
}
