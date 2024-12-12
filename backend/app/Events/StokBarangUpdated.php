<?php

namespace App\Events;

use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use App\Models\Barang;
use App\Models\BarangModel;

class StokBarangUpdated
{
    use Dispatchable, SerializesModels;

    public $barang;
    public $jumlah;

    public function __construct(BarangModel $barang, int $jumlah)
    {
        $this->barang = $barang;
        $this->jumlah = $jumlah;
    }
}
