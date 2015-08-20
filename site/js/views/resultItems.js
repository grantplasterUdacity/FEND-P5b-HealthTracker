var app = app || {};

/*
 * Food Item view presented to user for Nutritionix data items in list form.
 * This utilizes the item template of a name and calorie number and is displayed
 * for each item returned from the Nutritionix API.
 */
app.ResultItemsView = Backbone.View.extend({
	tagName : 'li',

	template : _.template( $('#result-template').html() ),

	// If a user clicks on the button next to each item, the item
	// will call the addToFoods function.
	events : {
		'click .add' : 'addToFoods',
	},

	// Render the view every time a model is changed, and remove
	// the view if the model is destroyed.
	initialize : function() {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
	},

	// Attach a template to the DOM with attributes filled into the template.
	render : function() {
		this.$el.html(this.template(this.model.attributes));
		return this;
	},

	// Create a new model with the properties of this model. The count
	// attribute is changed to make a 'unique' model and thus allow
	// duplicate models in regards to name and calorie attributes.
	// The new model is saved to the collection and database.
	addToFoods : function() {
		var newFood = new app.FoodItem({
			name : this.model.get('name'),
			calories : this.model.get('calories'),
			count : app.FoodItems.length
		});
		app.FoodItems.create(newFood);
	}
});