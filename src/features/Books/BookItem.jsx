import React, {
  useState, memo, useCallback,
} from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidV4 } from 'uuid';
import styled from 'styled-components';
import { addBook, fetchBooks } from '../../redux/books/bookSlice';

const AddBookHeader = styled.h2`
  font-family: "Montserrat",sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -.18px;
  color: #5b5c5c;;
  text-transform: uppercase;
}
`;

const FormSection = styled.section`
  border-top: 2px solid #5b5c5c;
  margin-top: 2rem;
`;

const InputForm = styled.input`
    padding: 12px;
    border-radius: 4px;
    border: 1px solid #e8e8e8;
    background-color: #fff;
    font-size: 1rem;
    letter-spacing: -.15px;
    color: #121212;
    width: 30%;
    margin-right: 1rem;
    @media (min-width: 768px) {
      width: 30%;
    }
`;

const SelectInput = styled.select`
padding: 12px;
  border-radius: 4px;
  border: 1px solid #e8e8e8;
  background-color: #fff;
  font-size: 1rem;
  letter-spacing: -.15px;
  color: #121212;
  width: 35%;
  margin-right: 1rem;
  position: relative;
  @media (min-width: 768px) {
    width: 20%;
  }
`;

const AddBookButton = styled.input`
  cursor: pointer;
  width: 20%;
  padding: 12px;
  border-radius: 3px;
  background-color: #0290ff;
  border: none;
  letter-spacing: .5px;
  color: #fff;
  font-size: .813rem;
  font-weight: 700;
  font-family: "Roboto Slab",serif;
  width: 6rem;
  margin-top: 1rem;
  
`;

const BookItem = () => {
  const valueInitialState = {
    title: '',
    author: '',
    category: '',
  };

  // Create form states:
  const [values, setValues] = useState(valueInitialState);
  // Prepare Redux dispatch method:
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // Add form onSubmit handler:
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const { title, author, category } = values;
    if (title && author) {
      const bookArray = {
        title,
        author,
        id: uuidV4(),
        category: category || 'Action',
      };
      await dispatch(addBook(bookArray));
      await dispatch(fetchBooks());
      setValues('');
    }
  },
  [values, dispatch]);

  return (
    <div>
      <FormSection>
        <AddBookHeader className="text"> Add New book </AddBookHeader>
        <form onSubmit={handleSubmit}>
          <InputForm
            type="text"
            name="title"
            value={values.title || ''}
            id="bookItemId"
            placeholder="Book Title"
            onChange={handleChange}
          />
          <InputForm
            type="text"
            name="author"
            id="authorId"
            value={values.author || ''}
            placeholder="Author Name"
            onChange={handleChange}
          />
          <SelectInput
            name="category"
            value={values.category || ''}
            id="categoryId"
            onChange={handleChange}
          >
            <option value="Action">Action</option>
            <option value="Science">Science Friction</option>
            <option value="Economy">Economy</option>
            <option value="Sports">Sports</option>
          </SelectInput>
          <AddBookButton type="submit" value="Add Book" />
        </form>
      </FormSection>
    </div>
  );
};

export default memo(BookItem);
