<?php

namespace App\Http\Controllers;

use App\Models\SupplierModel;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    // Menampilkan semua data supplier
    public function index()
    {
        $suppliers = SupplierModel::all();
        return response()->json($suppliers); // Mengembalikan data dalam format JSON
    }

    // Menyimpan data supplier baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_supplier' => 'required|string|max:255',
            'email' => 'required|email|unique:suppliers,email',
            'no_telp' => 'required|string|max:15',
            'alamat' => 'required|string',
        ]);

        $supplier = SupplierModel::create($validated);
        return response()->json($supplier, 201); // Mengembalikan data supplier yang baru dibuat
    }

    // Menampilkan data supplier berdasarkan ID
    public function show($id)
    {
        $supplier = SupplierModel::find($id);
        if ($supplier) {
            return response()->json($supplier);
        }
        return response()->json(['message' => 'Supplier not found'], 404);
    }

    // Mengupdate data supplier
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nama_supplier' => 'required|string|max:255',
            'email' => 'required|email',
            'no_telp' => 'required|string|max:15',
            'alamat' => 'required|string',
        ]);

        $supplier = SupplierModel::find($id);

        if ($supplier) {
            $supplier->update($validated);
            return response()->json($supplier); // Mengembalikan data supplier yang telah diperbarui
        }

        return response()->json(['message' => 'Supplier not found'], 404);
    }

    // Menghapus data supplier
    public function destroy($id)
    {
        $supplier = SupplierModel::find($id);

        if ($supplier) {
            $supplier->delete();
            return response()->json(['message' => 'Supplier deleted successfully']);
        }

        return response()->json(['message' => 'Supplier not found'], 404);
    }
}
