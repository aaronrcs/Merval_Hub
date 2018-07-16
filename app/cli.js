/*jshint esversion: 6 */ //Tell Jshint to use ES6 Syntax

const
    app = require('./app'),
    yargs = require('yargs');


const flags = yargs.usage('Usage: $0 <command> [options]')
    .command({
        command: 'search',
        desc: 'Searching through the Marvel API for a name or title.',
        builder: (yargs) => {
            return yargs.option('ch', {
                alias: 'character',
                describe: 'Search through the characters section.'
            }).option('co', {
                alias: 'comics',
                describe: 'Search through the comics section.'
            }).option('e', {
                alias: 'events',
                describe: 'Search through the events section.'
            }).option('se', {
                alias: 'series',
                describe: 'Search through the series section.'
            }).option('cr', {
                alias: 'creators',
                describe: 'Search through the creators section.'
            });
        },
        handler: (argv) => {
            if (argv.ch) {
                app.grabCharacters(argv);
            }
            else if (argv.co) {
                app.grabComics(argv);
            }
            else if (argv.e) {
                app.grabEvents(argv);
            }
            else if (argv.se) {
                app.grabSeries(argv);
            }
            else if (argv.cr) {
                app.grabCreators(argv);
            }
            else if (argv.st) {
                app.grabStories(argv);
            }
        }
    })
    .command({
        command: 'characters',
        desc: 'Get information about a particular character.',
        builder: (yargs) => {
            return yargs.option('i', {
                alias: 'id',
                describe: 'Getting a character\'s information based on Id.',
                default: -1
            }).option('co', {
                alias: 'comics',
                describe: 'Getting the comics that a character belongs to. Character\'s Id must be provided.',
                type: 'boolean'
            }).option('e', {
                alias: 'events',
                describe: 'Getting the events that a character belongs to. Character\'s Id must be provided.',
                type: 'boolean'
            }).option('se', {
                alias: 'series',
                describe: 'Getting the series that a character belongs to. Character\'s Id must be provided.',
                type: 'boolean'
            }).option('st', {
                alias: 'stories',
                describe: 'Getting the stories that a character belongs to. Character\'s Id must be provided.',
                type: 'boolean'
            });

        },
        handler: (argv) => {
            app.getCharacterInfo(argv);
        }
    })
    .command({
        command: 'comics',
        desc: 'Getting information about a specific comic.',
        builder: (yargs) => {
            return yargs.option('i', {
                alias: 'id',
                describe: 'Getting a comic based on an Id.',
            }).option('ch', {
                alias: 'characters',
                describe: 'Getting a list of characters from a specific comic. Comic Id must be provided.',
                type: 'boolean'
            }).option('cr', {
                alias: 'creators',
                describe: 'Getting a list of creators from a specific comic. Comic Id must be provided.',
                type: 'boolean'
            }).option('e', {
                alias: 'events',
                describe: 'Getting events from a specific comic. Comic Id must be provided.',
                type: 'boolean'
            }).option('s', {
                alias: 'search',
                describe: 'Searching for a specific comic with a string query.',
            }).option('st', {
                alias: 'stories',
                describe: 'Getting stories from a specific comic. Comic Id must be provided.',
                type: 'boolean'
            });
        },
        handler: (argv) => { app.getComicInfo(argv) }
    })
    .command({
        command: 'creators',
        desc: 'Getting creators information.',
        builder: (yargs) => {
            return yargs.option('s', {
                alias: 'search',
                describe: 'Getting a creator by name',
            });
        },
        handler: (argv) => { app.grabCreators(argv); }
    })
    .command({
        // Similar to the search command
        // Events command gets a list of whatever option the user chose from the event searched
        command: 'events',
        desc: 'Getting events.',
        builder: (yargs) => {
            return yargs
                .option('ch', {
                    alias: 'characters',
                    describe: 'Get Characters from Event'
                }).option('co', {
                    alias: 'comics',
                    describe: 'Get Comics from Event'
                }).option('cr', {
                    alias: 'creators',
                    describe: 'Get Creators from Event'
                }).option('se', {
                    alias: 'series',
                    describe: 'Get Series from Event'
                }).option('st', {
                    alias: 'stories',
                    describe: 'Get Stories from Event'
                });
        },
        handler: (argv) => {
            // getEventInfo() from app.js
            app.getEventInfo(argv);
        }
    })
    .command({
        command: 'series',
        desc: 'Getting series.',
        builder: (yargs) => {
            return yargs.option('i', {
                alias: 'id',
                describe: 'Getting a series by Id.',
                default: -1
            }).option('ch', {
                alias: 'characters',
                describe: 'Getting characters by series Id. Series Id must be provided.',
                type: 'boolean'
            }).option('co', {
                alias: 'comics',
                describe: 'Getting comics by series Id. Series Id must be provided.',
                type: 'boolean'
            }).option('cr', {
                alias: 'creators',
                describe: 'Getting creators by series Id. Series Id must be provided.',
                type: 'boolean'
            }).option('e', {
                alias: 'events',
                describe: 'Getting events by series Id. Series Id must be provided.',
                type: 'boolean'
            }).option('st', {
                alias: 'stories',
                describe: 'Getting stories by series Id. Series Id must be provided.',
                type: 'boolean'
            });
        },
        handler: (argv) => { app.grabSeries(argv)}
    })
    .command({
        command: 'stories',
        desc: 'Getting stories.',
        builder: (yargs) => {
            return yargs.option('i', {
                alias: 'id',
                describe: 'Getting a story by Id',
                default: -1
            }).option('ch', {
                alias: 'characters',
                describe: 'Getting characters by story Id. Story Id must be provided.'
            }).option('co', {
                alias: 'comics',
                describe: 'Getting comics by story Id. Story Id must be provided.'            
            }).option('cr', {
                alias: 'creators',
                describe: 'Getting creators by story Id. Story Id must be provided.'
            }).option('e', {
                alias: 'events',
                describe: 'Getting events by story Id. Story Id must be provided.'
            }).option('se', {
                alias: 'series',
                describe: 'Getting series by story Id. Story Id must be provided.'
            });
        },
        handler: (argv) => {
            app.grabStories(argv);
        }
    })
    .help('help')
    .argv;