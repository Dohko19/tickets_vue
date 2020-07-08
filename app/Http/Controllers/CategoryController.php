<?php

namespace App\Http\Controllers;

use App\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $category = Category::all();
        if (request()->wantsJson()) {
            return $category;
        }
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

    public function store(Request $request)
    {
        $category = (new Category)->fill($request->all());
        $category->image = $request->image->store('public/categories');
        $category->save();

        return response(['status' => 'success'], 202);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        $category->load('products');

        if (request()->wantsJson()) {
            return $category;
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category)
    {
        dd($request->all());
        $category->update($request->only('name', 'description'));
        if ($request->image) {

            $previusPath = $category->image;
            $category->image = $request->image->store('public/categories');
            // $productImage->featured = false;
            $saved = $category->save();
            if ($saved) {
                \Storage::delete($previusPath);
                //                    File::delete($previousPath);
            }
        }
        return response(['status' => 'success'], 202);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        \Storage::delete($category->image);
        $category->delete();

        return response(['status' => 'success'], 202);
    }
}
