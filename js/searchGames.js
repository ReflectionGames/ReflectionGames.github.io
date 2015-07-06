var searchGames = function(games) {
    return function findMatches(q, cb) {
        var matches, substringRegex;

        // an array that will be populated with substring matches
        matches = [];

        // regex used to determine if a string contains the substring `q`
        substrRegex = new RegExp(q, 'i');

        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(games, function(i, game) {
            if (substrRegex.test(game.title)) {
                matches.push(game.title);
            }
        });

        cb(matches);
    };
};
 
$(document).ready(function() {
    utils.loadGames(function(games){
        var games = games;

        //load prototypes after games
        utils.loadPrototypes(function(data){
            games = games.concat(data);

            $('#searchGames').typeahead({
                hint: true,
                highlight: true,
                minLength: 1
            },
            {
                name: 'states',
                source: searchGames(games)
            });
        })
    })
});
