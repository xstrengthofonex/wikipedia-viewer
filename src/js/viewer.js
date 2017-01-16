$(document).ready(function(){
	// alert("Document ready");
	$("#random-btn").click(function(){
		window.open("https://en.wikipedia.org/wiki/Special:Random");
	});
	$("#submit-btn").click(function(){
		var searchVal = $("#search-input").val();
		console.log(searchVal);
		if (searchVal.length > 0){
			getWikipediaResults(searchVal);			
		}
	});
});

function getWikipediaResults(searchVal){
    $.ajax({
      url: "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exlimit=max&format=json&exsentences=1&exintro=&explaintext=&generator=search&gsrlimit=10&gsrsearch=" + searchVal,
      dataType: 'JSONP',
      type: "get",
      success: function(results){
      	if (results.hasOwnProperty("query")){
      		showResults(results);
      	} else {
      		$("#results-section").hide();
      		$("#error").show();
      		$("#error").text("No Results Found");
      	}
      }
    });
}

var searchResult, title, content

function showResults(results){
	$("#error").hide();

	$("#results-section").empty();

	$.each(results.query.pages, function(id, page){
		searchResult = $("<div id='"+id+"' class='result-card'></div>")
		console.log(page);
		searchResult = searchResult.clone();
		title = "<h2>"+page.title+"</h2>";
		content = "<p>"+page.extract+"</p></div>";
		searchResult.append(title + content);
		$("#results-section").append(searchResult);
		$("#results-section").fadeIn('slow');
	});

	$(".result-card").click(function(){
		var id = $(this).attr("id");
		window.open('http://en.wikipedia.org/?curid='+id);
	});
}

// href='http://en.wikipedia.org/?curid="+id+"'