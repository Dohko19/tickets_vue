<?php


Auth::routes();

Route::get('/', 'HomeController@index')->name('home');

Route::post('tickets/registrar', 'TicketsController@registrar');

Route::post('people/save', 'PersonController@store');

Route::get('people/list', 'PersonController@list');

Route::get('/category/list', 'CategoryController@index');
Route::post('/category/save', 'CategoryController@store');
Route::put('category/update/{category}', 'CategoryController@update');
Route::get('/category/show/{category}', 'CategoryController@show');
Route::delete('category/{category}', 'CategoryController@destroy');

Route::get('products', 'ProductController@index')->name('products.index');
Route::post('products', 'ProductController@store');
Route::get('products/{product}', 'ProductController@show');
Route::put('product/update/{product}', 'ProductController@update');
Route::delete('product/{product}', 'ProductController@destroy');
Route::get('/{any?}', 'HomeController@index')->name('home')->where('any', '.*');
