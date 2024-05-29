import { createStore } from "redux";
import { Actions } from "./types";

const defaultState = {
    token: "",
    url: "/",
};

function reducer(state = defaultState, action) {
    switch (action.type) {
        case Actions.ADD_TOKEN:
            return { ...state, token: action.payload };
        case Actions.ADD_URL:
            return { ...state, url: action.payload };
        default:
            return state;
    }
}

export const store = createStore(reducer);
export const addToken = (payload) => ({ type: Actions.ADD_TOKEN, payload });
export const addUrl = (payload) => ({ type: Actions.ADD_URL, payload });