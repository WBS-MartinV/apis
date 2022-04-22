import { useEffect, useState } from "react";
import "./App.css";

function User(user) {
    return (
        <li key={user.phone}>
            <img src={user.picture.medium} />
            <p>
                {user.name.first} {user.name.last} ({user.registered.age})
            </p>
            <div>{user.email}</div>
            <div>{user.phone}</div>
        </li>
    );
}

function App() {
    const url = "https://randomuser.me/api/";

    const [users, setUsers] = useState(false);
    const [number, setNumber] = useState(10);
    const [gender, setGender] = useState();

    const [sort, setSort] = useState();

    const byRegistered = (a, b) => {
        return new Date(a.registered.date) - new Date(b.registered.date);
    };

    const fullName = (user) => [user.name.first, user.name.last].join(" ");
    const byName = (a, b) => fullName(a).localeCompare(fullName(b));

    useEffect(() => {
        fetch(url + `?results=${number}&gender=${gender}`)
            .then((response) => response.json())
            .then((json) => {
                console.log("Fetched ", json);
                setUsers(json.results);
            });
    }, [number, gender]);

    return (
        <div className="App">
            <div className="block">
                <div>
                    <h3>API:</h3>
                    <input
                        type="range"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    />
                    {number}

                    <button
                        style={{ color: gender === "male" ? "red" : "black" }}
                        onClick={() =>
                            setGender(gender === "male" ? "" : "male")
                        }
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
                </div>

                <div>
                    <h3>Sorting:</h3>
                    <button
                        style={{
                            color: sort?.name === byName.name ? "red" : "black",
                        }}
                        onClick={() => setSort(() => byName)}
                    >
                        Sort by name
                    </button>
                    <button
                        style={{
                            color:
                                sort?.name === byRegistered.name
                                    ? "red"
                                    : "black",
                        }}
                        onClick={() => setSort(() => byRegistered)}
                    >
                        Sort by registered
                    </button>
                </div>

                <div>
                    <h3>Array: </h3>
                    <button onClick={() => setUsers(users.slice(1))}>
                        Remove first
                    </button>
                    <button onClick={() => setUsers([])}>Clear</button>
                    <ul id="users">{users && users.sort(sort).map(User)}</ul>
                </div>
            </div>
        </div>
    );
}

export default App;
