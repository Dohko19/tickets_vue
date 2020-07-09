<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
class Product extends Model
{
    protected $fillable = [ 'name', 'description', 'long_description', 'price', 'category_id' ];

    protected $appends = ['product_created'];

    public function getProductCreatedAttribute()
    {
        return Carbon::parse($this->created_at)->format('d-m-Y');
    }

    public function category()
	{
		return $this->belongsTo(Category::class);
    }
}
