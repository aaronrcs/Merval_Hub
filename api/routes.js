const
    marvel = require('midterm'),
    express = require('express'),
    router = express.Router();

module.exports = () => {
    router.get('/api', (req, res) => {
        res.send({message: 'Welcome to the Merval API!'});
    });

    router.get('/api/characters', (req, res) => {
        marvel.searchCharacters(req.query)
            .then( (result) => {
                res.json(result.data);
                displayResultNames(result, 'ch');
            });
    });

    router.get('/api/characters/:id', (req, res) => {
        marvel.characterById({id: req.params.id})
            .then( (response) => {
                res.json(response.data);
            });
    });

    router.get('/api/comics', (req, res) => {
        marvel.searchComics(req.query)
            .then( (response) => {
                // Printing out the comic titles in server console
                displayResultNames(response, 'co');
                res.json(response.data);
            });
    });

    router.get('/api/creators', (req, res) => {
        marvel.searchCreators(req.query)
            .then( (response) => {
                // Printing out the creator names in server console
                displayResultNames(response, 'cr');
                res.json(response.data);
            });
    });

    router.get('/api/creators/:id', (req, res) => {
        marvel.creatorsById({id:parseInt(req.params.id)})
            .then( (response) => {
                // Printing out the creator names in server console
                displayResultNames(response, 'cr');
                res.json(response.data);
            })
            .catch(err=>{console.log(err);});
    });

    router.get('/api/events', (req, res) => {
        marvel.searchEvents(req.query)
            .then( (response) => {
                displayResultNames(response, 'e');
                res.json(response.data);
            });
    });

    router.get('/api/series', (req, res) => {
        marvel.searchSeries(req.query)
            .then( (response) => {
                displayResultNames(response, 'se');
                res.json(response.data);
            });
    });

    return router;
};

const displayResultNames = (response, type) => {
    console.log('\x1b[34m', 'List of Results in the query:');
    response.data.results.forEach( (element) => {
        if (type == 'ch') {
            console.log('\x1b[34m', `${element.name}`);
        }
        else if (type == 'se' || type == 'e' || type == 'co') {
            console.log('\x1b[34m', `${element.title}`);
        }
        else if (type == 'cr') {
            console.log('\x1b[34m', `${element.fullName}`);
        }
    });
    console.log('\x1b[37m', '\n');
}