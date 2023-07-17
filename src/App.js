import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Table, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBookOpen, faPlus } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedBook, setSelectedBook] = useState({});

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const mockBooks = [
      { _id: 1, title: 'Book 1', author: 'Author 1', year: '2020' },
      { _id: 2, title: 'Book 2', author: 'Author 2', year: '2021' },
      { _id: 3, title: 'Book 3', author: 'Author 3', year: '2022' },
      { _id: 4, title: 'Book 4', author: 'Author 4', year: '2023' },
    ];
    setBooks(mockBooks);
  };

  const handleAddBook = () => {
    setSelectedBook({});
    setShowForm(true);
  };

  const handleEditBook = (book) => {
    setSelectedBook(book);
    setShowForm(true);
  };

  const handleDeleteBook = async (id) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
  };

  const handleSubmitBook = async (book) => {
    if (book._id) {
      setBooks((prevBooks) =>
        prevBooks.map((prevBook) => (prevBook._id === book._id ? book : prevBook))
      );
    } else {
      const newBook = { ...book, _id: Date.now() };
      setBooks((prevBooks) => [...prevBooks, newBook]);
    }
    setShowForm(false);
  };

  return (
    <Container>
    <h1>
      <FontAwesomeIcon icon={faBook} className="mr-2" />
      Library Management Dashboard - Books
    </h1>
    <Row>
      <Col>
        <h2>
          <FontAwesomeIcon icon={faBookOpen} className="mr-2" />
          Books
        </h2>
        <Button onClick={handleAddBook}>
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add Book
        </Button>
        <Table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Year</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.year}</td>
                  <td>
                    <Button onClick={() => handleEditBook(book)}>Edit</Button>{' '}
                    <Button variant="danger" onClick={() => handleDeleteBook(book._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {showForm && (
            <div>
              <h2>{selectedBook._id ? 'Edit Book' : 'Add Book'}</h2>
              <BookForm book={selectedBook} onSubmit={handleSubmitBook} />
            </div>
          )}
      </Col>
    </Row>
  </Container>
);
};
    
const BookForm = ({ book, onSubmit }) => {
  return (
    <Formik
      initialValues={{
        title: book.title || '',
        author: book.author || '',
        year: book.year || '',
      }}
      onSubmit={(values) => onSubmit(values)}
    >
      {({ values, handleChange, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" name="title" value={values.title} onChange={handleChange} />
          </Form.Group>

          <Form.Group controlId="author">
            <Form.Label>Author</Form.Label>
            <Form.Control type="text" name="author" value={values.author} onChange={handleChange} />
          </Form.Group>

          <Form.Group controlId="year">
            <Form.Label>Year</Form.Label>
            <Form.Control type="text" name="year" value={values.year} onChange={handleChange} />
          </Form.Group>

          <Button type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  );
};

export default App;
