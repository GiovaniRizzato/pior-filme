const DATA = require("../data/filmes.json");

module.exports = [
	{
		id: "get-movies",
		url: "/api/movies",
		method: "GET",
		variants: [
		{
			id: "success",
			type: "middleware",
			options: {
				middleware: (req, res) => {
					res.status(200);
					const projection = req.query.projection;
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
						if(req.query.page) {
							let filmListCopy = JSON.parse(JSON.stringify(DATA.filmList));
							if(req.query.year) {
								filmListCopy.content = filmListCopy.content.filter(movie => movie.year == req.query.year);
							}
							if(typeof req.query.winner !== "undefined") {
								filmListCopy.content = filmListCopy.content.filter(movie => movie.winner === (req.query.winner === "true"));
							}
							const pageNumber = req.query.page;
							const pageSize = req.query.size;
							filmListCopy.totalElements = filmListCopy.content.length;
							filmListCopy.content = filmListCopy.content.splice(pageNumber * pageSize, pageSize);
							res.send(filmListCopy);
						} else {
							let filmCopy = JSON.parse(JSON.stringify(DATA.movieOfTheYear));
							filmCopy[0].id = parseInt(Math.random() * 99);
							filmCopy[0].year = req.query.year;
							res.send(filmCopy);
						}
					}
				},
			},
		},
		{
			id: "error",
			type: "status", 
			options: {
				status: 500,
			},
		}]
	}
];