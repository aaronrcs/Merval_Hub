const
    marvel = require('midterm'),
    inquirer = require('inquirer');

// ------------------------------search --ch (start)---------------------------------

const inquirerPromptCharacters = (options) => {
    let listOptions = [];
    for (let i = 0; i < options.data.results.length; i++) {
        listOptions.push(options.data.results[i].name);
    }
    return inquirer.prompt([{
        type: 'checkbox',
        message: 'Select a character: ',
        name: 'parameters',
        choices: listOptions,
        validate: (answers) => {
            if (answers.length > 1) {
                return "Please select only one character ";
            }
            else {
                return true;
            }
        }
    }]);
};

const grabCharacters = (object) => {

    marvel.characters(object)
        .then(response => {
            inquirerPromptCharacters(response).then(getCharacters => {

                response.data.results.forEach(element => {

                    if (element.name == getCharacters.parameters[0]) {

                        printCharacterInfo(element);


                    }


                })

            });
        });
};

const printCharacterInfo = (name) => {

    let comics = ""

    marvel.charactersInfoList(name)
        .then(response => {

            console.log("=====================================================================================");
            console.log("Information for (" + response.data.results[0].name + ") Character");
            console.log("-------------------------------------------------------------------------------------");
            console.log("Id:" + response.data.results[0].id + "\n");

            if (response.data.results[0].description == null || response.data.results[0].description == "") {

                console.log("Description: ");
                console.log("--------------------------------------------------------------------------------------")
                console.log(response.data.results[0].name + " has no description avaliable! ")
                console.log("")
            }
            else {


                console.log("Description: ");
                console.log("--------------------------------------------------------------------------------------")
                console.log(response.data.results[0].description)
                console.log("")


            }


            if (response.data.results[0].comics.items.length > 0) {

                console.log("Comics:")
                console.log("===================================================================================")
                console.log(response.data.results[0].name + " Also belongs to " + response.data.results[0].comics.items.length + " Comics!")
                console.log("")

                for (let i = 1; i < response.data.results[0].comics.items.length; i++) {

                    comics += i + ".) " + response.data.results[0].comics.items[i].name + "\n"


                }

                console.log(comics)


            }
            else {

                console.log("Comics:")
                console.log("===================================================================================")
                console.log("No Comic information could be found for " + response.data.results[0].name)
            }


        }).catch(err => {
            console.log(err);
        });
};

// ------------------------------search --ch (end)---------------------------------



// ----------------------------------------Search Comics: search --co (start)-------------------------------------------

const inquirerPromptComics = (options) => {
    let listOptions = [];
    for (let i = 0; i < options.data.results.length; i++) {
        listOptions.push(options.data.results[i].title);
    }
    return inquirer.prompt([{
        type: 'checkbox',
        message: 'Select a Comic: ',
        name: 'parameters',
        choices: listOptions,
        validate: (answers) => {
            if (answers.length > 1) {
                return "Please select only one comic ";
            }
            else {
                return true;
            }
        }
    }]);
};

const grabComics = (object) => {
    marvel.comics(object)
        .then(response => {
            inquirerPromptComics(response).then(getComics => {
                response.data.results.forEach(element => {
                    if (element.title == getComics.parameters) {
                        printComicInfo(element);
                    }
                });
            });
        });
};


const printComicInfo = (object) => {
    let characterComics = "";

    marvel.comicList(object)
        .then(response => {
            console.log(`=====================================================================================\n`
                + `Information for the Comic: ${response.data.results[0].title}\n`
                + "-------------------------------------------------------------------------------------\n\n"
                + `Id: ${response.data.results[0].id}\n`);

            if (response.data.results[0].characters.items.length > 0) {
                response.data.results[0].characters.items.forEach(element => {
                    characterComics += "--->" + element.name + "\n";
                });
                console.log("Characters that belong to comic: " + "\n" + characterComics);

                console.log("");
            }
            else {
                console.log("Characters that belong to comic: No character information was found\n");
            }
            if (response.data.results[0].description == null || response.data.results[0].description == "") {

                console.log("Description: No description was provided for this Comic Title");
            }
            else {
                console.log(`Description: ${response.data.results[0].description}\n`);
            }
        }).catch(err => {
            console.log(err);
        });
};

