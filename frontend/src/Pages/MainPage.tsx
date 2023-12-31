import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";

export default function MainPage() {

    const navigate = useNavigate();
    const [username, setUsername] = useState<string>("")

    useEffect(() => {
        getUsername()
    }, []);

    function login() {
        const host = window.location.host === 'localhost:5173' ?
            'http://localhost:8080' : window.location.origin

        window.open(host + '/oauth2/authorization/github',"_self")
    }

    function logout() {
        axios.post("/api/logout")
            .then(() => {
                setUsername("")
            })
            .catch((error) => {
                console.error("Error found", error);
            })
    }

    function getUsername() {
        axios.get("/api/user")
            .then((response) => {
                setUsername(response.data)
                localStorage.setItem("username", response.data)
            })
            .catch((error) => {
                console.error("Error found", error);
            })
    }

    const isLoggedIn = username !== ""

    function createQuiz() {
        if (!isLoggedIn) {
            alert("You need to be logged in to create a quiz.");
        } else {
            navigate("/create");
        }
    }

    function editQuiz() {
        if (!isLoggedIn) {
            alert("You need to be logged in to edit a quiz.");
        } else {
            navigate("/update");
        }
    }

    return (
        <div className="PageContainer">
            <h1 className="PageHeader">Quizard</h1>
            <div className="MainPageActionContainer">
                <button className="MainPageAction" onClick={() => navigate("/take")}>Take Quiz</button>
                <button className="MainPageAction" onClick={createQuiz}>Create Quiz</button>
                <button className="MainPageAction" onClick={editQuiz}>Edit Quiz</button>
            </div>
            {isLoggedIn ? (
                <div className="LoginContainer">
                    <p className="Username">Logged in as {username}</p>
                    <button className="Login" onClick={logout}>Logout</button>
                </div>
            ) : (
                <div className="LoginContainer">
                    <button className="Login" onClick={login}>Login</button>
                </div>
            )}
        </div>
    )
}