<?php

namespace App\Http\Controllers;

use App\Models\BarangModel;
use App\Models\DetailTransaksiModel;
use Illuminate\Http\Request;

class DetailTransaksiBarangController extends Controller
{
    public function index()
    {
        $details = DetailTransaksiModel::with([
            'transaksi_barang:id_transaksi,tanggal_transaksi',
            'barang:id_barang,nama_barang,satuan',
            'rak:id_rak,nama_rak',
            'rakTujuan:id_rak,nama_rak as nama_rak_tujuan',
        ])->get();

        $mappedDetails = $details->map(function ($detail) {
            return [
                'id_detail' => $detail->id_detail,
                'tanggal_transaksi' => $detail->transaksi_barang->tanggal_transaksi ?? null,
                'nama_barang' => $detail->barang->nama_barang ?? null,
                'nama_rak' => $detail->rak->nama_rak ?? null,
                'nama_rak_tujuan' => $detail->rakTujuan->nama_rak_tujuan ?? null,
                'jumlah_barang' => $detail->jumlah_barang,
                'satuan' => $detail->barang->satuan ?? null,
                'harga_beli_satuan' => $detail->harga_beli_satuan,
                'tanggal_kadaluwarsa' => $detail->tanggal_kadaluwarsa,
                'status' => $detail->status,
            ];
        });

        return response()->json($mappedDetails, 200);
    }

    public function show($id_detail)
    {
        // Retrieve the data to be edited
        $detail = DetailTransaksiModel::with([
            'transaksi_barang:id_transaksi,tanggal_transaksi',
            'barang:id_barang,nama_barang,satuan',
            'rak:id_rak,nama_rak',
            'rakTujuan:id_rak,nama_rak as nama_rak_tujuan',
        ])->find($id_detail);

        if (!$detail) {
            return response()->json(['message' => 'Detail transaksi barang tidak ditemukan.'], 404);
        }

        // Prepare the data to return
        return response()->json([
            'detail' => [
                'id_detail' => $detail->id_detail,
                'tanggal_transaksi' => $detail->transaksi_barang->tanggal_transaksi ?? null,
                'nama_barang' => $detail->barang->nama_barang ?? null,
                'id_rak' => $detail->rak->id_rak,
                'nama_rak' => $detail->rak->nama_rak ?? null,
                'jumlah_barang' => $detail->jumlah_barang,
                'satuan' => $detail->barang->satuan ?? null,
                'harga_beli_satuan' => $detail->harga_beli_satuan,
                'tanggal_kadaluwarsa' => $detail->tanggal_kadaluwarsa,
                'status' => $detail->status,
                'id_rak_tujuan' => $detail->rakTujuan->id_rak ?? null,
            ]
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'id_transaksi' => 'required|exists:transaksi_barang,id_transaksi',
            'id_barang' => 'required|exists:barang,id_barang',
            'id_rak' => 'required|exists:rak,id_rak',
            'jumlah_barang' => 'required|numeric|min:1',
            'satuan' => 'required|string',
            'harga_beli_satuan' => 'required|numeric|min:0',
            'tanggal_kadaluwarsa' => 'required|date',
            'status' => 'required|string|in:disimpan,terjual',
        ]);

        try {
            $detailTransaksiBarang = new DetailTransaksiModel();
            $detailTransaksiBarang->id_transaksi = $request->id_transaksi;
            $detailTransaksiBarang->id_barang = $request->id_barang;
            $detailTransaksiBarang->id_rak = $request->id_rak;
            $detailTransaksiBarang->jumlah_barang = $request->jumlah_barang;
            $detailTransaksiBarang->satuan = $request->satuan;
            $detailTransaksiBarang->harga_beli_satuan = $request->harga_beli_satuan;
            $detailTransaksiBarang->tanggal_kadaluwarsa = $request->tanggal_kadaluwarsa;
            $detailTransaksiBarang->status = $request->status;

            $detailTransaksiBarang->save();

            $barang = BarangModel::find($request->id_barang);
            if ($barang) {
                $barang->jumlah_stok += $request->jumlah_barang;
                $barang->save();
            }

            return response()->json([
                'message' => 'Data berhasil ditambahkan!',
                'data' => $detailTransaksiBarang
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat menambahkan data.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function update(Request $request, $id_detail)
    {
        // Validate the request data
        $request->validate([
            'id_transaksi' => 'required|exists:transaksi_barang,id_transaksi',
            'id_barang' => 'required|exists:barang,id_barang',
            'id_rak' => 'required|exists:rak,id_rak',
            'jumlah_barang' => 'required|numeric|min:1',
            'satuan' => 'required|string',
            'harga_beli_satuan' => 'required|numeric|min:0',
            'tanggal_kadaluwarsa' => 'required|date',
            'status' => 'required|string|in:disimpan,terjual,dipindah',
            'id_rak_tujuan' => 'nullable|exists:rak,id_rak', // Only required if status is 'dipindah'
        ]);

        try {
            // Find the detail to update
            $detail = DetailTransaksiModel::find($id_detail);

            if (!$detail) {
                return response()->json(['message' => 'Detail transaksi barang tidak ditemukan.'], 404);
            }

            // Update the detail
            $detail->id_transaksi = $request->id_transaksi;
            $detail->id_barang = $request->id_barang;
            $detail->id_rak = $request->id_rak; // Keep the rak read-only for editing
            $detail->jumlah_barang = $request->jumlah_barang;
            $detail->satuan = $request->satuan;
            $detail->harga_beli_satuan = $request->harga_beli_satuan;
            $detail->tanggal_kadaluwarsa = $request->tanggal_kadaluwarsa;
            $detail->status = $request->status;
            $detail->id_rak_tujuan = $request->id_rak_tujuan;

            // Save the updated data
            $detail->save();

            return response()->json([
                'message' => 'Data berhasil diperbarui!',
                'data' => $detail
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat memperbarui data.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function destroy($id_detail)
    {
        try {
            // Find the detail transaction by ID
            $detail = DetailTransaksiModel::find($id_detail);

            if (!$detail) {
                return response()->json(['message' => 'Detail transaksi barang tidak ditemukan.'], 404);
            }

            // Optional: Update the stock of the barang (item) related to the deleted transaction.
            $barang = BarangModel::find($detail->id_barang);
            if ($barang) {
                $barang->jumlah_stok -= $detail->jumlah_barang; // Decrease the stock based on the deleted transaction.
                $barang->save();
            }

            // Delete the detail transaksi barang
            $detail->delete();

            return response()->json([
                'message' => 'Data berhasil dihapus!'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat menghapus data.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
