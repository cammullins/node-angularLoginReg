# Login Registration Page
I have posted this code sample here as an example to help direct students learning how to process login and registration with Node-express. 

## Example of a MEAN stack login Registration Page
The front-end of this login-registration page is controlled by Angular, which utylizes controllers to handle logic and factories to connect with the server files.  The UI is not pretty, but no effort was made to make it pretty.  Essentially it is here to have and example of user interaction.

## Looking at the backend
The code is split into two directories, the client (also at times in other code examples called public) and server.  Server is where the backend logic is processed.  Once the front end gathers user input, a user object is created and passed to the backend logic.  You'll find the inital routing logic in `server/config/routes.js`, which directs the incoming object to `server/controllers/users.js`

###  controllers/users.js

***Register:** Here you'll see the first bit of data processing, as the DB is checked for the user's email to make sure we aren't creating a duplicate entry.  If the entry passes the bit of logic, in this step, it's passed to the model folder encryption and storage

***Login:** Here you'll see first a query of our MongoDB for the entered email, and then checking of the password with bcrypt.  This function is found in the `models/user.js` file

### models/user.js
This file checks the email with regex (cool tool [here](https://regexr.com/) to learn regex) and uses bcrypt to salt the password before passing the object to the DB, and has a method attached to the schema for validating the password (used at login) attached as well

Hope this helps!