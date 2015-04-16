/**
 * The Search site's functionality is driven by Angular;
 * anything it can handle will be removed from the Closure Library.
 * E.g. xhr requests and dom manipulation
 * In future projects modules will be re-integrated here.
 * For now closure will feature only on the sticky navigation, toTop trigger and final compilation
 * for generating the minified core files.
 * @author Ben (@iz_ben)
 * http://coterie.co.ke/
 * Namespace com.cdm.search.MODULE
*/

goog.provide('com.cdm.search.Core');
goog.provide('search.init');

goog.require('goog.net.ScriptManager');

goog.require('com.cdm.search.StickyNavbar');
goog.require('com.cdm.search.ToTop');

/**
 * @constructor
 */
com.cdm.search.Core = function()
{
	new com.cdm.PushMenu;	
	
	this.asyncInit();
	
	var scriptloader = new goog.net.ScriptManager;
	
	scriptloader.loadScripts( cdm['s']['g'] );
	
	new com.cdm.search.StickyNavbar;
	
	new com.cdm.search.ToTop;
}

com.cdm.search.Core.prototype.asyncInit = function()
{
	goog.global['fbAsyncInit'] = function()
	{
		FB.init(goog.global['cdm']['cf']['facebook']);
    };
}

search.init = function()
{
	new com.cdm.search.Core;
}

goog.exportSymbol( 'search.init', search.init );

search.init();