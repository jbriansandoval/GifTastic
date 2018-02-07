var heros = ["Captin America", "Iron Man", "Hulk", ];

function renderButtons(){
  $("#buttons-view").empty("");

  for (var i = 0; i < heros.length; i++){
    var a = $("<button>");
    a.addClass("hero");
    a.attr("data-name", heros[i]);
    a.text(heros[i]);
    $("#buttons-view").append(a);
  }   
}

renderButtons();

$("#add-hero").on("click", function addhero(event) {
  event.preventDefault();
  var hero = $("#hero-input").val().trim();
  heros.push(hero);
  renderButtons();
});


$("button").on("click", function displaygif(){

  var herogif = $(this).attr("data-name");

  var queryURL= "https://api.giphy.com/v1/gifs/search?q=" + herogif + "&api_key=dc6zaTOxFJmzC&limit=10";
  
  $.ajax({
    url: queryURL,
    method: "GET"
   }).done(function(response) {
    var results = response.data;
    console.log(results);
    // var gif = $("<img>").attr("src", url); 
        
    var heroDiv = $("<div class='hero'>");
     // Looping through each result item
     for (var i = 0; i < results.length; i++) {

      // Creating and storing a div tag
      var herogif = $("<div>");

      // Creating a paragraph tag with the result item's rating
      var p = $("<p>").text("Rating: " + results[i].rating);

      // Creating and storing an image tag
      var heroImage = $("<img>");
      // Setting the src attribute of the image to a property pulled off the result item
      heroImage.attr("src", results[i].images.fixed_height.url);

      // Appending the paragraph and image tag to the animalDiv
      herogif.append(p);
      herogif.append(heroImage);

      // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
      $("#hero-view").prepend(herogif);
    }
    // var gifURL = response.data.images.fixed_height.url;
    console.log(queryURL);   
   });


  $("#hero-view").html(herogif + queryURL);

});

$(document).on("click", ".hero", displaygif);