// ----------------------------------------search --co (end)-------------------------------------------


// ------------------------------search --e (start)---------------------------------

const inquirerPromptEvents = (options) => {
    let listOptions = [];
    for (let i = 0; i < options.data.results.length; i++) {
        listOptions.push(options.data.results[i].title);
    }
    return inquirer.prompt([{
        type: 'checkbox',
        message: 'Select an Event: ',
        name: 'parameters',
        choices: listOptions,
        validate: (answers) => {
            if (answers.length > 1) {
                return "Please select only one Event";
            }
            else {
                return true;
            }
        }
    }]);
};

const grabEvents = (object) => {
    marvel.events(object)
        .then(response => {
            inquirerPromptEvents(response).then(getEvents => {
                printEvents(getEvents.parameters[0]);
            });
        });
};


const printEvents = (eventNames) => {
    let characterEvents = "";

    marvel.eventList(eventNames)
        .then(response => {

            console.log("=====================================================================================");
            console.log("Information for (" + response.data.results[0].title + ") Event");
            console.log("-------------------------------------------------------------------------------------");
            console.log("Id:" + response.data.results[0].id + "\n");
            console.log("");

            response.data.results[0].characters.items.forEach(element => {
                characterEvents += "--->" + element.name + "\n";
            });
            console.log("Characters that belong to this event: " + "\n" + characterEvents);
            console.log("");
            console.log("Description: " + response.data.results[0].description);
        }).catch(err => {
            console.log(err);
        });
};

// ------------------------------search --e (end)---------------------------------


// ------------------------------search --se (start)---------------------------------

const inquirerPromptSeries = (options) => {
    let listOptions = [];
    for (let i = 0; i < options.data.results.length; i++) {
        listOptions.push(options.data.results[i].title);

    }

    return inquirer.prompt([{
        type: 'checkbox',
        message: 'Select a Series: ',
        name: 'parameters',
        choices: listOptions,
        validate: (answers) => {
            if (answers.length > 1) {
                return "Please select only one Series";
            }
            else {
                return true;
            }
        }
    }]);
};

const grabSeries = (object) => {
    marvel.series(object)
        .then(response => {
            // console.log(response.data.results[0])
            inquirerPromptSeries(response).then(getSeries => {
                response.data.results.forEach(element => {
                    if (element.title == getSeries.parameters[0]) {
                        printSeries(element);
                    }
                });
            });
        });
};


const printSeries = (seriesNames) => {
    let issueDatesSeriesStart;
    let issueDatesSeriesEnd;

    marvel.seriesList(seriesNames)
        .then(response => {
            console.log("=====================================================================================");
            console.log("Information for (" + response.data.results[0].title + ") Series");
            console.log("-------------------------------------------------------------------------------------");
            console.log("Id:" + response.data.results[0].id + "\n");
            console.log("");
            console.log("Start Year: ", response.data.results[0].startYear);
            console.log("End Year: ", response.data.results[0].endYear);
            console.log("");
        }).catch(err => {
            console.log(err);
        });
};

// ------------------------------search --se (end)---------------------------------


// creators -s
const inquirerPromptCreators = (options) => {
    let listOptions = [];

    // This will create a new list of objects for the inquirer choices.
    // The object must contain a name and value property,
    // name will be displayed but value will be returned in the promise
    // we are returning the index number of the array so that we can fetch the 
    // id of the object chosen from the promise resolution
    options.data.results.forEach((item, i) => {
        let newObject = {};
        let number = i + 1;
        newObject.name = `${number}) ${item.firstName} ${item.middleName} ${item.lastName}`;
        newObject.value = i;
        listOptions.push(newObject);
    });

    return inquirer.prompt([{
        type: 'checkbox',
        message: 'Select a creator: ',
        name: 'index',
        default: "a",
        choices: listOptions,
        validate: (answers) => {
            if ((answers.length > 1) || answers.length < 1) {
                return "Please select only one creator";
            }
            else {
                return true;
            }
        }
    }]);
};

