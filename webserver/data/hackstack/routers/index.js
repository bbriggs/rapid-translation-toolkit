var express = require('express');
var router  = express.Router();
var config  = require('../config.js');
var nano    = require('nano')('http://localhost:5984')

var alignment_db = nano.db.use('alignments')

// Endpoint to retrieve client-side configuration
router.get('/config-client.js', function(req, res, next) {
  res.type('application/json');
  res.send('var config = ' + JSON.stringify(config.client));
});

router.get('/', function(req, res, next) {
	console.log('RENDERING HOMEPAGE');
  return res.render('index', {
    title: 'LinguiFlow'
  });
});

router.post('/queryAlignment', function(req, res, next) {
    //console.log(req.body);
    var inputText  = req.body.inputText;
    var tokenArray = inputText.split(/( |n't|'s)/).filter( function(s){return s != '' && s != ' '} );
    //console.log(tokenArray);
    alignment_db.view('all_alignments','aligned_by_src',{'key': tokenArray[0]}, function(err, body){
        if (!err){
            var results = body.rows;
            console.log(results);
            res.send(results)
        } else {
            console.log(err);
        }
    });
});

module.exports = router;
