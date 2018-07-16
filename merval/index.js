/*jshint esversion: 6 */ //Tell Jshint to use ES6 Syntax

const
    config = require('./config'),
    superagent = require('superagent'),
    crypto = require('crypto'),
    fs = require('fs'), // For reading keys and writing files
    path = require('path');

let credentials = "";

const _fetch = (command) => {
    console.log('\x1b[32m', `Marvel API Call to: ${config.url}/${command}`)
    return superagent.get(`${config.url}/${command}`)
        .then(response => response.body)
        .catch(error => error.response.body);
};

const createCredentials = (date) => {
    let time = new Date().getTime();

    const fullPrivateKeyPath = path.resolve('keys', 'private_key.pem'),
        privateKey = fs.readFileSync(fullPrivateKeyPath, 'utf8');

    let
        // The hashing algorithm we will use
        hashingAlgorithm = 'md5',
        hash = crypto.createHash(hashingAlgorithm),
        message = `${time}${privateKey}${config.apikey}`;

    // Update the data to be hashed
    hash.update(message);

    // Perform the hash
    let digest = hash.digest('hex');
    credentials = `&ts=${time}&apikey=${config.apikey}&hash=${digest}`;
};
createCredentials();

exports.searchCharacters = (object) => {
    return _fetch(`characters?limit=10&nameStartsWith=${object.ch}${credentials}`);
};

exports.searchComics = (object) => {
    return _fetch(`comics?limit=10&titleStartsWith=${object.co}${credentials}`);
};

exports.searchCreators = (object) => {
    return _fetch(`creators?limit=10&nameStartsWith=${object.cr}${credentials}`);
};

exports.searchEvents = (object) => {
    return _fetch(`events?limit=10&nameStartsWith=${object.e}${credentials}`);
};

exports.searchSeries = (object) => {
    return _fetch(`series?limit=10&titleStartsWith=${object.se}${credentials}`);
};

// ------------------------------------ For search --ch 
exports.characters = (object) => {

    return _fetch(`characters?limit=10&nameStartsWith=${object.ch}${credentials}`);
};

exports.charactersForStories = (name) => {

    return _fetch(`characters?limit=10&name=${name}${credentials}`);
};



exports.charactersInfoList = (nameObject) => {
    return _fetch(`characters/${nameObject.id}?${credentials}`);
};

// ---------------------------------------------------------

exports.characterById = (object) => {
    return _fetch(`characters/${object.id}?${credentials}`);
};

exports.charactersByIdComics = (object) => {
    return _fetch(`characters/${object.id}/comics?${credentials}`);
};

exports.characterByIdEvents = (object) => {
    return _fetch(`characters/${object.id}/events?${credentials}`);
};

exports.characterByIdSeries = (object) => {
    return _fetch(`characters/${object.id}/series?${credentials}`);
};

exports.charactersByIdStories = (object) => {
    return _fetch(`characters/${object.id}/stories?${credentials}`);
};

// --------------------------------- For search --co

exports.comics = (object) => {
    return _fetch(`comics?limit=5&titleStartsWith=${object.co}${credentials}`);
};

exports.comicList = (title) => {

    return _fetch(`comics/${title.id}?${credentials}`);

};


// -------------------------------------------------------------

exports.comicsBasic = (object) => {
    return _fetch(`comics?${credentials}`);
}

exports.comicsById = (object) => {
    return _fetch(`comics/${object.id}?${credentials}`);
};

exports.comicsByIdCharacters = (object) => {
    return _fetch(`comics/${object.id}/characters?${credentials}`);
};

exports.comicsByIdCreators = (object) => {
    return _fetch(`comics/${object.id}/creators?${credentials}`);
};

exports.comicsByIdEvents = (object) => {
    return _fetch(`comics/${object.id}/events?${credentials}`);
};

exports.comicsByIdStories = (object) => {
    return _fetch(`comics/${object.id}/stories?${credentials}`);
};


// Creators search
exports.creators = (object) => {
    return _fetch(`creators?firstNameStartsWith=${object}${credentials}`);
};

