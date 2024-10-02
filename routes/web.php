<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [App\Http\Controllers\ListagemController::class, 'index']);

//rotas de teste dos modal
Route::get('/entidadeBeneficiente', [App\Http\Controllers\EntidadeBeneficenteController::class, 'index']);

Route::get('/login', [App\Http\Controllers\UsuarioController::class, 'loginPage'])->name('login')->middleware('guest');
Route::post('/login', [App\Http\Controllers\UsuarioController::class, 'autenticacao'])->name('autenticacao')->middleware('guest');
Route::get('/logout', [App\Http\Controllers\UsuarioController::class, 'logout'])->name('logout');

Route::get('/cadastrar-doador', [App\Http\Controllers\DoadorController::class, 'create'])->name('cadastrar.doador')->middleware('guest');
Route::post('/cadastrar-doador', [App\Http\Controllers\DoadorController::class, 'store'])->name('cadastrar.doador')->middleware('guest');

Route::get('/entidade-beneficente/cadastrar', [App\Http\Controllers\EntidadeBeneficenteController::class, 'create'])->name('cadastrar.entidadeBeneficinte')->middleware('guest');
Route::post('/entidade-beneficente/salvar', [App\Http\Controllers\EntidadeBeneficenteController::class, 'store'])->name('salvar.entidadeBeneficinte')->middleware('guest');

Route::get('/necessidade/cadastrar', [App\Http\Controllers\NecessidadeController::class, 'create'])->name('cadastrar.necessidade');
Route::post('/necessidade/cadastrar/salvar', [App\Http\Controllers\NecessidadeController::class, 'store'])->name('cadastrar.necessidade');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
