const DATA = require("../data/filmes.json");

module.exports = [
    {
        id: "get-years-with-most-winners",
        url: "/api/movies",
        method: "GET",
        variants: [
            {
                id: "success",
                type: "middleware",
                options: {
                    middleware: (req, res, next, core) => {
                        core.logger.info("Request received!");
                        res.status(200);
                        const projection = req.param('projection');
                        if (projection) {
                            switch(projection) {
                                case "years-with-multiple-winners":
                                    res.send(DATA.yearsWithMostWinners);
                                    break;
                                case "studios-with-win-count":
                                    res.send(DATA.studios);
                                    break;
                                case "max-min-win-interval-for-producers":
                                    res.send(DATA.winningInterval);
                                    break;
                                case "max-min-win-interval-for-producers":
                                    res.send(DATA.winningInterval);
                                    break;
                            }
                        } else {
                            //DATA.movieOfTheYear
                            res.send(DATA.filmList);
                        }
                    },
                  },
            },
        ]
    }
];