const inquirerPromptCreatorOptions = (creatorChoosen) => {
    let inquirerChoices = [];
    if (creatorChoosen.comics.available) {
        inquirerChoices.push("Comics");
    }
    if (creatorChoosen.series.available) {
        inquirerChoices.push("Series");
    }
    if (creatorChoosen.stories.available) {
        inquirerChoices.push("Stories");
    }
    if (creatorChoosen.events.available) {
        inquirerChoices.push("Events");
    }
    if (inquirerChoices.length === 0) {
        inquirerChoices.push("No options");
    }
    return inquirer.prompt([{
        type: 'checkbox',
        message: "View Creator's: ",
        name: 'selected',
        choices: inquirerChoices,
        validate: (answers) => {
            if ((answers.length > 1) || answers.length < 1) {
                return "Please select only one option";
            }
            else {
                return true;
            }
        }
    }]);
};

const grabCreators = (object) => {
    let name = object.cr != null ? object.cr : object.s;
    let creatorIDs = [];
    let creator = {};
    marvel.creators(name)//fetch initial data, return inquirer promise
        .then(response => {
            response.data.results.forEach(creator => {
                creatorIDs.push(creator.id);
            });
            return inquirerPromptCreators(response);
        })
        .then(answerObject => {// resolve inquirer promise, answerobject contains index value of selection
            let index = answerObject.index[0];
            return marvel.creatorsById({ "id": creatorIDs[index] }); //deconstruct object with id property to fetch followup data
        })
        .then(response => {
            creator = response.data.results[0];
            return inquirerPromptCreatorOptions(creator);
        })
        .then(answer => {
            switch (answer.selected[0]) {
                case "Comics":
                    console.log("=====================================================================================");
                    console.log(`Comics by ${creator.firstName} ${creator.middleName} ${creator.lastName}`);
                    console.log("-------------------------------------------------------------------------------------");
                    creator.comics.items.forEach((item, i) => {
                        let number = i + 1;
                        console.log(`${number}) ${item.name}`);
                    });
                    break;
                case "Series":
                    console.log("=====================================================================================");
                    console.log(`Series by ${creator.firstName} ${creator.middleName} ${creator.lastName}`);
                    console.log("-------------------------------------------------------------------------------------");
                    creator.series.items.forEach((item, i) => {
                        let number = i + 1;
                        console.log(`${number}) ${item.name}`);
                    });
                    break;
                case "Stories":
                    console.log("=====================================================================================");
                    console.log(`Stories by ${creator.firstName} ${creator.middleName} ${creator.lastName}`);
                    console.log("-------------------------------------------------------------------------------------");
                    creator.stories.items.forEach((item, i) => {
                        let number = i + 1;
                        console.log(`${number}) ${item.name}`);
                    });
                    break;
                case "Events":
                    console.log("=====================================================================================");
                    console.log(`${creator.firstName} ${creator.middleName} ${creator.lastName} contributed to event`);
                    console.log("-------------------------------------------------------------------------------------");
                    creator.events.items.forEach((item, i) => {
                        let number = i + 1;
                        console.log(`${number}) ${item.name}`);
                    });
                    break;
                default:
                    console.log(`There were no No options for ${creator.firstName} ${creator.middleName} ${creator.lastName}`);
                    break;
            }
        })
        .catch(err => console.log(err));
};


const inquirerPromptStories = (options) => {
    let listOptions = [];
    for (let i = 0; i < options.data.results.length; i++) {
        listOptions.push({ name: options.data.results[i].title + " | " + options.data.results[i].id, value: options.data.results[i].id });
    }
    return inquirer.prompt([{
        type: 'checkbox',
        message: 'Select a story: ',
        name: 'parameters',
        choices: listOptions,
        validate: (answers) => {
            if (answers.length > 1) {
                return "Please select only one story";
            }
            else {
                return true;
            }
        }
    }]);
};

