import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  state = { cards: [] };

  setAppData = (data) => {

    this.setState((prevState) => ({
      cards: prevState.cards.concat(data)
    }));

  }

  render() {
    return (
      <div className="App">
        <Form setData={this.setAppData} />
        <CardList cards={this.state.cards} />
      </div>
    );
  }
}


const Card = (props) => {

  return (
    <div style={{ margin: '1em', border: '1px solid burlywood', width: '400px' }}>
      <img width="75" height="75" alt="img" src={props.avatar_url} />
      <div style={{ display: 'inline-block', marginLeft: 10, fontSize: '25px', fontWeight: 'bold', color: 'red' }}>
        {props.name}
      </div>
      <div style={{ fontSize: '9px' }}>
        {props.company}
      </div>

    </div>
  );
}

class Form extends Component {

  state = { username: '' };
  handleClick = (event) => {
    event.preventDefault();
    axios.get(`https://api.github.com/users/${this.state.username}`)
      .then(response => {
        this.props.setData(response.data);
        this.setState({ username: '' });
      });
  }
  render() {
    return (
      <form style={{ width: "600px" }} onSubmit={this.handleClick}>
        <input type="text" required placeholder="Enter Github username" value={this.state.username}
          onChange={(event) => { this.setState({ username: event.target.value }) }} />
        <button type="submit" >Add Card</button>
      </form>
    );
  }
}

const CardList = (props) => {
  return (
    <div>
      {props.cards.map(card => <Card key={card.id} {...card} />)}
    </div>
  );
}


export default App;
