<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;
use App\ProductImage;

class ImageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index($id)
    {
        $product = Product::find($id);
        $images = $product->images()->orderBy('featured','DESC')->get();

        if ( request()->wantsJson() )
        {
            return [
                'product' => $product,
                'images' => $images
            ];
        }
        // return view('admin.products.images.index')->with(compact('product', 'images'));
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
     * @param \Illuminate\Http\Request $request
     * @param $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request, $id)
    {
//        dd($request->all());
        $this->validate($request, [
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        $image = $request->file('photo');
        // $fileName = uniqid() . $image->getClientOriginalName();
//        $file = $request->file('photo');
//        $path = public_path() . '/images/products';
//        $fileName = uniqid() . $file->getClientOriginalName();


//        $thumbnail = public_path('storage/images/products/'.$fileName);
//        $img = Image::make($thumbnail)->resize(250, 250)->save($thumbnail);
//        Image::make($image)
//        ->resize(250, 250);
//        $moved = $file->move($path, $fileName);
//        if ($moved)
//        {
        $productImage = new ProductImage;
        $productImage->image = $image->store('public/images/products');
        // $productImage->featured = false;
        $productImage->product_id = $id;
        $productImage->save();
//        }
        return response(['status'=>'success'], 202);
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
    public function destroy(Request $request, $id)
    {
        $productImage = ProductImage::find($id);
        if(substr($productImage->image, 0, 4) === "http")
        {
            $deleted = true;
        }
        else
        {
            $deleted = \Storage::delete($productImage->image);
            $productImage->delete();
        }

        if (request()->wantsJson())
        {
            return response(['status'=>'success'], 202);
        }
        return back();
    }

    public function select($id, $image)
    {
        ProductImage::where('product_id', $id)->update([
            'featured' => false,
        ]);
        $productImage = ProductImage::find($image);
        $productImage->featured = true;
        $productImage->save();
        // return back();
    }
}
