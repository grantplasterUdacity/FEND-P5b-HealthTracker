var app = app || {}

/*
 * View for the application.
 */
app.AppView = Backbone.View.extend({

	el : '#heathTrackerApp',

	statsTemplate : _.template($('#stats-template').html()),

	// Clear the list of foods each time the clear list button is clicked.
	// Also, each time the input changes, a request will be made to the Nutritionix API.
	events : {
		'click #clear-foods' : 'clearFoods',
		'keyup #new-food' : 'makeRequest'
	},

	// Initialize listeners for adding items to each view when models
	// are added to respective collections. Also fetches collections saved
	// in the databases.
	initialize : function() {
		var self = this;

		self.$input = $('#new-food');
		self.$results = $('#top-results');
		self.$footer = $('#footer');
		self.$main = $('#main');

		self.listenTo(app.FoodItems, 'add', self.addOne);
		self.listenTo(app.FoodItems, 'reset', self.addAll);
		self.listenTo(app.FoodItems, 'all', self.render);
		self.listenTo(app.ResultItems, 'add', self.addResult);

		app.FoodItems.fetch();
		app.ResultItems.fetch();
	},

	// Calculates the total calories for user's personal list and
	// displays relevant information when needed.
	render : function() {
		var remaining = app.FoodItems.length;
		var totalCalories = 0;
		app.FoodItems.forEach(function (item) {
			totalCalories += item.get('calories');
		});

		if (app.FoodItems.length) {
			this.$footer.show();

			this.$footer.html(this.statsTemplate({
				remaining : remaining,
				totalCalories : totalCalories
			}));
		}
		else {
			this.$footer.hide();
		}
	},

	// Receives an item and creates a new view to be added to the DOM under
	// the FoodItems section.
	addOne : function( foodItem ) {
		var view = new app.FoodItemsView({ model: foodItem });
		$('#food-list').append( view.render().el );
	},

	// Renders each item in the FoodItems collection from the server.
	addAll : function() {
		this.$('#food-list').html('');
		app.FoodItems.each(this.addOne, this);
	},

	// Receives an item and creates a new view to be added to the DOM under
	// the ResultItems section.
	addResult : function( foodItem ) {
		var view = new app.ResultItemsView({ model: foodItem });
		$('#results-list').append( view.render().el );
	},

	// Clears the Nutritionix data when the input value changes,
	// and then makes an API call. If successful, it adds all returned
	// data to the ResultItems collection to display to the user.
	//
	// IMPORTANT: Due to asynchronous calls, user needs to type slowly in
	// the input box to avoid varying results with each search. Also, be
	// wary of too many searches in a day.
	//
	// Application id: 5c7c3b18
	// Key: 8af13c3e3f67f24219a8eba86eeefad2
	makeRequest : function () {

		var dataString = this.$input.val();

		if (dataString.length === 0) {
			this.clearResults();
			return;
		}

		this.clearResults();

		$.ajax({
			url: 'https://api.nutritionix.com/v2/search',
			type: 'POST',
			beforeSend: function (xhr) {
				xhr.setRequestHeader('X-APP-ID', '5c7c3b18');
				xhr.setRequestHeader('X-APP-KEY', '8af13c3e3f67f24219a8eba86eeefad2');
			},
			data: 'q=' + dataString,
			success : function (response) {
				var dataArray = response.results;

				dataArray.forEach(function (item) {
					var requestedItem = new app.FoodItem({
						name : item.item_name + ' (' + item.brand_name + ')',
						calories : item.nutrient_value
					});

					if (!app.ResultItems.contains(requestedItem)) {
						app.ResultItems.create(requestedItem);
					}
				});
			},
			error: function () {
				console.log("ERROR");
			}
		});
	},

	// Destroys every model in the FoodItems array to clear the list.
	//
	// IMPORTANT: Using _.each on Collections causes it to break because deletion of models
	// messes with internal ordering.
	clearFoods : function() {
		_.invoke(app.FoodItems.toArray(), 'destroy');
		this.$input.val('');
		return false;
	},

	// Destroys every model in the ResultItems array to clear the list.
	//
	// IMPORTANT: Using _.each on Collections causes it to break because deletion of models
	// messes with internal ordering.
	clearResults : function () {
		_.invoke(app.ResultItems.toArray(), 'destroy');
		return false;
	}
});