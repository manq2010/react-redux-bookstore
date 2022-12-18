/* eslint-disable no-param-reassign */
// Import createSlice() from Redux toolkit:
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

// Initial state for Redux store:
const initialState = {
  books: [],
  isLoading: true,
  status: 'idle',
  error: '',
};

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async () => {
    const response = await axios.get('/books');
    const books = Object.keys(response.data).map((key) => ({
      item_id: key,
      ...response.data[key][0],
    }));
    return books.slice().sort((a, b) => a.item_id - b.item_id);
  },
);

export const addBook = createAsyncThunk(
  'books/addBook',
  async (book) => {
    await axios.post('/books',
      {
        item_id: book.id,
        title: book.title,
        author: book.author,
        category: book.category,
      });
    return book;
  },
);

// export const deleteBook = createAsyncThunk(
//   'books/deleteBook',
//   async (id) => {
//     await axios.delete(`/books/${id}`,
//       {
//         item_id: id,
//       });

//     return { id };
//   },
// );

export const deleteBook = createAsyncThunk('post/deleteBook', async (initialBook) => {
  const { id } = initialBook;
  try {
    const response = await axios.delete(`/books/${id}`,
      {
        item_id: id,
      });
    if (response?.status === 200) return initialBook;
    return `${response.status} : ${response.statusText}`;
  } catch (error) {
    return error.message;
  }
});

// Create Redux state slice
const bookslice = createSlice({
  name: 'books',
  initialState, // Define initial state
  reducers: {
    // Define reducers
    // addBook: (state, action) => {
    //   state.books = [...state.books, action.payload];
    // },
    // removeBook: (state, action) => {
    //   state.books = state.books.filter((book) => book.id !== action.payload.id);
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.isLoading = true;
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.books = [state.books, action.payload];
      })
      .addCase(addBook.pending, (state) => {
        state.status = 'adding';
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.books = state.books.filter((book) => book.id !== action.payload.id);
      })
      .addCase(deleteBook.pending, (state) => {
        state.status = 'deleting';
      });
  },
});

// Export actions generated by "createSlice()":
// export const { addBook, removeBook } = bookslice.actions;

// Export reducer generated by "createSlice()":
export default bookslice.reducer;
