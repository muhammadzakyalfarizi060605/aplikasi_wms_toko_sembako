<?php

namespace App\Providers;

use App\Events\StokBarangUpdated;
use App\Listeners\UpdateStokBarang;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        StokBarangUpdated::class => [
            UpdateStokBarang::class,
        ],
    ];

    public function boot()
    {
        parent::boot();
    }
}
