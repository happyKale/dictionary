import React from "react";
import {useHistory} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { deleteWordFB } from './redux/modules/word';

const WordCard = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const colonRef = React.useRef(null);
    const circleRef = React.useRef(null);
    const descRef = React.useRef(null);
    const articleRef = React.useRef(null);
    const iRef = React.useRef(null);


    const deleteCard = () => {
        dispatch(deleteWordFB(props.word.id));
    }
    const editCard = () => {
        history.push("/update/"+props.word.id);
        document.getElementsByClassName("header-btn")[0].innerHTML = "뒤로가기";
    }
    const extendCard = (event) => {
        if(colonRef.current.classList.contains("blind")){
            circleRef.current.classList.add("blind");
            colonRef.current.classList.remove("blind");
            descRef.current.classList.remove("blind");
            iRef.current.classList.remove("fa-caret-down");
            iRef.current.classList.add("fa-caret-up");
            articleRef.current.style.backgroundColor="#fff";
        } else {
            circleRef.current.classList.remove("blind");
            colonRef.current.classList.add("blind");
            descRef.current.classList.add("blind");
            iRef.current.classList.remove("fa-caret-up");
            iRef.current.classList.add("fa-caret-down");
            articleRef.current.style.backgroundColor="#c9f1cb";
        }
        console.log("아티클: ",articleRef);
    };

    return (
        <article ref={articleRef} className="card">
            <div className="card-word">
                <div>
                    <span ref={colonRef} className="font-green">:</span>
                    <div ref={circleRef} className="card-word-circle blind"></div>
                    <span className="card-word-word">{props.word.word}</span>
                </div>
                <div className="card-word-idiv">
                    <i onClick={deleteCard} class="i-card-delete fas fa-trash-alt"/>
                    <i onClick={editCard} class="i-card-edit fas fa-edit"/>
                    <i ref={iRef} onClick={extendCard} class="i-card-expand fas fa-caret-up"/>
                </div>
            </div>
            <div ref={descRef} className="card-desc">
                <div className="card-desc-mean">
                    <p className="card-desc-title">뜻</p>
                    <p className="card-desc-desc">
                    {props.word.mean}
                    </p>
                </div>
                <div className="card-desc-ex">
                    <p className="card-desc-title">예시</p>
                    <p className="card-desc-desc ex-text">
                    {props.word.ex}
                    </p>
                </div>
            </div>
        </article>
    );
};

export default WordCard;