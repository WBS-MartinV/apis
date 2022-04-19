import { useEffect, useState } from "react";
import "./App.css";

function User(user) {
    console.log(user);
    return (
        <li>
            <img src={user.picture.medium} />
            <p>
                {user.name.first} {user.name.last}
            </p>
            <div>{user.email}</div>
            <div>{user.phone}</div>
        </li>
    );
}

function App() {
    const [users, setUsers] = useState([
        {
            picture: {},
            name: {
                first: "John",
                last: "Example",
            },
            email: "a@a.a",
        },
    ]);

    useEffect(() => {
        const url = "https://randomuser.me/api/?results=15&&gender=female";
        //https://randomuser.me/api/?results=50"; // Get 10 random users

        // This takes the raw response from the server and returns just the json.
        const responseHandler = (response) => {
            console.debug(response);
            return response.json();
        };

        fetch(url)
            .then(responseHandler)
            .then((json) => setUsers(json.results));
    }, []);

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
                <ul id="users">{users.map(User)}</ul>
            </div>
        </div>
    );
}

const ul = document.getElementById("users"); // Get the element where we will place our users

export default App;
