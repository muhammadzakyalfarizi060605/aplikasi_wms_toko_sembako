<?php

namespace App\Listeners;

use App\Events\StokBarangUpdated;
use App\Models\Barang;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class UpdateStokBarang
{
    public function __construct()
    {
        // Listener tidak perlu antrean, karena proses ini cepat
    }

    public function handle(StokBarangUpdated $event)
    {
        // Update stok barang sesuai dengan perubahan yang diterima
        $barang = $event->barang;
        $jumlah = $event->jumlah;

        // Perbarui stok barang
        $barang->jumlah_stok += $jumlah;
        $barang->save();
    }
}
