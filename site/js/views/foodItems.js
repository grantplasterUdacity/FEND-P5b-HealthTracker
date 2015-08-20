var app = app || {};

/*
 * Food Item view presented to user for their selected items in list form.
 * This utilizes the item template of a name and calorie number.
 */
app.FoodItemsView = Backbone.View.extend({
	tagName : 'li',

	template : _.template( $('#item-template').html() ),

	// If a user clicks on the button next to each item, the item
	// will call the clear function.
	events : {
		'click .destroy' : 'clear',
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

	// Destroy the model. This will also remove the view because of
	// the listeners set up in the initialize function.
	clear : function() {
		this.model.destroy();
	}
});