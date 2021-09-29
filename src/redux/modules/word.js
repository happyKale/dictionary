import {db} from "../../firebase";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc
} from "firebase/firestore";

// 액션 타입을 정해줍니다.
const LOAD = "word/LOAD";
const CREATE = "word/CREATE";
const UPDATE = "word/UPDATE";
const DELETE = "word/DELETE";

// 초기 상태값을 만들어줍니다.
const initialState = {
    wordList: [
        // {word: "dictionary",  mean: "사전",  ex: "I'm making dictionary by coding"}
    ]
};

// 리스트를 정렬하는 함수
const sortList = (list) => {
    list = list.sort((a, b) => {
        let x = a.word.toLowerCase();
        let y = b.word.toLowerCase();
        if (x < y) {
            return -1;
        } else {
            return 1;
        }
    });
    return list;
}

// 액션 생성 함수예요. 액션을 만들어줄 함수죠!
export const loadWord = (word_list) => {
    return {type: LOAD, word_list};
};

export const createWord = (word) => {
    return {type: CREATE, word};
};

export const updateWord = (word) => {
    return {type: UPDATE, word}
}

export const deleteWord = (word_id) => {
    return {type: DELETE, word_id}
}

//middlewares
export const loadWordFB = () => {
    return async function (dispatch) {
        const word_data = await getDocs(collection(db, "dictionary"));
        let word_list = [];

        word_data.forEach((doc) => {
            word_list.push({
                id: doc.id,
                ...doc.data()
            });
        });

        word_list = sortList(word_list);
        dispatch(loadWord(word_list));
    }
}
export const addWordFB = (word) => {
    return async function (dispatch) {
        const docRef = await addDoc(collection(db, "dictionary"), word);
        // const _bucket = await getDoc(docRef); const bucket_data = {id: _bucket.id,
        // ..._bucket.data()};
        const word_data = {
            id: docRef.id,
            ...word
        };
        dispatch(createWord(word_data));
        console.log(word_data);
    }
}
export const updateWordFB = (word) => {
    return async function (dispatch, getState) {
        const docRef = doc(db, "dictionary", word.id);
        await updateDoc(docRef, { word:word.word, mean:word.mean, ex:word.ex});

        dispatch(updateWord(word));
    }
}
export const deleteWordFB = (word_id) => {
    return async function (dispatch) {
        const docRef = doc(db, "dictionary", word_id);
        await deleteDoc(docRef);

        dispatch(deleteWord(word_id));
    }
}


// 리듀서예요. 실질적으로 store에 들어가 있는 데이터를 변경하는 곳이죠!dfsd
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
            // do reducer stuff
        case "word/LOAD": {
            return {wordList: action.word_list};
        }
        case "word/CREATE": {
            let new_list = [
                ...state.wordList,
                action.word
            ];
            new_list = sortList(new_list);
            return {wordList: new_list};
        }
        case "word/UPDATE": {
            let update_list = state.wordList.map((word) => {
                if(word.id === action.word.id){
                    return {
                        ...word, 
                        word: action.word.word, 
                        mean: action.word.mean,
                        ex: action.word.ex
                    }
                }else{
                    return word;
                }
            })
            update_list = sortList(update_list);
            return {wordList: update_list};
        }
        case "word/DELETE": {
            let delete_list = state.wordList.filter((word) => {
                return word.id !== action.word_id;
            });
            delete_list = sortList(delete_list);
            return {wordList: delete_list};
        }
        default:
            return state;
    }
}