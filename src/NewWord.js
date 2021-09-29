import React from "react";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addWordFB} from "./redux/modules/word";

const NewWord = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const wordRef = React.useRef(null);
    const meanRef = React.useRef(null);
    const exRef = React.useRef(null);
    const addWord = (props) => {
        const word = wordRef.current.value;
        const mean = meanRef.current.value;
        const ex = exRef.current.value;

        // 각 입력칸이 비어있으면 단어가 추가되지 못하게 막는다.
        // 입력칸이 빈 곳에 placeholer가 입력된다.
        if (word === "") {
            wordRef
                .current
                .parentNode
                .children[1]
                .setAttribute('placeholder', '단어를 입력하세요!');
        }
        if (mean === "") {
            meanRef
                .current
                .parentNode
                .children[3]
                .setAttribute('placeholder', '뜻을 입력하세요!');
        }
        if (ex === "") {
            exRef
                .current
                .parentNode
                .children[5]
                .setAttribute('placeholder', '예시를 입력하세요!');
        }

        // 입력칸이 빈 곳이 없으면 정상적으로 단어를 추가한다.
        if ((word !== "") && (mean !== "") && (ex !== "")) {
            dispatch(addWordFB({word: word, mean: mean, ex: ex}))
            history.push("/");
            document.getElementsByClassName("header-btn")[0].innerHTML = "단어추가";
        }
    };

    return (
        <section className="page-add">
            <h2 className="page-add-title">새로운 단어</h2>
            <article className="form-add-card">
                <p className="form-add-card-title">단어</p>
                <input ref={wordRef} className="form-add-card-input" type="text"/>
                <p className="form-add-card-title">뜻</p>
                <textarea
                    ref={meanRef}
                    className="form-add-card-textarea"
                    cols="50"
                    rows="3"></textarea>
                <p className="form-add-card-title">예시</p>
                <textarea
                    ref={exRef}
                    className="form-add-card-textarea"
                    cols="50"
                    rows="3"></textarea>
                <button className="form-add-card-btn" onClick={addWord}>추가하기</button>
            </article>
        </section>
    );
};

export default NewWord;