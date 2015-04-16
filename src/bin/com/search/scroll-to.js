// JavaScript Document

goog.provide('com.cdm.search.ScrollTo');


/**
 * @constructor
 */
com.cdm.search.ScrollTo = function()
{
	
}

/**
 * @param {number} y
 * @param {number=} opt_x
 */
com.cdm.search.ScrollTo.prototype.scrollTo = function( y, opt_x )
{
	var x = opt_x || null,
	
	data = {};
	
	data['y'] = y;
	
	if(x)
	{
		data['x'] = x;
	}
	
	try
	{
		//console.log(data);
		TweenMax['to'](window, 2, {'scrollTo':data,'ease':Power2.easeOut});
	}catch(err)
	{
		console.log(err.message)
	}
}