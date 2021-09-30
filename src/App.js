import React from "react";
import './style.css';
import {Route, Switch, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loadWordFB} from './redux/modules/word';

import NewWord from './NewWord';
import WordList from './WordList';
import UpdateWord from './UpdateWord';
import NotFound from './NotFound';

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

function App() {
    const dispatch = useDispatch();
    const history = useHistory();
    const btnRef = React.useRef();
    const pageChange = (event) => {
        if (btnRef.current.innerHTML === "단어추가") {
            event.target.innerHTML = "뒤로가기";
            history.push("/add");
        } else {
            event.target.innerHTML = "단어추가";
            history.push("/");
        } 
    };

    const cardChange = () => {
        const list = document.getElementsByClassName('card-word-idiv');
        const new_list = [...list];
        let text = document.getElementsByClassName("header-link-cardchange-text")[0];
        if( text.outerText === "CLOSE"){
            text.innerHTML = "OPEN";
            new_list.forEach((i) => {
                if(i.lastChild.classList[2] === "fa-caret-up"){
                    i.lastChild.click();
                }
            });
        }else{
            text.innerHTML = "CLOSE";
            new_list.forEach((i) => {
                if(i.lastChild.classList[2] === "fa-caret-down"){
                    i.lastChild.click();
                }
            });
        }
    };

    React.useEffect(async () => {
        await dispatch(loadWordFB());
    }, []);

    return (
        <div className="App">
            <header className="header-style">
              <div className="header-inner-wrap">
                <div onClick={cardChange} className="header-link-cardchange">                    
                    <span className="header-link-cardchange-text">CLOSE</span>
                </div>
                <h1 className="header-title">
                    dictionary
                </h1>               
                <button ref={btnRef} className="header-btn" onClick={pageChange}>단어추가</button>
              </div>
            </header>
            <div className="page-wrap">
                <Switch>
                    <Route path="/" exact>
                        <WordList/>
                    </Route>
                    <Route path="/add" exact>
                        <NewWord/>
                    </Route>
                    <Route path="/update/:id" exact>
                        <UpdateWord/>
                    </Route>
                    <Route>
                        <NotFound/>
                    </Route>
                </Switch>
            </div>
            <i onClick={()=>{
                window.scrollTo({ top: 0, left:0, behavior: "smooth"});
            }} className="link-top fas fa-arrow-circle-up"/>
        </div>
    );
}

export default App;
