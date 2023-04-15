import {SET_PIZZAS, SET_LOADED} from "./actionsType";
import axis from "axios";

export const setLoaded = (payload) => ({
    type: SET_LOADED,
    payload,
})

export const fetchPizzas = (sortBy, category) => (dispatch) => {
    dispatch({
        type: SET_LOADED,
        payload: false,
    });
    axis
        .get(
            `/pizzas?${category !== null ? `category=${category}` : ''}&_sort=${sortBy.type}&_order=${sortBy.order}`)
        .then(({ data }) => {
            dispatch(setPizzas(data));
        });
};

export const setPizzas = (items) => ({
    type: SET_PIZZAS,
    payload: items,
});