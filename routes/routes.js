const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");

module.exports = app => {
    app.get("/", (req, res) => {
        res.render("index");
    });

    app.get("/saved", (req, res) => {
        res.render("saved");
    });

    app.get("/scrape", (req, res) => {
        axios.get("http://echojs.com").then(response => {
            let $ = cheerio.load(response.data);

            $("article h2").each(function(i, element) {
                let result = {};

                let title = $(this)
                .children("a")
                .children("span")
                .text();
                let link = $(this)
                .children("a")
                .attr("href");

                result.title = title;
                result.link = link;

                db.Article.create(result)
                .then(dbArticle => {
                    console.log(dbArticle)
                })
                .catch(err => {
                    console.log(err);
                });

            });
            res.redirect("/articles");
        });
    });
    app.get("/articles", (req, res) => {
        db.Article.find({})
        .then(dbArticle => {
            let articleObj = { article: dbArticle };
            res.render("index", articleObj);
        })
        .catch(err => {
            res.json(err);
        });
    });
};