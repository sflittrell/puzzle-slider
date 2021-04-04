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
  }

  componentDidMount() {
    this.generateTile(this.state.gridWidth)
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
        image: i
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

  shuffle() {

  }

  canSwitch(i) {
    let canSwitch = false;
    let gW = this.state.gridWidth
    let indexOfBlank = this.state.indexOfBlank
    console.log('index of blank', indexOfBlank)
    console.log('index of clicked', i)
    if (Math.floor(indexOfBlank / gW) == Math.floor(i / gW) && (Math.abs((indexOfBlank % gW) - (i % gW)) == 1)) {
      canSwitch = true
    }

    if ((indexOfBlank % gW) == (i % gW) && (Math.abs(Math.floor(indexOfBlank / gW) - Math.floor(i / gW)) == 1)) {
      canSwitch = true
    }
    console.log('can switch', canSwitch)
    return canSwitch
  }

  switch(tilePosition, index) {
    // console.log(this.state.indexOfBlank)
    let blankIndex = this.state.tileArr.findIndex((tile) => tile.blank)
    // console.log(blankIndex)
    // console.log('click')
    let arrCopy = this.state.tileArr;
    let image = arrCopy[blankIndex].image
    arrCopy[blankIndex].currentPosition = tilePosition
    arrCopy[index].currentPosition = blankIndex;
    arrCopy[blankIndex].image = arrCopy[index].image;
    arrCopy[index].image = image;
    arrCopy[index].blank = true;
    arrCopy[blankIndex].blank = false;
    

    // let row = arrCopy[index].row
    // let column = arrCopy[index].column
    // let image = arrCopy[index].image

    // arrCopy[index].row = arrCopy[blankIndex].row;
    // arrCopy[index].column = arrCopy[blankIndex].column;
    // arrCopy[blankIndex].row = row;
    // arrCopy[blankIndex].column = column;
    // arrCopy[index].image = arrCopy[blankIndex].image;
    // arrCopy[blankIndex].image = image;
    // arrCopy[index].blank = true;
    // arrCopy[blankIndex].blank = false;


    this.setState({
      tileArr: arrCopy,
      indexOfBlank: index
    })

    // let blankRow = this.tileArray[15].row
    // let blankColumn = this.tileArray[15].column
    // let clickedRow = this.tileArr[index].row
    // let clickedColumn = this.tileArr[index].column
    // setState({
    //   tileArr: this.state.tileArr.map(tile => {
    //     if (tile.index === index) {
    //     tile.row = clickedRow;
    //     array[index].column = clickedColumn;
    //     // return tile

    //     if(tile)
    //     tile.row = blankRow;
    //     tile.column = blankColumn;
    //     }
    //     return
    //   })
    // })
  }

  checkWin() {

    }

  render() {

      return(
      <div className = "App container text-center" >
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
        <button className="mt-5">
            Shuffle
        </button>
      </div>
    );
  }
}

export default App;