const inquirerPromptForStories = (options) => {
    let listOptions = [];
    for (let i = 0; i < options.data.results.length; i++) {
        if (options.data.results[i].title)
            listOptions.push({ name: options.data.results[i].title + " | " + options.data.results[i].id, value: options.data.results[i].id });
        else
            listOptions.push({ name: options.data.results[i].fullName + " | " + options.data.results[i].id, value: options.data.results[i].id });
    }
    return inquirer.prompt([{
        type: 'list',
        message: 'Choose a Selection: ',
        name: 'parameters',
        choices: listOptions,
        validate: (answers) => {
            if (answers.length > 1) {
                return "Please choose only one Selection ";
            }
            else {
                return true;
            }
        }
    }]);
};

const grabStories = (object) => {

    if (object.ch) {
        marvel.characters(object)
            .then(response => {
                inquirerPromptCharacters(response).then(char_name => {
                    marvel.charactersForStories(char_name.parameters[0])
                        .then(response => {
                            marvel.storiesByIdCharacters(response.data.results[0].id)
                                .then(stories => {
                                    inquirerPromptStories(stories).then(selection => {
                                        marvel.storiesById(selection.parameters).then(response => {
                                            printStoryInfo(response.data.results)
                                        })
                                    })
                                })
                        })
                })
            })
    } else if (object.co) {
        marvel.comics(object)
            .then(response => {
                inquirerPromptForStories(response).then(comic => {
                    marvel.storiesByIdComics(comic.parameters) // <-----------------
                        .then(stories => {
                            inquirerPromptStories(stories).then(selection => {
                                marvel.storiesById(selection.parameters).then(response => {
                                    printStoryInfo(response.data.results)
                                })
                            })
                        })
                })
            })
    } else if (object.cr) {
        marvel.creators(object.cr)
            .then(response => {
                inquirerPromptForStories(response).then(creator => {
                    marvel.storiesByIdComics(creator.parameters) // <-----------------
                        .then(stories => {
                            inquirerPromptStories(stories).then(selection => {
                                marvel.storiesById(selection.parameters).then(response => {
                                    printStoryInfo(response.data.results)
                                })
                            })
                        })
                })
            })
    } else if (object.e) {
        marvel.events(object)
            .then(response => {
                inquirerPromptForStories(response).then(event => {
                    marvel.storiesByIdEvents(event.parameters) // <-----------------
                        .then(stories => {
                            inquirerPromptStories(stories).then(selection => {
                                marvel.storiesById(selection.parameters).then(response => {
                                    printStoryInfo(response.data.results)
                                })
                            })
                        })
                })
            })
    } else if (object.se) {
        marvel.series(object)
            .then(response => {
                inquirerPromptForStories(response).then(series => {
                    marvel.storiesByIdSeries(series.parameters) // <-----------------
                        .then(stories => {
                            inquirerPromptStories(stories).then(selection => {
                                marvel.storiesById(selection.parameters).then(response => {
                                    printStoryInfo(response.data.results)
                                })
                            })
                        })
                })
            })
    } else if (object.i >= 0) {
        marvel.storiesById(object.i).then(response => {
            printStoryInfo(response.data.results)
        })
    } else {
        marvel.stories(object)
            .then(stories => {
                inquirerPromptStories(stories).then(selection => {
                    marvel.storiesById(selection.parameters).then(response => {
                        printStoryInfo(response.data.results)
                    })
                })
            })
    }
};

const printStoryInfo = (object) => {
    console.log("\n=====================================================================================\n");
    console.log("Information for " + object[0].title);
    console.log("-------------------------------------------------------------------------------------");
    console.log("Story ID: " + object[0].id + "\n");
    console.log("Original Issue: " + object[0].originalIssue.name)
    console.log("Description: " + object[0].description);
    console.log("\n=====================================================================================");
};

const searchInfo = (object) => {
    marvel.search(object)
        .then(response => {
            console.log(response.data.results);
        }).catch(err => {
            console.log(err);
        });
};