exports.creatorsById = (object) => {
    return _fetch(`creators/${object.id}?${credentials}`);
};

exports.creatorsByIdComics = (object) => {
    return _fetch(`creators/${object.id}/comics?${credentials}`);
};

exports.creatorsByIdEvents = (object) => {
    return _fetch(`creators/${object.id}/events?${credentials}`);
};

exports.creatorsByIdSeries = (object) => {
    return _fetch(`creators/${object.id}/series?${credentials}`);
};

exports.creatorsByIdStories = (object) => {
    return _fetch(`creators/${object.id}/stories?${credentials}`);
};


// --------------------------------- For search --e

exports.events = (object) => {
    return _fetch(`events?nameStartsWith=${object.e}&${credentials}`);
};

exports.eventList = (eventName) => {
    return _fetch(`events?name=${eventName}${credentials}`);

};

// ------------------------------------------------------------------------------

// Events Command 
exports.eventsInfo = (object) => {
    // calls url using whatever option the user chose
    // Return events with names that begin with the specified string 
    // then Limit the result set to the specified number of resources.
    if (object.ch)
        return _fetch(`events?nameStartsWith=${object.ch}&limit=5&${credentials}`);
    else if (object.co)
        return _fetch(`events?nameStartsWith=${object.co}&limit=5&${credentials}`);
    else if (object.cr)
        return _fetch(`events?nameStartsWith=${object.cr}&limit=5&${credentials}`);
    else if (object.se)
        return _fetch(`events?nameStartsWith=${object.se}&limit=5&${credentials}`);
    else if (object.st)
        return _fetch(`events?nameStartsWith=${object.st}&limit=5&${credentials}`);
};

//--------------------------------------------------------------------------------------
exports.eventsById = (object) => {
    return _fetch(`events/${object.id}?${credentials}`);
};

exports.eventsByIdCharacters = (object) => {
    return _fetch(`events/${object.id}/characters?${credentials}`);
};

exports.eventsByIdComics = (object) => {
    return _fetch(`events/${object.id}/comics?${credentials}`);
};

exports.eventsByIdCreators = (object) => {
    return _fetch(`events/${object.id}/creators?${credentials}`);
};

exports.eventsByIdSeries = (object) => {
    return _fetch(`events/${object.id}/series?${credentials}`);
};

exports.eventsByIdStories = (object) => {
    return _fetch(`events/${object.id}/stories?${credentials}`);
};

// --------------------------------- For search --se


exports.series = (object) => {
    return _fetch(`series?limit=5&titleStartsWith=${object.se}${credentials}`);
};

exports.seriesList = (seriesName) => {
    return _fetch(`series/${seriesName.id}?${credentials}`);

};

// -----------------------------------------------

exports.seriesById = (object) => {
    return _fetch(`series/${object.id}?${credentials}`);
};

exports.seriesByIdCharacters = (object) => {
    return _fetch(`series/${object.id}/characters?${credentials}`);
};

exports.seriesByIdComics = (object) => {
    return _fetch(`series/${object.id}/comics?${credentials}`);
};

exports.seriesByIdCreators = (object) => {
    return _fetch(`series/${object.id}/creators?${credentials}`);
};

exports.seriesByIdEvents = (object) => {
    return _fetch(`series/${object.id}/events?${credentials}`);
};

exports.stories = (object) => {
    return _fetch(`stories?${credentials}`);
};

exports.storiesById = (object) => {
    return _fetch(`stories/${object}?${credentials}`);
};

exports.storiesByIdCharacters = (object) => {
    return _fetch(`stories?characters=${object}${credentials}`);
}

exports.storiesByIdComics = (object) => {
    return _fetch(`stories?comics=${object}${credentials}`);
};

exports.storiesByIdCreators = (object) => {
    return _fetch(`stories?creators=${object}${credentials}`);
};

exports.storiesByIdEvents = (object) => {
    return _fetch(`stories?events=${object}${credentials}`);
};

exports.storiesByIdSeries = (object) => {
    return _fetch(`stories?series=${object}${credentials}`);
};
