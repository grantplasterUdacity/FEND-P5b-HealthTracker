var app = app || {};

/*
 * Model for the food items. Name and calories are displayed to the
 * user. Count changes when an item is added so that duplicate models
 * can be added to a collection, with the count property differing.
 */
app.FoodItem = Backbone.Model.extend({
	defaults : {
		name : '',
		count : 1,
		calories : 0
	}
});