<?php


Auth::routes();

Route::get('/', 'HomeController@index')->name('home');
Route::get('/home', 'HomeController@index')->name('home');

Route::post('tickets/registrar', 'TicketsController@registrar');

Route::post('people/save', 'PersonController@store');

Route::get('people/list', 'PersonController@list');

Route::post('/cart', 'CartDetailController@store');
Route::put('cart/{cart}', 'CartDetailController@update')->name('cart.update');
Route::delete('/cart/{id}', 'CartDetailController@destroy');
Route::put('/cart', 'CartDetailController@destroy');

Route::get('category/list', 'CategoryController@index');
Route::post('category/save', 'CategoryController@store');
Route::put('category/update/{category}', 'CategoryController@update');
Route::get('category/show/{category}', 'CategoryController@show');
Route::delete('category/{category}', 'CategoryController@destroy');

Route::get('/products', 'ProductController@index')->name('products.index');
Route::post('products', 'ProductController@store');
Route::get('products/{product}', 'ProductController@show');
Route::put('product/update/{product}', 'ProductController@update');
Route::delete('product/{product}', 'ProductController@destroy');

Route::get('/products/{id}/images', 'ImageController@index');
Route::post('/products/{id}/images', 'ImageController@store');
Route::delete('/products/{id}/images', 'ImageController@destroy');
Route::get('/products/{id}/images/select/{image}', 'ImageController@select'); //destacar imagen



Route::get('/{any?}', 'HomeController@index')->name('home')->where('any', '.*');