const getCharacterInfo = (object) => {
    marvel.characters(object)
        .then(result => {
            console.log(result.data.results);
        }).catch(err => {
            console.log(err);
        });
};

// ====================================================== COMICS_COMMAND ======================================================
const getComicInfo = (object) => {
    if (object.id && object.ch) { // quick check to see if object.id and object.ch are not undefined
        marvel.comicsByIdCharacters(object)
            .then(response => {
                if (response.code > 399) {
                    console.log(`\n${response.status}\n`);
                    return;
                }
                else if (response.data.results.length == 0) { // You can get a 200 response code status with no results
                    console.log('\nNo results can be found.\n');
                    return;
                }
                let counter = 1;
                console.log(`\n=====================================================================================\n` +
                    `Characters from Comic Id ${object.id}\n`);
                response.data.results.forEach(ch => { // response.data.results has the list needs to be displayed
                    console.log(`${counter}. ${ch.name}`);
                    counter += 1;
                })
                console.log();
            }).catch(err => {
                console.log(err);
            })
    }
    else if (object.id && object.cr) {
        marvel.comicsByIdCreators(object)
            .then(response => {
                if (response.code > 399) {
                    console.log(`\n${response.status}\n`);
                    return;
                }
                else if (response.data.results.length == 0) {
                    console.log('\nNo results can be found.\n');
                    return;
                }
                let counter = 1;
                console.log(`\n=====================================================================================\n` +
                    `Creators from Comic Id ${object.id}\n`);
                response.data.results.forEach(cr => {
                    console.log(`${counter}. ${cr.fullName}`);
                    counter += 1;
                })
                console.log();
            }).catch(err => {
                console.log(err);
            })
    }
    else if (object.id && object.e) {
        marvel.comicsByIdEvents(object)
            .then(response => {
                if (response.code > 399) {
                    console.log(`\n${response.status}\n`);
                    return;
                }
                else if (response.data.results.length == 0) {
                    console.log('\nNo results can be found.\n');
                    return;
                }
                let counter = 1;
                console.log(`\n=====================================================================================\n` +
                    `Events from Comic Id ${object.id}\n`);
                response.data.results.forEach(e => {
                    console.log(`${counter}. ${e.title}`);
                    counter += 1;
                })
                console.log();
            }).catch(err => {
                console.log(err);
            })
    }
    else if (object.id && object.st) {
        marvel.comicsByIdStories(object)
            .then(response => {
                if (response.code > 399) {
                    console.log(`\n${response.status}\n`);
                    return;
                }
                else if (response.data.results.length == 0) {
                    console.log('\nNo results can be found.\n');
                    return;
                }
                let counter = 1;
                console.log(`\n=====================================================================================\n` +
                    `Stories from Comic Id ${object.id}\n`);
                response.data.results.forEach(st => {
                    console.log(`${counter}. ${st.title}`);
                    counter += 1;
                })
                console.log();
            }).catch(err => {
                console.log(err);
            })
    }
    else if (object.id) {
        marvel.comicsById(object)
            .then(response => {
                if (response.code > 399) {
                    console.log(`\n${response.status}\n`);
                    return;
                }
                else if (response.data.results.length == 0) {
                    console.log('\nNo results can be found.\n');
                    return;
                }
                let comic = response.data.results[0];
                console.log(`\n=====================================================================================\n`
                    + `title: ${comic.title} \n`
                    + `-------------------------------------------------------------------------------------\n\n`
                    + `id: ${comic.id} \n\n`
                    + (comic.description == null | comic.description == undefined ?
                        `description: No description provided.\n\n` : `description: ${comic.description} \n\n`) // ternary operator
                    + `resource URI: ${comic.resourceURI}\n`);
            }).catch(err => {
                console.log(err);
            })
    }
    else if (object.s) {
        grabComics({ co: object.s }); // Using Aaron's search function for comics
    }
    else {
        marvel.comicsBasic(object)
            .then(response => {
                let comicList = [];
                response.data.results.forEach(comic => {
                    comicList.push(comic.title);
                })
                inquirer.prompt([{
                    type: 'list',
                    message: 'Select a comic to view: ',
                    name: 'comic',
                    choices: comicList,
                    pageSize: 10, // pageSize determines how many choices are displayed on the screen
                }]) // no validate function since you can only choose one option from the inquirer list
                    .then(answers => {
                        response.data.results.forEach(comic => {
                            if (comic.title == answers.comic) {
                                console.log(`=====================================================================================\n`
                                    + `title: ${comic.title} \n\n`
                                    + `id: ${comic.id} \n\n`
                                    + (comic.description == null | comic.description == undefined ?
                                        `description: No description provided.\n\n` : `description: ${comic.description} \n\n`) // ternary operator
                                    + `resource URI: ${comic.resourceURI}\n`);
                            }
                        })
                    })
            }).catch(err => {
                console.log(err);
            })
    }
}
// =====================================================================================================================


