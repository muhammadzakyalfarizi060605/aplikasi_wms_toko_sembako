<?php

namespace App\Http\Controllers;

use App\Models\SupplierModel;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    public function index()
    {
        return SupplierModel::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_supplier' => 'required|string|max:255',
            'email' => 'required|email|unique:suppliers,email',
            'no_telp' => 'required|string|max:15',
            'alamat' => 'required|string',
        ]);

        return SupplierModel::create($validated);
    }

    public function show($id)
    {
        return SupplierModel::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        // Temukan supplier berdasarkan id_supplier
        $supplier = SupplierModel::findOrFail($id);

        // Validasi data yang diterima dari request
        $validated = $request->validate([
            'nama_supplier' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:suppliers,email,' . $id . ',id_supplier', // Ganti id dengan id_supplier
            'no_telp' => 'sometimes|required|string|max:15',
            'alamat' => 'sometimes|required|string',
        ]);

        // Update supplier hanya jika ada perubahan yang divalidasi
        $supplier->update($validated);

        // Kembalikan data supplier yang telah diperbarui
        return response()->json($supplier);
    }


    public function destroy($id)
    {
        $supplier = SupplierModel::findOrFail($id);
        $supplier->delete();

        return response()->json(['message' => 'Supplier deleted successfully']);
    }
}
