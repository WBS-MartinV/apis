import { useEffect, useState } from "react";
import "./App.css";

function User(user) {
    return (
        <li key={user.phone}>
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
    const [users, setUsers] = useState(false);
    const [query, setQuery] = useState("?results=15&&gender=female");

    const url = "https://randomuser.me/api/";

    useEffect(
        () => {
            fetch(url + query)
                .then((response) => response.json())
                .then((json) => setUsers(json.results))
        },
        [query]
    );

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
                <input value={query} onChange={(e) => setQuery(e.target.value)}></input>
                <button onClick={() => setUsers(users.slice(1))}>
                    Remove first
                </button>
                <ul id="users">{users && users.map(User)}</ul>
            </div>
        </div>
    );
}

export default App;
