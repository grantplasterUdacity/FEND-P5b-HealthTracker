var app = app || {};

/*
 * Collection of food items to be displayed when the user selects an item
 * from the Nutritionix data. Stored locally in the browser.
 */
var FoodItems = Backbone.Collection.extend({
	model : app.FoodItem,

	localStorage: new Backbone.LocalStorage('food-backbone')
});

app.FoodItems = new FoodItems();