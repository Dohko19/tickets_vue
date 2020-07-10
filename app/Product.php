<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
class Product extends Model
{
    protected $fillable = [ 'name', 'description', 'long_description', 'price', 'category_id' ];

    protected $appends = ['product_created', 'featured_image_url'];

    public function getProductCreatedAttribute()
    {
        return Carbon::parse($this->created_at)->format('d-m-Y');
    }

    public function category()
	{
		return $this->belongsTo(Category::class);
    }

    public function images()
	{
		return $this->hasMany(ProductImage::class);
	}

	public function getFeaturedImageUrlAttribute()
	{
		$featuredImage = $this->images()->where('featured', true)->first();
		if(!$featuredImage)
		{
			$featuredImage = $this->images()->first();
		}
		if($featuredImage)
		{
			return $featuredImage->url;
		}
		return '/images/default.gif';
	}

	public function getCategoryNameAttribute()
	{
		if($this->category)
		{
			return $this->category->name;
		}

		return 'General';
    }

    protected static function boot(){
        parent::boot();
        static::deleting(function($product){
            $product->images->each->delete();
        });
    }

}
