utils = {
	loadGames: function(cb){
		if(!utils.loadGames.cache){
			$.ajax({
				url: '/data/games.json',
				type: 'get',
				dataType: 'json'
			})
			.done(function(json) {
				utils.loadGames.cache = json;
				if(cb) cb(json);
			})
			.fail(function() {
				if(cb) cb(false);
			})
		}
		else{
			if(cb) cb(utils.loadGames.cache);
		}
	},
	loadGame: function(id,cb){
		utils.loadGames(function(games){
			for (var i = 0; i < games.length; i++) {
				if(games[i].id === id){
					if(cb) cb(games[i]);
					return;
				}
			};
			if(cb) cb(false);
		})
	},
	parseSearch: function(url){
		if(!utils.parseSearch.cache){
			url = url || location.search;
			var queries = url.replace(/^\?/, '').replace(/\+/g,' ').split('&');
			utils.parseSearch.cache = {};
		    for( i = 0; i < queries.length; i++ ) {
		        split = queries[i].split('=');
		        utils.parseSearch.cache[split[0]] = window.unescape(split[1]);
		    }
		}
	    return utils.parseSearch.cache;
	},
	serverError: function(id,message,back){
		location.replace('/errors/'+id+'.html?message='+message+((back)? '&back='+back : '') );
	}
}
