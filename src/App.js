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
        let text = document.getElementsByClassName("header-link-cardchange-text")[0].outerText;
        if( text === "CLOSE"){
            document.getElementsByClassName("header-link-cardchange-text")[0].innerHTML = "OPEN";
        }else{
            document.getElementsByClassName("header-link-cardchange-text")[0].innerHTML = "CLOSE";
        }
        new_list.forEach((i) => {
            i.lastChild.click();
        });
    };

    React.useEffect(async () => {
        await dispatch(loadWordFB());

        // 데이터 가져오기
        // const query = await getDocs(collection(db, "dictionary"));
        // console.log(query);
        // const emptyList = [];
        // query.forEach((doc) => {
        //         console.log("데이터들 확인!!!: ",doc.id, doc.data());
        //         emptyList.push({id: doc.id, ...doc.data()});
        // });
        // console.log("새롭게 만든 리스트: ",emptyList);
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
