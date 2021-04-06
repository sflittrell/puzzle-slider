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
      // indexOfBlank: 15,

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
        currentPosition: i,
        // winPosition: i,
        index: i, // is this needed?
        blank: blank1,
      }
      // console.log(tile)
      board.push(tile)
      // console.log(board)
    }
    this.setState({
      tileArr: board,
    })
  }

  randomNum() {
    let num = Math.floor(Math.random() * (this.state.gridWidth * this.state.gridWidth));
    return num;
  }

  shuffle() {
    let arrCopy = [...this.state.tileArr];
    // console.log(arrCopy)
    // a loop that performs a set number of random tile clicks
    for (let j = 0; j < 2; j++) {
      let blankIndex = arrCopy.findIndex((tile) => tile.blank)
      // console.log(blankIndex)
      let index = this.randomNum();
      // console.log({index})

      // checks to see if the tile can be clicked
      let canSwitch = false;
      let gW = this.state.gridWidth
      if (Math.floor(blankIndex / gW) === Math.floor(index / gW) && (Math.abs((blankIndex % gW) - (index % gW)) === 1)) {
        canSwitch = true
      }
      if ((blankIndex % gW) === (index % gW) && (Math.abs(Math.floor(blankIndex / gW) - Math.floor(index / gW)) === 1)) {
        canSwitch = true
      }

      // switches tiles
      if (canSwitch) {
        let temp = arrCopy[blankIndex].currentPosition
        arrCopy[blankIndex].currentPosition = arrCopy[index].currentPosition
        arrCopy[index].currentPosition = temp;
        arrCopy[index].blank = true;
        arrCopy[blankIndex].blank = false;
      } else {
        j--
      }
    }

    console.log(this.state)
    this.setState({
      tileArr: arrCopy,
      // indexOfBlank: blankIndex
    })
  }

  canSwitch(i) {
    let canSwitch = false;
    let gW = this.state.gridWidth
    let indexOfBlank = this.state.tileArr.findIndex((tile) => tile.blank)
    // console.log('index of blank', indexOfBlank)
    // console.log('index of clicked', i)
    if (Math.floor(indexOfBlank / gW) === Math.floor(i / gW) && (Math.abs((indexOfBlank % gW) - (i % gW)) === 1)) {
      canSwitch = true
    }

    if ((indexOfBlank % gW) === (i % gW) && (Math.abs(Math.floor(indexOfBlank / gW) - Math.floor(i / gW)) === 1)) {
      canSwitch = true
    }
    // console.log('can switch', canSwitch)
    return canSwitch
  }

  switch(index) {
    let blankIndex = this.state.tileArr.findIndex((tile) => tile.blank)
    let arrCopy = [...this.state.tileArr];
    // let arrCopy = this.state.tileArr.map(obj => { return { ...obj } })
    // console.log(arrCopy)
    // console.log('blank Index', blankIndex)
    let temp = arrCopy[blankIndex].currentPosition
    arrCopy[blankIndex].currentPosition = arrCopy[index].currentPosition
    arrCopy[index].currentPosition = temp;
    arrCopy[index].blank = true;
    arrCopy[blankIndex].blank = false;

    console.log(this.state)
    this.checkWin()
    console.log(this.state)


    this.setState({
      tileArr: arrCopy,
      // indexOfBlank: index
    })
  }

  checkWin() {
    console.log("win check")
    let win = false;
    let tile = this.state.tileArr
    for (let j = 0; j < tile.length; j++) {
      if (tile[j].currentPosition === tile[j].index) {
        win = true
      } else {
        win = false
      }
    }
    this.setState ({
          win: win
        })
  }


  render() {

    return (
      <div className="App container text-center" >
        <h1>Puzzle Slider</h1>
        {this.state.win ? <h2>"You Win"</h2> : null}
        <div className="row" style={{ width: "400px", height: "400px" }}>
          {this.state.tileArr.map((tile, index) =>
            <Tile
              tile={tile}
              key={index}
              switch={this.switch}
              canSwitch={this.canSwitch}
              gW={this.state.gridWidth}
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
