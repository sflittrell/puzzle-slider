import React from 'react';
import './App.css';
import Tile from './Tile'

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      gridWidth: 4,
      tileArr: [],
      win: false,
      indexOfBlank: 15,

    }
    this.switch = this.switch.bind(this);
    this.canSwitch = this.canSwitch.bind(this);
    this.shuffle = this.shuffle.bind(this);
  }

  componentDidMount() {
    this.generateTile(this.state.gridWidth);
  }

  generateTile(gW) { //gridWidth
    let board = [];
    for (let i = 0; i < gW * gW; i++) {
      let blank1 = false
      if (i === gW * gW - 1) {
        blank1 = true
      }
      let tile = {
        // row: Math.floor(i / gW),
        // column: i % gW,
        currentPosition: i,
        winPosition: i,
        index: i, // is this needed?
        blank: blank1,
        // image: i,
        gW: this.state.gridWidth
      }
      // console.log(tile)
      board.push(tile)
      // console.log(board)
    }
    this.setState({
      tileArr: board,
      // blankPosition: [gW - 1, gW - 1]
    })
  }

  randomNum() {
    let num = Math.floor(Math.random() * (this.state.gridWidth * this.state.gridWidth + 1));
    return num;
  }

  shuffle() {
    for (let j = 0; j < 10; j++) {
      console.log('this is j', j)
      let num = Math.floor(Math.random() * (this.state.gridWidth * this.state.gridWidth + 1));
      console.log('random number', num)
      if (this.canSwitch(num)) {
        this.switch(num);
      } else {
        j--
      }
    }
  }

  canSwitch(i) {
    let canSwitch = false;
    let gW = this.state.gridWidth
    let indexOfBlank = this.state.indexOfBlank
    // console.log('index of blank', indexOfBlank)
    console.log('index of clicked', i)
    if (Math.floor(indexOfBlank / gW) === Math.floor(i / gW) && (Math.abs((indexOfBlank % gW) - (i % gW)) === 1)) {
      canSwitch = true
    }

    if ((indexOfBlank % gW) === (i % gW) && (Math.abs(Math.floor(indexOfBlank / gW) - Math.floor(i / gW)) === 1)) {
      canSwitch = true
    }
    console.log('can switch', canSwitch)
    return canSwitch
  }

  switch(index) {
    // console.log(this.state.indexOfBlank)
    let blankIndex = this.state.tileArr.findIndex((tile) => tile.blank)
    // console.log(blankIndex)
    // console.log('click')
    // let arrCopy = [...this.state.tileArr];
    let arrCopy = this.state.tileArr.map(obj => { return { ...obj } })
    console.log(arrCopy)
    console.log('blank Index', blankIndex)
    arrCopy[blankIndex].currentPosition = arrCopy[index].currentPosition
    arrCopy[index].currentPosition = blankIndex;
    arrCopy[index].blank = true;
    arrCopy[blankIndex].blank = false;

    this.setState({
      tileArr: arrCopy,
      indexOfBlank: index
    })
  }

  checkWin() {

  }

  render() {

    return (
      <div className="App container text-center" >
        <h1>Puzzle Slider</h1>
        <div className="row">
          {this.state.tileArr.map((tile, index) =>
            <Tile
              tile={tile}
              key={index}
              switch={this.switch}
              canSwitch={this.canSwitch}
            />
          )}
        </div>
        <button className="mt-5" onClick={this.shuffle}>
          Shuffle
        </button>
      </div>
    );
  }
}

export default App;
