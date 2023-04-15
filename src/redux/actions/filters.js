import {SET_CATEGORY, SET_SORT_BY} from "./actionsType";


// Action Creator - функция, которая принимает динамические данные
export const setSortBy = (name) => ({
    type: SET_SORT_BY,
    payload: name,
});

// Action
// const setSortBy = (name) => ({
//     type: SET_SORT_BY
// });

export const setCategory = (catIndex) => ({
    type: SET_CATEGORY,
    payload: catIndex,
});