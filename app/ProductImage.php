<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;


class ProductImage extends Model
{
    protected $appends = ['url', 'diff_minutes'];

	public function product()
	{
		return $this->belongsTo(Product::class);
	}
	function getUrlAttribute()
	{
		if(substr($this->image, 0, 4) === "http")
		{
			return $this->image;
		}
		return \Storage::url($this->image);
    }

    public function getDiffMinutesAttribute()
    {
        $now = Carbon::now();
        return Carbon::parse($this->updated_at)->diffInMinutes($now);
    }

    protected static function boot(){
		parent::boot();
		static::deleting(function($productImage){
			$productImage = str_replace('storage/' , '' , $productImage->image );
        	\Storage::delete($productImage);
		});
	}
}
