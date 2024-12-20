<?php
use Illuminate\Support\Facades\Route;

Route::get('/', [App\Http\Controllers\LandingController::class, 'index'])->name('landing');
Route::get('/listagem', [App\Http\Controllers\ListagemController::class, 'index'])->name('listagem');
Route::get('/relatorio-doacoes', [App\Http\Controllers\RelatorioController::class, 'relatorioDoacaoPage'])->name('relatorio.doacao.entidade')->middleware('checkNivelAcesso:entidade');;

Route::get('/login', [App\Http\Controllers\UsuarioController::class, 'loginPage'])->name('login')->middleware('guest');
Route::post('/login', [App\Http\Controllers\UsuarioController::class, 'autenticacao'])->name('autenticacao')->middleware('guest');
Route::get('/logout', [App\Http\Controllers\UsuarioController::class, 'logout'])->name('logout')->middleware('auth');

Route::get('/doador/cadastrar', [App\Http\Controllers\DoadorController::class, 'create'])->name('cadastrar.doador')->middleware('guest');
Route::post('/doador/cadastrar/salvar', [App\Http\Controllers\DoadorController::class, 'store'])->name('salvar.doador')->middleware('checkNivelAcesso:guestEntidade');

Route::get('/entidade-beneficente/cadastrar', [App\Http\Controllers\EntidadeBeneficenteController::class, 'create'])->name('cadastrar.entidadeBeneficinte')->middleware('guest');
Route::post('/entidade-beneficente/cadastrar/salvar', [App\Http\Controllers\EntidadeBeneficenteController::class, 'store'])->name('salvar.entidadeBeneficinte')->middleware('guest');

Route::get('/gerenciar-conta', [App\Http\Controllers\GerenciarContaController::class, 'index'])->name('gerenciar.conta')->middleware('auth');
Route::put('/gerenciar-conta/alterar', [App\Http\Controllers\GerenciarContaController::class, 'update'])->name('gerenciar.conta.alterar')->middleware('auth');

Route::get('/doacao/cadastrar', [App\Http\Controllers\DoacaoController::class, 'create'])->name('cadastrar.doacao')->middleware('checkNivelAcesso:entidade');
Route::post('/doacao/cadastrar/salvar', [App\Http\Controllers\DoacaoController::class, 'store'])->name('salvar.doacao')->middleware('checkNivelAcesso:entidade');
Route::post('/doacao/cadastrar/verify-donator', [App\Http\Controllers\DoacaoController::class, 'verifyDonator'])->name('verificar.doador')->middleware('checkNivelAcesso:entidade');
Route::post('/doacao/doador/cadastrar/salvar', [App\Http\Controllers\DoacaoController::class, 'storeDoador'])->name('verificar.doador')->middleware('checkNivelAcesso:entidade');
Route::get('/doacao/gerenciar/{id}', [App\Http\Controllers\DoacaoController::class, 'edit'])->name('gerenciar.doacao')->middleware('checkNivelAcesso:entidade');
Route::put('/doacao/gerenciar/alterar', [App\Http\Controllers\DoacaoController::class, 'update'])->name('gerenciar.update')->middleware('checkNivelAcesso:entidade');

Route::get('/necessidade/cadastrar', [App\Http\Controllers\NecessidadeController::class, 'create'])->name('cadastrar.necessidade')->middleware('checkNivelAcesso:entidade');
Route::post('/necessidade/cadastrar/salvar', [App\Http\Controllers\NecessidadeController::class, 'store'])->name('cadastrar.necessidade')->middleware('checkNivelAcesso:entidade');
Route::get('/necessidades/{id}', [App\Http\Controllers\NecessidadeController::class, 'view'])->name('detalhe.necessidade');
Route::get('/necessidades/editar/{id}', [App\Http\Controllers\NecessidadeController::class, 'edit'])->name('editar.necessidade')->middleware('checkNivelAcesso:entidade');
Route::put('/necessidades/editar/salvar', [App\Http\Controllers\NecessidadeController::class, 'update'])->name('editar.necessidade')->middleware('checkNivelAcesso:entidade');

Route::get('/evento/cadastrar', [App\Http\Controllers\EventoController::class, 'create'])->name('cadastrar.evento')->middleware('checkNivelAcesso:entidade');
Route::post('/evento/cadastrar/salvar', [App\Http\Controllers\EventoController::class, 'store'])->name('cadastrar.evento')->middleware('checkNivelAcesso:entidade');
Route::get('/eventos/{id}', [App\Http\Controllers\EventoController::class, 'view'])->name('detalhe.evento');
Route::get('/eventos/editar/{id}', [App\Http\Controllers\EventoController::class, 'edit'])->name('editar.evento')->middleware('checkNivelAcesso:entidade');
Route::put('/eventos/editar/salvar', [App\Http\Controllers\EventoController::class, 'update'])->name('editar.evento')->middleware('checkNivelAcesso:entidade');

Route::get('/local/cadastrar', [App\Http\Controllers\LocalDoacaoController::class, 'create'])->name('cadastrar.localDoacao')->middleware('checkNivelAcesso:entidade');
Route::post('/local/cadastrar/salvar', [App\Http\Controllers\LocalDoacaoController::class, 'store'])->name('cadastrar.localDoacao')->middleware('checkNivelAcesso:entidade');
Route::get('/locais/{id}', [App\Http\Controllers\LocalDoacaoController::class, 'view'])->name('detalhe.localDoacao');
Route::get('/locais/editar/{id}', [App\Http\Controllers\LocalDoacaoController::class, 'edit'])->name('editar.localDoacao')->middleware('checkNivelAcesso:entidade');
Route::put('/locais/editar/salvar', [App\Http\Controllers\LocalDoacaoController::class, 'update'])->name('editar.localDoacao')->middleware('checkNivelAcesso:entidade');

Route::get('/monitorar-doacoes', [App\Http\Controllers\MonitorarDoacoesController::class, 'index'])->name('monitorar-doacoes');
Route::post('/monitorar-doacoes/get-lista-doacoes', [App\Http\Controllers\MonitorarDoacoesController::class, 'getListaDoacoes'])->name('monitorar-doacoes.lista');

Route::post('/destino-final/cadastrar/salvar', [App\Http\Controllers\DoacaoController::class, 'storeFinalDestination'])->name('salvar.destino-final')->middleware('checkNivelAcesso:entidade');

require __DIR__.'/auth.php';
