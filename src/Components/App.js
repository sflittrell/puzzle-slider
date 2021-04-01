import React from 'react';
import './App.css';
import Tile from './Tile'

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      tileArr: [],
      win: false,
    }

  }

  componentDidMount() {
    this.generateTile()
  }

  generateTile() {
    let board = [];
    for (let i = 0; i < 16; i++) {
      // let blank1 = false
      // if (i === this.state.boardSize - 1) {
      //   blank1 = true
      // }
      let tile = {
        row: Math.floor(i / 4),
        column: i % 4,
        winPosition: [Math.floor(i / 4), i % 4],
        // blank: blank1
      }
      // console.log(tile)
      board.push(tile)
      console.log(board)



    }
    this.setState({
      tileArr: board,
    })
  }

  shuffle() {

  }

  canSwitch() {

  }

  switch() {

  }

  checkWin() {

  }

  render() {

    return (
      <div className="App container text-center">
      <h1>Puzzle Slider</h1>
      <div className="row">
        {this.state.tileArr.map((tile, index) =>
          <Tile
            tile={tile} 
            key={index} 
          />
        )}
        </div>
        <button className="mt-5">
          Shuffle
        </button>
      </div>
    );
  }
}

export default App;
