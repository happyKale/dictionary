import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { updateWordFB, loadWordFB } from "./redux/modules/word";

const UpdateWord = (props) => {
    const history = useHistory();
    const params = useParams();
    const dispatch = useDispatch();

    const word_id2 = params.id;
    const word_list = useSelector((state) => state.word.wordList);
    console.log("아이디값: ",word_id2);
    console.log("데이터들: ",word_list);
    const word_data = [];

    const wordRef = React.useRef(null);
    const meanRef = React.useRef(null);
    const exRef = React.useRef(null);

    word_list.filter((word) => {
        if(word.id === word_id2){
            return word_data.push(word);
        }
    })

    // id에 맞는 단어, 뜻, 예시를 입력칸에 넣어준다.
    useEffect(() =>{
        wordRef.current.value = word_data[0].word;
        meanRef.current.value = word_data[0].mean;
        exRef.current.value = word_data[0].ex;
    },[]);

    const updateWord = (props) => {
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

        //입력칸이 빈 곳이 없으면 정상적으로 단어를 추가한다.
        if ((word !== "") && (mean !== "") && (ex !== "")) {
            dispatch(updateWordFB({id: word_id2, word: word, mean: mean, ex: ex}))
            history.goBack();
            document.getElementsByClassName("header-btn")[0].innerHTML = "단어추가";
        }
    };

    return (
        <section className="page-add">
            <h2 className="page-add-title">단어 수정하기</h2>
            <article className="form-add-card">
                <p className="form-add-card-title">단어</p>
                <input id="word-input" ref={wordRef} className="form-add-card-input" type="text"/>
                <p className="form-add-card-title">뜻</p>
                <textarea
                    id="mean-input" 
                    ref={meanRef}
                    className="form-add-card-textarea"
                    name=""
                    cols="50"
                    rows="3"/>
                <p className="form-add-card-title">예시</p>
                <textarea
                    id="ex-input" 
                    ref={exRef}
                    className="form-add-card-textarea"
                    name=""
                    cols="50"
                    rows="3"/>
                <button className="form-add-card-btn" onClick={updateWord}>수정하기</button>
            </article>
        </section>
    );
};

export default UpdateWord;