<?php

use App\Http\Controllers\ProfileController;
use App\Models\Usuario;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [App\Http\Controllers\ListagemController::class, 'index']);

//rotas de teste dos modal
Route::get('/entidadeBeneficiente', [App\Http\Controllers\EntidadeBeneficenteController::class, 'index']);

Route::get('/login', [App\Http\Controllers\UsuarioController::class, 'loginPage'])->name('login');
Route::get('/cadastrar', [App\Http\Controllers\UsuarioController::class, 'cadastrar'])->name('cadastrar');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
