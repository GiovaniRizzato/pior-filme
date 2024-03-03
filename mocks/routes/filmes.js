const DATA = require("../data/filmes.json");

module.exports = [
    {
        id: "get-years-with-most-winners",
        url: "/api/movies", 
        method: "GET",
        variants: [
            {
                id: "filmList",
                type: "json",
                options: {
                    status: 200,
                    body: DATA.filmList
                },
            },
            {
                id: "yearsWithMostWinners",
                type: "json",
                options: {
                    status: 200,
                    body: DATA.yearsWithMostWinners
                },
            },
            {
                id: "studios",
                type: "json",
                options: {
                    status: 200,
                    body: DATA.studios
                },
            },
            {
                id: "winningInterval",
                type: "json",
                options: {
                    status: 200,
                    body: DATA.winningInterval
                },
            },
            {
                id: "movieOfTheYear",
                type: "json",
                options: {
                    status: 200,
                    body: DATA.movieOfTheYear
                },
            }
        ]
    }
];