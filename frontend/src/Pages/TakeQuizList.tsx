import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {PlayMultipleChoiceQuiz} from "../Models/play/PlayMultipleChoiceQuiz.tsx";
import PlayQuizCard from "../Components/play/PlayQuizCard.tsx";
import '../Styling/TakeQuizList.css'
import BackIcon from "../Assets/back.svg"

export default function TakeQuizList() {

    const [playMultipleChoiceQuizzes, setPlayMultipleChoiceQuizzes] = useState<PlayMultipleChoiceQuiz[]>([])
    const navigate = useNavigate()

    useEffect(()=>
    {
        axios.get("/api/take")
            .then(response => {
                setPlayMultipleChoiceQuizzes(response.data)
            })
            .catch(error => {
                console.error("Error during quiz loading: ", error)
            })
    },[])

    return (
        <div className="TakeQuizList">
            <h2 className="TakeQuizListName">Take a Quiz</h2>
            <img className="BackButton" onClick={()=>navigate("/")} src={BackIcon} alt="Back Icon"/>
            {playMultipleChoiceQuizzes.map(quiz=>
                <div  className="PlayQuizCardContainer" key = {quiz.id} onClick={()=>navigate("" + quiz.id)}>
                    <PlayQuizCard key={quiz.id} playMultipleChoiceQuiz={quiz}></PlayQuizCard>
                </div>)}
        </div>
    )
}