import { combineReducers } from "@reduxjs/toolkit";

const SET_SEARCH_TERM = 'SET_SEARCH_TERM';
const SET_SEARCH_RESULT = 'SET_SEARCH_RESULT';

const initialState = {
    term: '',
    results: [],
  };

const searchTerm = (state = initialState, action) => {
    switch(action.type) {
        case SET_SEARCH_TERM:
            return {
                ...state,
                term: action.payload
            };
        case SET_SEARCH_RESULT:
            return {
                ...state,
                results: action.payload
            }
        default:
            return state;
    }
}

export const setSearchTerm = (term) => ({
    type: SET_SEARCH_TERM,
    payload: term
});

export const setSearchResult = (results) => ({
    type: SET_SEARCH_RESULT,
    payload: results
})

export default searchTerm;