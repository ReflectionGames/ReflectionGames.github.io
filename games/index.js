$(document).ready(function() {
	//game
	$gameTemp = $('#temp .game');
	$gameTemp.remove();
	$gameImage = $('#temp .game-image');
	$gameImage.remove();
	
	$('#back-to-top').click(function(){
		$.smoothScroll({offset: 0});
	})

	$.ajax({
		url: '/data/games.json',
		type: 'get'
	})
	.done(function(json) {
		//build game list
		for (var i = 0; i < json.length; i++) {
			var $game = $gameTemp.clone(true,true);
			var game = json[i];
			$game.find('.title').text(game.title);
			$game.find('.desc').text(game.description);
			$game.find('.source-link').attr('href',game.sourceURL);
			$game.find('.play-link').attr('href','/play/?game='+game.id);

			$game.find('.cover').attr('href',game.screenShots[0]);
			$game.find('.cover>img').attr('src',game.screenShots[0]);
			$game.appendTo('#games');

			for (var k = 1; k < game.screenShots.length; k++) {
				var url = game.screenShots[k];
				var $image = $gameImage.clone(true);
				$image.find('a').attr('href',url)
				$image.find('img').attr('src',url)
				//add it
				$game.find('.screenShots').append($image);
			};
		};
	})
});