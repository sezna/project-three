import React, { useEffect, useState } from "react";
import Jumbotron from "../Jumbotron";
import DeleteBtn from "../DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../Grid";
import { List, ListItem } from "../List";
import { Input, TextArea, FormBtn } from "../Form";

function Books() {
  // Setting our component's initial state
  const [books, setBooks] = useState([]);

  // update the initial state to provide values for
  // the controls in the form (use empty strings)
  const [formObject, setFormObject] = useState({});

  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks();
  }, []);

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks()
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  }

  function handleInputChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    setFormObject({ ...formObject, [name]: value });
    // add code to control the components here
  }

  function handleFormSubmit(event) {
    // add code here to post a new book to the api
  }

  function deleteBook() {
    // add code here to remove a book using API
  }

  return (
    <Container fluid>
      <Row>
        <Col size="md-6">
          <Jumbotron>
            <h1>Search For Developers</h1>
          </Jumbotron>
          <form>
            {/* inputs should be updated to be controlled inputs */}
            <Input
              onChange={handleInputChange}
              name="title"
              value={formObject.title}
              placeholder="Title (required)"
            />
            <Input
              onChange={handleInputChange}
              name="author"
              value={formObject.author}
              placeholder="Author (required)"
            />
            <TextArea
              onChange={handleInputChange}
              name="synopsis"
              value={formObject.name}
              placeholder="Synopsis (Optional)"
            />
            <FormBtn
              disabled={!(formObject.author && formObject.title)}
              onClick={handleFormSubmit}
            >
              Submit Book
            </FormBtn>
          </form>
        </Col>
        <Col size="md-6 sm-12">
          <Jumbotron>
            <h1>Search For Jobs</h1>
          </Jumbotron>
          {books.length ? (
            <List>
              {books.map((book) => {
                return (
                  <ListItem key={book._id}>
                    <a href={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </a>
                    <DeleteBtn onClick={() => deleteBook(book._id)} />
                  </ListItem>
                );
              })}
            </List>
          ) : (
            <h3>No Results to Display</h3>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Books;
