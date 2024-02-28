const DATA = require("../data/filmes.json");

module.exports = [
    {
        id: "get-movie",
        url: "/api/movies", 
        method: "GET",
        variants: [
            {
                id: "success",
                type: "json",
                options: {
                    status: 200,
                    body: DATA.filmList
                },
            }
        ]
    }
];