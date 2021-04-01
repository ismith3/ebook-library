import React from 'react';
import Header from './components/header/Header.js';
import './App.css';

class App extends React.Component {
  state = {
    data: null
  };

  getBooks = async() => {
    const response = await fetch('http://localhost:5000/books');
    const body = await response.json();

    if(response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  }

  componentDidMount() {
    this.getBooks()
      .then(res => this.setState({ data: res.books }))
      .catch(err => console.error(err))
  }

  render() {
    let bookList;

    if(this.state.data) {
      bookList = this.state.data.map((book) => {
        return <li>{book}</li>
      })
    }

    return (
      <>
      <Header></Header>
      <ol>
        {bookList}
      </ol>
      </>
    )
  }
}

export default App;
