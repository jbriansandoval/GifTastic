var heros = ["Iron Man", "Captian America", "Hulk"];

$("#button-view").on("click", function() {
  // Grabbing and storing the data-animal property value from the button
  var searchInput = $(this).attr("#search-input");

  // Constructing a queryURL using the animal name
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    searchInput + "&api_key=Fimj98p4Jk5l6ezs5NOl5XJTxHYK737y&limit=10";

  // Performing an AJAX request with the queryURL
  $.ajax({
      url: queryURL,
      method: "GET"
    })
    // After data comes back from the request
    .done(function(response) {
      console.log(queryURL);

      console.log(response);
      // storing the data from the AJAX request in the results variable
      var results = response.data;

      // Looping through each result item
      for (var i = 0; i < results.length; i++) {

        // Creating and storing a div tag
        var searchDiv = $("<div>");

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + results[i].rating);

        // Creating and storing an image tag
        var searchImage = $("<img>");
        // Setting the src attribute of the image to a property pulled off the result item
        searchImage.attr("src", results[i].images.fixed_height.url);

        // Appending the paragraph and image tag to the animalDiv
        searchDiv.append(p);
        searchDiv.append(searchImage);

        // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
        $("#showgifs").prepend(searchDiv);
      }
    });
});

      // This function handles events where one button is clicked
      $("#addsearch").on("click", function(event) {
        // Preventing the buttons default behavior when clicked (which is submitting a form)
        event.preventDefault();
        // This line grabs the input from the textbox
        var searchInput = $("#seach-input").val().trim();

        // Adding the movie from the textbox to our array
        heros.push(searchInput);
        console.log("heros[]")
        // Calling renderButtons which handles the processing of our movie array
        renderButtons();

      });