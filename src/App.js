import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import data from './data';
import { ProductContext } from './contexts/ProductContext';
import { CardContext } from './contexts/CardContext';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useState([]);

	const addItem = item => {
		setCart([...cart, item]);
	};

	const removeItem = id => {
		setCart(
			[
				...cart.filter(product => {
					if(product.id !== id){
						return product;
					}
				})
			]
		)
	}

	// Sets state to data in local storage
	useEffect(() => {
		const storedCart = JSON.parse(window.localStorage.getItem('cart'));
		storedCart && setCart(storedCart);
	}, [])

	// Updates local storage with current cart state
	useEffect(() => {
		window.localStorage.setItem('cart', JSON.stringify(cart));
	}, [cart])

	return (
		<div className="App">
			<ProductContext.Provider value={{products, addItem}}>
				<CardContext.Provider value={{cart, removeItem}}>

					<Navigation />
					{/* Routes */}
					<Route exact path="/">
						<Products />
					</Route>

					<Route path="/cart">
						<ShoppingCart />
					</Route>

				</CardContext.Provider>
			</ProductContext.Provider>
		</div>
	);
}

export default App;
