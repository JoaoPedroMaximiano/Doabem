<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [App\Http\Controllers\ListagemController::class, 'index']);
Route::get('/teste', [App\Http\Controllers\TesteController::class, 'index']);

//rotas de teste dos modal
Route::get('/uf', [App\Http\Controllers\UfController::class, 'index']);
Route::get('/cidade', [App\Http\Controllers\CidadeController::class, 'index']);
Route::get('/local', [App\Http\Controllers\LocalController::class, 'index']);
Route::get('/usuario', [App\Http\Controllers\UsuarioController::class, 'index']);
Route::get('/doador', [App\Http\Controllers\DoadorController::class, 'index']);
Route::get('/entidadeBeneficiente', [App\Http\Controllers\EntidadeBeneficenteController::class, 'index']);
Route::get('/eventoBeneficente', [App\Http\Controllers\EventoBeneficenteController::class, 'index']);
Route::get('/localDoacao', [App\Http\Controllers\LocalDoacaoController::class, 'index']);
Route::get('/Necessidade', [App\Http\Controllers\NecessidadeController::class, 'index']);
Route::get('/destinoDoacao', [App\Http\Controllers\DestinoDoacaoController::class, 'index']);

Route::get('/destinoFinal', [App\Http\Controllers\DestinoFinalController::class, 'index']);
Route::get('/doacao', [App\Http\Controllers\DoacaoController::class, 'index']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
