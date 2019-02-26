var express = require('express');
var router = express.Router();
const request = require('request');
const fs = require('fs');
const cheerio = require('cheerio');

/* GET home page. */
router.get('/fetchUrls', function (req, res, next) {
  const url = 'https://medium.com/';
  const baseDir = __dirname + '/../public/';
  request(url, (error, response, body) => {
    if (!error) {
      console.log(response);
      if (response && response.statusCode == 200 && body) {
        $ = cheerio.load(body);
        const links = $('a');
        let linksToSave = [];
        let text = '';

        $(links).each((i, link) => {
          linksToSave.push('<a href="' + $(link).attr('href') + '"> ' + $(link).attr('href') + ' </a> <br>');
        });

        linksToSave = linksToSave.join('');

        fs.writeFile(baseDir + 'index.html', linksToSave, (error) => {
          if (!error) {
            res.status(200).send({});
          } else {
            res.status(500).send({});
          }
        })
      } else {
        res.status(500).send({});
      }
    } else {
      res.status(response.statusCode).send({});
    }
  });

});

module.exports = router;
