<?php

namespace App\Http\Controllers;

use App\Tickets;
use Illuminate\Http\Request;

class TicketsController extends Controller
{
    public function registrar(Request $request)
    {
        if (request()->wantsJson()) {
            return $request->all();
            // $tickets = new Tickets;
            // $tickets->user_id = auth()->user()->id;
            // $tickets->motivo = $request->motivo;
            // $tickets->comentario = $request->comentario;
            // $tickets->otroMotivo = $request->otroMotivo;
            // $tickets->status = $request->status;
            // $tickets->foto1 = 'dod';
            // $tickets->save();
        }
        return redirect('/');
    }
}
