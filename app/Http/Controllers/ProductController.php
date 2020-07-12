<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with(['category','images'])->get();

        if( request()->wantsJson() )
        {
            return $products;
        }
    }

    public function store(Request $request)
    {
        Product::create($request->all());
        return response(['status' => 'Ok'], 202);
    }

    public function show(Product $product)
    {
        $product->load('category', 'images');
        if (request()->wantsJson()) {
            return $product;
        }
    }

    public function update(Request $request, Product $product)
    {

        $product->update($request->all());

        return response(['status' => 'success'], 202);
    }

    public function destroy(Product $product)
    {
        $product->delete();
    }
}
