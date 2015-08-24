var app = app || {};

/*
 * Collection of food items to be displayed by the Nutritionix API.
 * This collection presents a view for each API item returned in the
 * search, and is cleared with every new search.
 */
var ResultItems = Backbone.Firebase.Collection.extend({
	model : app.FoodItem,

	//localStorage: new Backbone.LocalStorage('results-backbone')
	url : 'https://fooditemapidata.firebaseio.com/'
});

app.ResultItems = new ResultItems();