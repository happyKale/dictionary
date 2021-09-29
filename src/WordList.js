import React from "react";
import WordCard from './WordCard';
import {useSelector} from "react-redux";

import {db} from "./firebase";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc
} from "firebase/firestore";

const WordList = (props) => {
    const word_lists = useSelector((state) => state.word.wordList);

    return (
        <section className="page-list">
            {
                word_lists.map((word) => {
                    return( <WordCard word={word}/> );
                })
            }
        </section>
    );
};

export default WordList;