// JavaScript Document
goog.provide('com.cdm.search.StickyNavbar');

goog.require('goog.ui.ScrollFloater');

goog.require('goog.style');

/**
 * @constructor
 */
com.cdm.search.StickyNavbar = function()
{
	var headerElem = goog.dom.getElement( this.navName );
	
	this.masthead = goog.dom.getElement( this.navName );
	
	this.logoHolder = goog.dom.getElement( 'lh' );
	
	this.logo = goog.dom.getElement( 'nav-logo' );
	
	this.compensatorElem = goog.dom.getElement( this.compName );
	
	//console.log(headerElem);
	
	this.sf = new goog.ui.ScrollFloater();
	
	this.sf.decorate( headerElem );	
	
	this.getHeaderDimension();
	
	var vp  = new goog.dom.ViewportSizeMonitor;
	
	goog.events.listen( vp, goog.events.EventType.RESIZE, this.getHeaderDimension, true, this);
	
	goog.events.listen( vp, goog.events.EventType.RESIZE, this.update, true, this);	
	
	goog.events.listen( this.sf, goog.ui.ScrollFloater.EventType.FLOAT, this.shrinkMasthead, true, this);
	
	goog.events.listen( this.sf, goog.ui.ScrollFloater.EventType.DOCK, this.restoreMasthead, true, this);
	
	if( this.sf.isFloating() )
	{
		this.shrinkMasthead();
	}else
	{
		this.restoreMasthead();
	}
	
	this.sf.setScrollingEnabled(true);
}

com.cdm.search.StickyNavbar.prototype.navName = 'masthead';

com.cdm.search.StickyNavbar.prototype.compName = 'masthead-mask';

com.cdm.search.StickyNavbar.prototype.stickyClassName = 'docked';

com.cdm.search.StickyNavbar.prototype.logoHolderHeight = 0;

com.cdm.search.StickyNavbar.prototype.animationDuration = .1;

/**
 * @type {Element}
 */
com.cdm.search.StickyNavbar.prototype.masthead;

/**
 * @type {Element}
 */
com.cdm.search.StickyNavbar.prototype.logoHolder;

/**
 * @type {Element}
 */
com.cdm.search.StickyNavbar.prototype.logo;

/**
 * @type {goog.ui.ScrollFloater}
 */
com.cdm.search.StickyNavbar.prototype.sf;

/**
 * @type {Element}
 */
com.cdm.search.StickyNavbar.prototype.compensatorElem;

com.cdm.search.StickyNavbar.prototype.getHeaderDimension = function()
{
	if( this.sf.isFloating() )
		return;
		
	var size = goog.style.getSize( this.logoHolder );
	
	if(size.height > 0)
	{
		this.logoHolderHeight = size.height;
	}
}

com.cdm.search.StickyNavbar.prototype.shrinkMasthead = function()
{
	TweenMax['to']( this.logoHolder, this.animationDuration, {'height':0});
	TweenMax['to']( this.compensatorElem, this.animationDuration, {'height':0});
	TweenMax['to']( this.logo, this.animationDuration, {'width':160});
}

com.cdm.search.StickyNavbar.prototype.restoreMasthead = function()
{
	TweenMax['to']( this.compensatorElem, this.animationDuration, {'height':this.logoHolderHeight});
	TweenMax['to']( this.logoHolder, this.animationDuration, {'height':this.logoHolderHeight});
	TweenMax['to']( this.logo, this.animationDuration, {'width':0});
}

com.cdm.search.StickyNavbar.prototype.update = function()
{
	this.sf.update();
}