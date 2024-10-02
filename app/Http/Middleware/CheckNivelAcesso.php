<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckNivelAcesso
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, $nivelAcesso)
    {
        if (Auth::check()) {
            // Verifica o nível de acesso
            if (Auth::user()->nivel_acesso == $nivelAcesso) {
                return $next($request);
            }
        }

        // Se o usuário não tiver o nível de acesso apropriado, redireciona ou retorna erro
        return redirect('/')->with('error', 'Você não tem permissão para acessar esta página.');
    }
}
