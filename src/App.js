import "./App.css";

function App() {
    return (
        <div className="App">
            <h1>My Amazing Users</h1>

            <div className="block">
                In this exercise you will have to fetch the data from an API
                <br />
                <br />
                Look at the instructions in <strong>index.js</strong>
                <br />
                <a
                    className="link"
                    target="_blank"
                    href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch"
                >
                    Help
                </a>
            </div>

            <div className="block">
                <ul id="users"></ul>
            </div>
        </div>
    );
}

const ul = document.getElementById("users"); // Get the element where we will place our users
const url = "https://randomuser.me/api/?results=15&&gender=female";
//https://randomuser.me/api/?results=50"; // Get 10 random users

const renderUsers = (users) => {
  console.log(users);
  return users.map((user) => {
    console.log(user);
    return (ul.innerHTML += `
    <li>
      <img src="${user.picture.medium}" />
      <p>${user.name.first} ${user.name.last}</p>
      <div>${user.email}</div>
      <div>${user.phone}</div>
    </li>`);
  });
};

/**
 * Don't edit the code above
 * ---
 * Below you will have to fetch the data from the link (stored in the variable url)
 * Once retrieved, you will pass the result as an argument of the function renderUsers
 */

// This takes the raw response from the server and returns just the json.
const responseHandler = (response) => {
  console.debug(response);
  return response.json();
};

fetch(url)
  .then(responseHandler)
  .then((json) => renderUsers(json.results));

export default App;
