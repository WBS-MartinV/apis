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
    // const [query, setQuery] = useState("?results=15&gender=female");
    const [number, setNumber] = useState(10);
    const [gender, setGender] = useState(undefined);

    const url = "https://randomuser.me/api/";

    useEffect(() => {
        fetch(url + `?results=${number}&gender=${gender}`)
            .then((response) => response.json())
            .then((json) => setUsers(json.results));
    }, [number, gender]);

    return (
        <div className="App">
            <div className="block">
                <input
                    type="range"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                />{" "}
                {number}
                <button
                    style={{ color: gender === "male" ? "red" : "black" }}
                    onClick={() => setGender(gender === "male" ? "" : "male")}
                >
                    Male
                </button>
                <button
                    style={{ color: gender === "female" ? "red" : "black" }}
                    onClick={() =>
                        setGender(gender === "female" ? "" : "female")
                    }
                >
                    Female
                </button>
                <button onClick={() => setUsers(users.slice(1))}>
                    Remove first
                </button>
                <ul id="users">{users && users.map(User)}</ul>
            </div>
        </div>
    );
}

export default App;
