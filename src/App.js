import React from "react";
import './style.css';
import {Route, Switch, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loadWordFB} from './redux/modules/word';

import NewWord from './NewWord';
import WordList from './WordList';
import UpdateWord from './UpdateWord';
import NotFound from './NotFound';

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
    React.useEffect(async () => {
        await dispatch(loadWordFB())
    }, []);

    return (
        <div className="App">
            <header className="header-style">
              <div className="header-inner-wrap">
                <h1 className="header-title">
                    dictionary
                    <button ref={btnRef} className="header-btn" onClick={pageChange}>단어추가</button>
                </h1>               
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
                    <Route path="/update/:id">
                        <UpdateWord/>
                    </Route>
                    <Route>
                        <NotFound/>
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default App;
