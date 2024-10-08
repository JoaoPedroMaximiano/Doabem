<?php
use Illuminate\Support\Facades\Route;

Route::get('/', [App\Http\Controllers\ListagemController::class, 'index']);

Route::get('/login', [App\Http\Controllers\UsuarioController::class, 'loginPage'])->name('login')->middleware('guest');
Route::post('/login', [App\Http\Controllers\UsuarioController::class, 'autenticacao'])->name('autenticacao')->middleware('guest');
Route::get('/logout', [App\Http\Controllers\UsuarioController::class, 'logout'])->name('logout')->middleware('auth');

Route::get('/doador/cadastrar', [App\Http\Controllers\DoadorController::class, 'create'])->name('cadastrar.doador')->middleware('guest');
Route::post('/doador/cadastrar/salvar', [App\Http\Controllers\DoadorController::class, 'store'])->name('salvar.doador')->middleware('guest');

Route::get('/entidade-beneficente/cadastrar', [App\Http\Controllers\EntidadeBeneficenteController::class, 'create'])->name('cadastrar.entidadeBeneficinte')->middleware('guest');
Route::post('/entidade-beneficente/cadastrar/salvar', [App\Http\Controllers\EntidadeBeneficenteController::class, 'store'])->name('salvar.entidadeBeneficinte')->middleware('guest');

Route::get('/gerenciar-conta', [App\Http\Controllers\GerenciarContaController::class, 'index'])->name('gerenciar.conta')->middleware('auth');
Route::put('/gerenciar-conta/alterar', [App\Http\Controllers\GerenciarContaController::class, 'update'])->name('gerenciar.conta.alterar')->middleware('auth');

Route::get('/necessidade/cadastrar', [App\Http\Controllers\NecessidadeController::class, 'create'])->name('cadastrar.necessidade')->middleware('checkNivelAcesso:entidade');
Route::post('/necessidade/cadastrar/salvar', [App\Http\Controllers\NecessidadeController::class, 'store'])->name('cadastrar.necessidade')->middleware('checkNivelAcesso:entidade');
Route::get('necessidades/{id}',  [App\Http\Controllers\NecessidadeController::class, 'paginaDetalhe'])->name('detalhe.necessidade');

require __DIR__.'/auth.php';
