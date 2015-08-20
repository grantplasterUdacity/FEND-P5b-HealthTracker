var app = app || {};

/*
 * Collection of food items to be displayed by the Nutritionix API.
 * This collection presents a view for each API item returned in the 
 * search, and is cleared with every new search.
 */
var ResultItems = Backbone.Collection.extend({
	model : app.FoodItem,

	localStorage: new Backbone.LocalStorage('results-backbone')
});

app.ResultItems = new ResultItems();