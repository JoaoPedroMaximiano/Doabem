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
            if (Auth::user()->nivel_acesso == $nivelAcesso) {
                return $next($request);
            } if (($nivelAcesso == 'guestEntidade') && (is_null(Auth::user()) or Auth::user()->nivel_acesso == 'entidade')) {
                return $next($request);
            }
        }

        return redirect('/')->with('error', 'Você não tem permissão para acessar esta página.');
    }
}
