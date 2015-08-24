FEND - P5-2: Health Tracker App

To all you need to do to run the Health Tracker App is open the index.html
page provided, preferably in the Chrome browser.

This app was completed using Backbone.js to implement an MVC structure.
There are two lists displayed to the user, a list of food items that the user
selects as their own personal list to track, and a list of food items retrieved
from the Nutritionix API. All food items show the same data, and both collections
contain the same model type; they are simply separated for display purposes.

The Nutritionix data is retrieved by taking user input from the search bar located
at the top of the page. Each time the input changes, an ajax request is sent to the
Nutritionix API and the returned list of results is added to a collection as new
food item models.

The appView.js does the bulk of the heavy lifting. Users can add items to their list
from the Nutritionix data list, and remove items from their list. The total number of
items and summed calories is displayed at the bottom of the user's personal list.

NOTE: The user needs to type slowly into the search bar because of the asynchronous
ajax requests. They take a little time and if items are still listed after the search
bar has been cleared then the user should just hit the backspace key again and it will
clear the nutritionix data.