const getCreatorInfo = (object) => {
    marvel.creators(object)
        .then(response => {
            console.log(response.data.results);
        }).catch(err => {
            console.log(err);
        });
};

// ------------------------------Get List of *command* from Event--------------------------------- //

const getEventInfo = (object) => {
    // eventsInfo() from index.js
    marvel.eventsInfo(object)
        .then(response => {
            // inquirer prompt function that Aaron made returns the result option
            inquirerPromptEvents(response).then(getEvents => {
                // parameters is the eventNames chosen, object from the option
                printEventsInfo(getEvents.parameters[0], object);
            });
        }).catch(err => {
            console.log(err);
        });
};

// ------------------------------Print Information for Event--------------------------------- //
const printEventsInfo = (eventNames, object) => {
    let arr = "";
    marvel.eventList(eventNames) // gets object of event chosen
        .then(response => {
            console.log("=====================================================================================");
            console.log("Information for (" + response.data.results[0].title + ") Event"); // prints event title
            console.log("-------------------------------------------------------------------------------------");
            console.log("Id:" + response.data.results[0].id + "\n"); // prints id of event
            console.log("");

            if (object.ch) {
                // if option was characters, prints characters from events
                response.data.results[0].characters.items.forEach(element => {
                    arr += "--->" + element.name + "\n"; // add to new array
                });
                console.log("Characters that belong to this event: \n", arr, "\n"); // print arr
            }
            else if (object.co) {
                // if option was comics, prints comics from events
                response.data.results[0].comics.items.forEach(element => {
                    arr += "--->" + element.name + "\n";
                });
                console.log("Comics that belong to this event: \n", arr, "\n");
            }
            else if (object.cr) {
                // if option was creators, prints creators from events
                response.data.results[0].creators.items.forEach(element => {
                    arr += "--->" + element.name + "\n";
                });
                console.log("Creators that belong to this event: \n", arr, "\n");
            }
            else if (object.se) {
                // if option was series, prints series from events
                response.data.results[0].series.items.forEach(element => {
                    arr += "--->" + element.name + "\n";
                });
                console.log("Series that belong to this event: \n", arr, "\n");
            }
            else if (object.st) {
                // if option was stories, prints characters from stories
                response.data.results[0].stories.items.forEach(element => {
                    arr += "--->" + element.name + "\n";
                });
                console.log("Stories that belong to this event: \n", arr, "\n");
            }
        }).catch(err => {
            console.log(err);
        });
};

const getSeriesInfo = (object) => {
    marvel.series(object)
        .then(response => {
            console.log(response.data.results);
        }).catch(err => {
            console.log(err);
        });
};

const getStoryInfo = (object) => {
    marvel.stories(object)
        .then(response => {
            console.log(response.data.results);
        }).catch(err => {
            console.log(err);
        });
};

const testInfo = (result) => {
    console.log(result);
};

module.exports = {
    searchInfo,
    getCharacterInfo,
    testInfo,
    grabCharacters,
    grabComics,
    grabEvents,
    grabSeries,
    grabCreators,
    grabStories,
    getEventInfo,
    getComicInfo
};
