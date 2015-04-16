// JavaScript Document
goog.provide('com.cdm.search.ToTop');

goog.require( 'goog.dom' );

goog.require('com.cdm.search.ScrollTo');

/**
 * @constructor
 */
com.cdm.search.ToTop = function()
{
	var totoplinkname = 'totop', 
	
	totopel, 
	
	scrollManager;
	
	totopel = goog.dom.getElement( totoplinkname );
	
	if(totopel)
	{
		goog.events.listen( totopel, goog.events.EventType.CLICK, function(e)
		{
			e.preventDefault();
			this.scrollManager.scrollTo( 0 );
			//console.log( totopel  );
			return false;
		}, false, this );
	}
	
	
}

/**
 * @type {com.cdm.landing.ScrollTo}
 */
com.cdm.landing.ToTop.prototype.scrollManager = new com.cdm.landing.ScrollTo;