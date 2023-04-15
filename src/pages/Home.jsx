import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Categories, Sorting, PizzaBlock, PizzaLoadingBlock} from "../components";
import {setCategory, setSortBy} from "../redux/actions/filters";
import {fetchPizzas} from "../redux/actions/pizzas";
import {addPizzaToCart} from "../redux/actions/cart";

const categoryNames = ['Meat', 'Vegetarian', 'Grill', 'Spicy', 'Closed'];

const sortItems = [
    { name: 'popularity', type: 'popular', order: 'desc' },
    { name: 'price descending', type: 'price', order: 'desc' },
    { name: 'price ascending', type: 'price', order: 'asc' },
    { name: 'alphabetically descending', type: 'name', order: 'desc' },
    { name: 'alphabetically ascending', type: 'name', order: 'asc' },
];

const Home = () => {
    const dispatch = useDispatch();
    const items = useSelector(({pizzas}) => pizzas.items);
    const cartItems = useSelector(({cart}) => cart.items);
    const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
    const { category, sortBy } = useSelector(({ filters }) => filters);

    useEffect(() => {
        dispatch(fetchPizzas(sortBy, category));
    }, [category, dispatch, sortBy]);

    const onSelectCategory = useCallback((index) => {
        dispatch(setCategory(index));
    }, [dispatch]);

    const onSelectSortType = useCallback((type) => {
        dispatch(setSortBy(type));
    }, [dispatch]);

    const handleAddPizzaToCart = useCallback((obj) => {
        dispatch(addPizzaToCart(obj))
    },[dispatch])

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    activeCategory={category}
                    onClickCategory={onSelectCategory}
                    items={categoryNames}
                />
                <Sorting
                    activeSortType={sortBy.type}
                    activeSortOrder={sortBy.order}
                    items={sortItems}
                    onClickSortType={onSelectSortType}
                />
            </div>
            <h2 className="content__title">All pizzas</h2>
            <div className="content__items">
                {isLoaded
                    ? items.map((obj) => (
                    <PizzaBlock 
                    onClickAddPizza={handleAddPizzaToCart} 
                    key={obj.id}
                    addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
                    {...obj} />))
                    : Array(12).fill(0)
                    .map((_, index) => <PizzaLoadingBlock key={index}/>)}
            </div>
        </div>
    );
};

export default Home;
