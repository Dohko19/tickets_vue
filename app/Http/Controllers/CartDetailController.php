<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\CartDetail;

class CartDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $encuentra = CartDetail::select('product_id')->where('product_id', $request->product_id)
            ->where('cart_id', '=', auth()->user()->cart->id)->first();

        if ($encuentra)
        {
            if ($encuentra->product_id == $request->product_id)
            {
                return response(['fail' => 'Este producto ya existe en tu Carrito de compras'], 400);

            }
            else
            {
                $cartDetail = new CartDetail();
                $cartDetail->cart_id = auth()->user()->cart->id;
                $cartDetail->product_id = $request->product_id;
                $cartDetail->quantity = $request->quantity;
                $cartDetail->comment = $request->comment;
                $cartDetail->save();
                // $notification = 'El Producto se a cargado a tu carrito de compras exitosamente';
                // return back()->with(compact('notification'));
                return response(['success' => 'El Producto se a cargado a tu carrito de compras exitosamente'], 202);

            }
        }
        else
        {
            $cartDetail = new CartDetail();
            $cartDetail->cart_id = auth()->user()->cart->id;
            $cartDetail->product_id = $request->product_id;
            $cartDetail->quantity = $request->quantity;
            $cartDetail->comment = $request->comment;
            $cartDetail->save();
            // $notification = 'El Producto se a cargado a tu carrito de compras exitosamente';
            // return back()->with(compact('notification'));
            return response(['success' => 'El Producto se a cargado a tu carrito de compras exitosamente'], 202);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
