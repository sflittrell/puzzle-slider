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

  blankIndex() {
    let blankIndex = this.state.tileArr.findIndex((tile) => tile.blank)
    return blankIndex
  }

  canSwitch(i, blankIndex) {
    let canSwitch = false;
    let gW = this.state.gridWidth
    // let blankIndex = this.state.tileArr.findIndex((tile) => tile.blank)
    if (Math.floor(blankIndex / gW) === Math.floor(i / gW) && (Math.abs((blankIndex % gW) - (i % gW)) === 1)) {
      canSwitch = true
    }

    if ((blankIndex % gW) === (i % gW) && (Math.abs(Math.floor(blankIndex / gW) - Math.floor(i / gW)) === 1)) {
      canSwitch = true
    }
    // console.log('can switch', canSwitch)
    return canSwitch
  }

  switch(index) {
    if(this.canSwitch(index, this.blankIndex())) {
    let blankIndex = this.blankIndex()
    let arrCopy = [...this.state.tileArr];
    let temp = arrCopy[blankIndex].currentPosition
    arrCopy[blankIndex].currentPosition = arrCopy[index].currentPosition
    arrCopy[index].currentPosition = temp;
    arrCopy[index].blank = true;
    arrCopy[blankIndex].blank = false;

    this.checkWin()


    this.setState({
      tileArr: arrCopy,
    })
  }
}

  checkWin() {
    console.log("win check")
    let win = false;
    let tile = this.state.tileArr
    for (let j = 0; j < tile.length; j++) {
      if (tile[j].currentPosition !== tile[j].index) {
        win = false;
        break
      } else {
        win = true
      }
    }
    this.setState ({
          win: win
        })
  }

  shuffle() {
    let arrCopy = [...this.state.tileArr];
    // console.log(arrCopy)
    // a loop that performs a set number of random tile clicks
    for (let j = 0; j < 100; j++) {
      let blankIndex = arrCopy.findIndex((tile) => tile.blank)
      // console.log(blankIndex)
      let index = this.randomNum();

      if (this.canSwitch(index, arrCopy.findIndex((tile) => tile.blank))) {
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
      win: false
      // indexOfBlank: blankIndex
    })
  }


  render() {

    return (
      <div className="App container text-center" >
        <h1 className="fw-bold">Puzzle Slider</h1>
        <h6><em>Press Shuffle to start or play again.</em></h6>
        {this.state.win ? <h2 className="text-danger">"You Win"</h2> : null}
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
