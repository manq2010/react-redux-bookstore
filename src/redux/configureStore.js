// Import configureStore() from Redux toolkit:
import { configureStore } from '@reduxjs/toolkit';

import bookReducer from './books/books';
import booksReducer from './books/bookSlice';
import categoriesReducer from './categories/categories';

const store = configureStore({
  reducer: {
    book: bookReducer,
    category: categoriesReducer,
    booksReducer, // Add books reducer
  },
});

export default store;
