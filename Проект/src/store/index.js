import { createStore } from "redux";
import { Actions } from "./types";

const defaultState = {
    token: "",
};

function reducer(state = defaultState, action) {
    switch (action.type) {
        case Actions.ADD_TOKEN:
            return { ...state, token: action.payload };
        default:
            return state;
    }
}

export const store = createStore(reducer);
export const addToken = (payload) => ({ type: Actions.ADD_TOKEN, payload });