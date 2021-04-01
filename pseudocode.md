# Puzzle Slider App

Components:

    App: class item

        State:
            array that holds the tiles
            win - default to false //changes when the win condition is met (lock tiles when user wins)
            score - how many times the puzzle has been solved (stretch goal)
            blank position - the current position of the blank space (3, 3)


        Methods:
            shuffle - runs the on click/switch function a number (500) times

            switch - switches the clicked tile with the blank tile
                needs to check to see if it is a valid move

                setState, switching the row, column and image of blank space with that of the clicked tile, and sets the blankPosition state to the row and column of the clicked tile

                    function switch(index) {
                    let row = array[index].row
                    let column = array[index].column
                    setState({ 
                        (array[index].row, array[index].column) row and column of clicked tile
                        array[15].row = row;
                        array[15].column = column
                        array[index].row = array[15].row
                        array[index].column = array[15].column
                    })
                    }


            canSwitch - check to see if the tile can be switched (helper function for onClick)
                    let canSwap = false
                    if tiles row = blank position row && if tile column is + or - 1 of blank position column tile can be switched
                    if (clickedTile.row === blankPosition.row) {
                        if (Math.abs( blankPosition.col - clickedTile.col) == 1) {
                            canSwap = true
                        }
                    }

                    if tiles column = blank position column && if tile row is + or - 1 of blank position row tile can be switched
                    if (clickedTile.column === blankPosition.column) {
                        if (Math.abs( blankPosition.row - clickedTile.row) == 1) {
                            canSwap = true
                        }
                    }





            checkWin (helper function for the switch method) - check to see if win condition is met, looping through the array and if so setState of win to true
                win condition - if the row and column of each tile = the tiles winPosition

                a loop that goes through the array and checks to see if the row and column of each tile = the win position of that tile

                let winValue = false
                for (let i = 0; i < array.length; i++) {
                    if (array[i].row === array[i].winPosition[0] && array[i].column === array[i].winPosition[1]) {
                        winValue = true
                    }
                    if (win = true) setState of win to true and set state of all objects so clickable is set to false
                }

            generate tile - function that creates the tile and gives it some properties using a loop/map that runs the number of tiles needed and sets the position of the blank space

                    row - the current row of the tile
                    column - the current column of the tile
                    winPosition - is tiles position on creation of tile (row and column)
                    image - ???
                    blank - default to false (on last loop run set to true)
                    clickable - default to true (tells if the button can be clicked or not, changing on win condition)
                

                for loop where i = 0, go through until i < square of board size (4x4), i++
                    let tile = {
                    row = Math.floor(i / board size (4))
                    column = i % board size (4)
                    winPosition = [row, column]
                    blank = if (!i = square of board size (4X4) - 1) {
                            blank = false
                            } else blank = true
                    setState of array, putting the tile into the array
                    }
                    setState of blankPosition to the row = board size -1, column = board size -1 (3, 3)



        Render:

            Header - title of the App
            Instructions - tells the user how to play
            board - the tiles in a grid (4x4) (runs the generate tile method)
            shuffle/reset button - resets the game (runs shuffle method)
            win - render something when the win condition is met telling the user that they have won (maybe have a new game button)


    Tile: function item

        Methods:


        Render:
            button
                onClick - runs the switch method if clickable is set to true from App and then runs the checkWin function
                image - one (100px by 100px part of the 400px by 400px) image




