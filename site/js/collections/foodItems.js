var app = app || {};

/*
 * Collection of food items to be displayed when the user selects an item
 * from the Nutritionix data. Stored locally in the browser.
 */
var FoodItems = Backbone.Firebase.Collection.extend({
	model : app.FoodItem,

	//localStorage: new Backbone.LocalStorage('food-backbone')
	url : 'https://fooditemuserdata.firebaseio.com/'
});

app.FoodItems = new FoodItems();