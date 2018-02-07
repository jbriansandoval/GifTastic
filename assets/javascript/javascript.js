$(document).ready(function(){

  var heros = ["Captin America", "Iron Man", "Hulk", ];
  function renderButtons(){
    $("#buttons-view").empty();

    for (var i = 0; i < heros.length; i++){
      var a = $("<button>");
      a.addClass("hero");
      a.attr("data-name", heros[i]);
      a.text(heros[i]);
      $("#buttons-view").append(a);
    }   
  }
  // 

  $("#add-search").on("click", function(event) {
    event.preventDefault();
    var hero = $("#search-input").val().trim();
    heros.push(hero);
    renderButtons();
  });
  // $(document).on("click", ".hero", displayCharacterInfo);
  $("button").on("click", function(){
    $("#showGifs").empty();
    var herogif = $(this).attr("data-name");
    var queryURL= "https://api.giphy.com/v1/gifs/search?q=" + herogif + "&api_key=dc6zaTOxFJmzC&limit=10";
    
    $.ajax({
      url: queryURL,
      method: "GET"
     })
     .done(function(response) {
       var results = response.data;
       
       for (var i = 0; i < results.length; i++) {
         if (results[i].rating !== "r" && results[i].rating !== "pq-13") {
           var gifDiv = $("<div class='item'>");

           var rating = results[i].rating;
           
           var p = $("<p>").text("Gif Rating: " + rating);
           
           var heroImage = $("<img>");

           heroImage.attr("src", results[i].images.fixed_height.url);

           gifDiv.append(p);
           gifDiv.append(heroImage);

           $("#showGifs").prepend(gifDiv);

         }
       }
     });
  });

  renderButtons();
});