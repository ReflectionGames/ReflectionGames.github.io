function animateGames(){
	$('.game, .prototype, .member').each(function(i,el){
		setTimeout(function(){
			$(el).css({
				transform: 'translateX(0px)',
				opacity: 1
			})
		},i*10)
	})
}