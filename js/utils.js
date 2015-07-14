utils = {
	loadGames: function(cb){
		utils.loadGames.callbacks = utils.loadGames.callbacks || [];
			
		if(!utils.loadGames.cache){
			utils.loadGames.cache = [];
			$.ajax({
				url: '/data/games.json',
				type: 'get',
				dataType: 'json'
			})
			.done(function(json) {
				utils.loadGames.returned = true;
				for (var i = 0; i < json.length; i++) {
					utils.loadGames.cache.push(json[i]);
				};
				
				if(cb) cb(json);

				for (var i = 0; i < utils.loadGames.callbacks.length; i++) {
					utils.loadGames.callbacks[i](json);
				};
			})
			.fail(function() {
				if(cb) cb(false);

				for (var i = 0; i < utils.loadGames.callbacks.length; i++) {
					utils.loadGames.callbacks[i](false);
				};
			})
		}
		else if(!utils.loadGames.returned){
			utils.loadGames.callbacks.push(cb);
		}
		else{
			if(cb) cb(utils.loadGames.cache);
		}
		return utils.loadGames.cache;
	},
	loadGame: function(id,cb){
		utils.loadGames(function(games){
			for (var i = 0; i < games.length; i++) {
				if(games[i].id == id){
					if(cb) cb(games[i]);
					return;
				}
			};
			if(cb) cb(false);
		})
	},
	loadPrototypes: function(cb){
		utils.loadPrototypes.callbacks = utils.loadPrototypes.callbacks || [];

		if(!utils.loadPrototypes.cache){
			utils.loadPrototypes.cache = [];
			$.ajax({
				url: '/data/prototypes.json',
				type: 'get',
				dataType: 'json'
			})
			.done(function(json) {
				utils.loadPrototypes.returned = true;
				for (var i = 0; i < json.length; i++) {
					utils.loadPrototypes.cache.push(json[i]);
				};

				if(cb) cb(json);

				for (var i = 0; i < utils.loadPrototypes.callbacks.length; i++) {
					utils.loadPrototypes.callbacks[i](json);
				};
			})
			.fail(function() {
				if(cb) cb(false);

				for (var i = 0; i < utils.loadPrototypes.callbacks.length; i++) {
					utils.loadPrototypes.callbacks[i](false);
				};
			})
		}
		else if(!utils.loadPrototypes.returned){
			utils.loadPrototypes.callbacks.push(cb);
		}
		else{
			if(cb) cb(utils.loadPrototypes.cache);
		}
		return utils.loadPrototypes.cache;
	},
	loadPrototype: function(id,cb){
		utils.loadPrototypes(function(prototypes){
			for (var i = 0; i < prototypes.length; i++) {
				if(prototypes[i].id == id){
					if(cb) cb(prototypes[i]);
					return;
				}
			};
			if(cb) cb(false);
		})
	},
	loadMembers: function(cb){
		utils.loadMembers.callbacks = utils.loadMembers.callbacks || [];
			
		if(!utils.loadMembers.cache){
			utils.loadMembers.cache = [];
			$.ajax({
				url: '/data/members.json',
				type: 'get',
				dataType: 'json'
			})
			.done(function(json) {
				utils.loadMembers.returned = true;
				for (var i = 0; i < json.length; i++) {
					utils.loadMembers.cache.push(json[i]);
				};
				
				if(cb) cb(json);

				for (var i = 0; i < utils.loadMembers.callbacks.length; i++) {
					utils.loadMembers.callbacks[i](json);
				};
			})
			.fail(function() {
				if(cb) cb(false);

				for (var i = 0; i < utils.loadMembers.callbacks.length; i++) {
					utils.loadMembers.callbacks[i](false);
				};
			})
		}
		else if(!utils.loadMembers.returned){
			utils.loadMembers.callbacks.push(cb);
		}
		else{
			if(cb) cb(utils.loadMembers.cache);
		}
		return utils.loadMembers.cache;
	},
	loadMember: function(name,cb){
		utils.loadMembers(function(members){
			for (var i = 0; i < members.length; i++) {
				if(members[i].name.toLowerCase() == name.toLowerCase()){
					if(cb) cb(members[i]);
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
