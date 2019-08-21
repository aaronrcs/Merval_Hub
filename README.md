# Merval_Hub

Using the Marvel API to access character information.

Allows Users to perform a search using our Merval API.

The UI allows the users to do the following:

- Indicate to the User the type of search that is available (Marval Categories), so the User knows what to type into the input field, e.g Comics, Characters, etc
- When the search results are returned, the users are presented with a search result list, e.g if a user searches for Spider-Man in the "Characters" category, the user will see the list of characters in regards to their search.
- The user has an option to select the a result and be able to view the details of the result selected.
- The users are able to create a new search after their current search.
- The UI displays the previous searches in real-time.
  - Allows the user to click on one of the previous searches.
  - If clicked, the user is presented with the search results.
  
### Running Application
- npm install app, merval, front-end, back-end

- To start the back-end, use the command "node server.js" in the back-end folder directory
or "nodemon server.js" if you have nodemon installed.

- To start the front-end, use the command "npm run dev" in the front-end folder directory.

- Port 8080 REST API, Port 8081 is where the client side is hosted, and 
Port 8082 is where the websockets are.

### Team Members
- Aaron Romero
- Davis Louie
- Gonzalo Serrano
- Zolangi Ramirez

### Technologies Used:
- Javascript, HTML 5, CSS (Bulma)
- Node.js server (Express), Web Sockets
- Vue.js
- API Used: https://developer.marvel.com/





