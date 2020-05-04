<?php

namespace App\Http\Controllers;

use App\Tickets;
use Illuminate\Http\Request;

class TicketsController extends Controller
{
    public function registrar(Request $request)
    {
        if (request()->wantsJson())
        {
            $tickets = new Tickets;
            $tickets->user_id = auth()->user()->id;
            $tickets->motivo = $request->motivo;
            $tickets->comentario = $request->comentario;
            $tickets->otroMotivo = $request->otroMotivo;
            $tickets->status = $request->status;
            if ($request->get('foto1'))
            {
                $image = $request->get('foto1');
                $image = file_get_contents($image);
                $base64 =  base64_encode($image);
            }
            $tickets->foto1 = $base64;
            $tickets->save();
        }
        return redirect('/');
    }
}
