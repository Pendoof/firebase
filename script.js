/**
 * @TODO get a reference to the Firebase Database object
 */

const database = firebase.database().ref();

/**
 * @TODO get const references to the following elements:
 *      - div with id #all-messages
 *      - input with id #username
 *      - input with id #message
 *      - button with id #send-btn and the updateDB
 *        function as an onclick event handler
 */

const allMessages = document.getElementById('all-messages');
const usernameElem = document.getElementById('username');
const emailElem = document.getElementById('email');
const profileElem = document.getElementById('profile');
const messageElem = document.getElementById('message');
const sendBtn = document.getElementById('send-btn');

sendBtn.onclick = updateDB;

/**
 * @TODO create a function called updateDB which takes
 * one parameter, the event, that:
 *      - gets the values of the input elements and stores
 *        the data in a temporary object with the keys USERNAME
 *        and MESSAGE
 *      - console.logs the object above
 *      - writes this object to the database
 *      - resets the value of #message input element
 */

function updateDB(event) {
  // Prevent default refresh
  // Create data object
  // console.log the object
  // GET *PUSH* PUT DELETE
  // Write to our database
  // Reset message

  event.preventDefault();
  const date = new Date();

  const data = {
    USERNAME: usernameElem.value,
    EMAIL: emailElem.value,
    PROFILE: profileElem.value,
    MESSAGE: messageElem.value,
    DATE: date.toLocaleDateString(),
    TIME: date.toLocaleTimeString()
  };

  console.log(data);
  database.push(data);
  messageElem.value = '';
}

/**
 * @TODO add the addMessageToBoard function as an event
 * handler for the "child_added" event on the database
 * object
 */

database.on('child_added', addMessageToBoard);

/**
 * @TODO create a function called addMessageToBoard that
 * takes one parameter rowData which:
 *      - console.logs the data within rowData
 *      - creates a new HTML element for a single message
 *        containing the appropriate data
 *      - appends this HTML to the div with id
 *        #all-messages (we should have a reference already!)
 *
 */

function addMessageToBoard(rowData) {
  // Store the value of rowData inside object named 'data'
  // console.log data
  // Create a variable named singleMessage
  // that stores function call for makeSingleMessageHTML()
  // Append the new message HTML element to allMessages

  const data = rowData.val();
  console.log(data);

  let singleMessage = makeSingleMessageHTML(data.USERNAME, data.EMAIL, data.PROFILE, data.MESSAGE, data.DATE, data.TIME);
  allMessages.appendChild(singleMessage);
}

/**
 * @TODO create a function called makeSingleMessageHTML which takes
 * two parameters, usernameTxt and messageTxt, that:
 *      - creates a parent div with the class .single-message
 *
 *      - creates a p tag with the class .single-message-username
 *      - update the innerHTML of this p to be the username
 *        provided in the parameter object
 *      - appends this p tag to the parent div
 *
 *      - creates a p tag
 *      - updates the innerHTML of this p to be the message
 *        text provided in the parameter object
 *      - appends this p tag to the parent div
 *
 *      - returns the parent div
 */

function makeSingleMessageHTML(usernameTxt, emailTxt, profileSrc, messageTxt, dateTxt, timeTxt) {
  // Create Parent Div
  // Add Class name .single-message
  // Create Username P Tag
  // Append username
  // Create message P Tag
  // Return Parent Div

  let parentDiv = document.createElement("div");
  parentDiv.className = "single-message";

  let profileImg = document.createElement('img');
  profileImg.src = profileSrc;
  profileImg.alt = 'Profile Image';
  profileImg.className = 'single-message-img';

  parentDiv.appendChild(profileImg);

  let usernameP = document.createElement('p');
  usernameP.className = 'single-message-username';
  usernameP.innerHTML = usernameTxt + ':';

  parentDiv.appendChild(usernameP);

  let emailP = document.createElement('p');
  emailP.className = 'single-message-email';
  emailP.innerHTML = emailTxt;

  parentDiv.appendChild(emailP);

  let messageP = document.createElement('p');
  messageP.innerHTML = messageTxt;

  parentDiv.appendChild(messageP);

  let dateP = document.createElement('p');
  dateP.className = 'single-message-date';
  dateP.innerHTML = dateTxt;

  parentDiv.appendChild(dateP);

  let timeP = document.createElement('p');
  timeP.className = 'single-message-time';
  timeP.innerHTML = timeTxt;

  parentDiv.appendChild(timeP);

  return parentDiv;
}

/**
 * @BONUS add an onkeyup event handler to the form HTML
 * element so the user can also submit the form with the
 * Enter key
 *
 * @BONUS use an arrow function
 */
