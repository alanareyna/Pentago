import {NUM_ROWS, NUM_COLUMNS } from "./constants";
import doWeHaveAWinner from "./doWeHaveAWinner";

const advanceColor = (color) => color === 'white' ? 'black' : 'white';

function createInitialState() {
    let board = Array(NUM_ROWS).fill(Array(NUM_COLUMNS).fill({color: "#D2B48C", isOccupied: false}));
    board.map((row, rowIdx) => row.map( (col, colIdx) => {
        return {...board[rowIdx][colIdx], row: rowIdx, column: colIdx }
    }));

    return {
        board,
        haveAWinner: false,
        nextColor: 'white',
        hasRotated: true
    };
}

function integrateClick(state, rowIdx, colIdx) {

    console.log("rowIdx: ", rowIdx, " colIdx: ", colIdx);

    let board = state.board;
    let affectedRow = board[rowIdx].slice();
    affectedRow[colIdx] = {
        ...affectedRow[colIdx],
        color: state.nextColor,
        isOccupied: true
    };
    console.log("affected row and col: ", affectedRow)

    let newBoard = board.slice();
    newBoard[rowIdx] = affectedRow;
    const activeColor = state.nextColor;

    let newState = {
        ...state,
        board: newBoard,
        hasRotated: false

        // availableCellIndex: availableIndex,
        //nextColor: advanceColor(activeColor)
    };

    if (doWeHaveAWinner(rowIdx, colIdx, activeColor, board) ) {
        newState = {
            ...newState,
            haveAWinner: true,
            winnerColor: activeColor
        };
    }
    return newState;
}

function LeftRotation(state, rowIdx, colIdx)
{
    console.log("clicked left rotation button")
    let board = state.board;
    let newSubGrid = board.slice();
    let affectedRowOne = board[rowIdx].slice();

    // check first row of 3x3 grid
    for (let i = 0; i < 3; i++)
    {
        affectedRowOne[colIdx + i] = {
            ...state.board[rowIdx + i][colIdx + 2]
        }
    }
    // check 2nd row of 3x3 grid
    let affectedRowTwo = board[rowIdx+1].slice()
    // set first element of second row
    affectedRowTwo[colIdx] = {
        ...state.board[rowIdx][colIdx + 1]
    }
    // ignore second element of second row, this piece does not change when rotated
    // set the last element of second row
    affectedRowTwo[colIdx+ 2] = {
        ...state.board[rowIdx + 2][colIdx + 1]
    }
    //check 3rd row of 3x3 grid
    let affectedRowThree = board[rowIdx+2].slice()
    for(let i = 0; i < 3; i++)
    {
        affectedRowThree[colIdx + i] = {
            ...state.board[rowIdx + i][colIdx]
        }
    }
    newSubGrid[rowIdx] = affectedRowOne;
    newSubGrid[rowIdx + 1] = affectedRowTwo;
    newSubGrid[rowIdx + 2] = affectedRowThree;

    const activeColor = state.nextColor;
    let newState = {
        ...state,
        board: newSubGrid,
        nextColor: advanceColor(activeColor),
        hasRotated: true
    };
    console.log("next color for old state:", state.nextColor)
    console.log("next color new state:", newState.nextColor)

    // check if we have a winner based on the changes we made to the subgrid
    // FAVOR THE PLAYER THAT MADE THE ROTATION: EVALUATE THE CURRENT PLAYER FIRST
    for(let i = rowIdx; i < rowIdx + 3; i++)
    {
        for (let j = colIdx; j < colIdx + 3; j++)
        {
            if (newState.board[i][j].color == activeColor)
            {
                if (doWeHaveAWinner(i, j, activeColor, newSubGrid))
                {
                    newState = {
                        ...newState,
                        haveAWinner: true,
                        winnerColor: activeColor
                    };
                    return newState;
                }
            }
        }
    }

    // NOW CHECK IF THE OTHER PLAYER GOT A WIN
    for(let k = rowIdx; k < rowIdx + 3; k++)
    {
        for (let l = colIdx; l < colIdx + 3; l++)
        {
            if (newState.board[k][l].color == advanceColor(activeColor))
            {
                if (doWeHaveAWinner(k, l, advanceColor(activeColor), newSubGrid))
                {
                    newState = {
                        ...newState,
                        haveAWinner: true,
                        winnerColor: advanceColor(activeColor)
                    };
                    return newState;
                }
            }
        }
    }

    return newState;

}

function RightRotation(state, rowIdx, colIdx)
{
    let board = state.board;
    let newSubGrid = board.slice();
    let affectedRowOne = board[rowIdx].slice();

    // check first row of 3x3 grid
    for (let i = 0; i < 3; i++)
    {
        affectedRowOne[colIdx + i] = {
            ...state.board[rowIdx + 2 - i][colIdx]
        }
    }
    // check 2nd row of 3x3 grid
    let affectedRowTwo = board[rowIdx+1].slice()
    // set first element of second row
    affectedRowTwo[colIdx] = {
        ...state.board[rowIdx + 2][colIdx + 1]
    }
    // ignore second element of second row, this piece does not change when rotated
    // set the last element of second row
    affectedRowTwo[colIdx+ 2] = {
        ...state.board[rowIdx][colIdx + 1]
    }
    //check 3rd row of 3x3 grid
    let affectedRowThree = board[rowIdx+2].slice()
    for(let i = 0; i < 3; i++)
    {
        affectedRowThree[colIdx + i] = {
            ...state.board[rowIdx + 2 - i][colIdx + 2]
        }
    }
    newSubGrid[rowIdx] = affectedRowOne;
    newSubGrid[rowIdx + 1] = affectedRowTwo;
    newSubGrid[rowIdx + 2] = affectedRowThree;

    const activeColor = state.nextColor;
    let newState = {
        ...state,
        board: newSubGrid,
        nextColor: advanceColor(activeColor),
        hasRotated: true
    };

    console.log("next color for old state:", state.nextColor)
    console.log("next color new state:", newState.nextColor)

    return newState;
}

function reducers(state, action)
{
    if (state === undefined)
        return state;
    if (action.type === 'RESET')
    {
        return createInitialState();
    }
    else if (action.type === 'CELL_CLICKED')
    {
        if (state.haveAWinner)
            return state;
        if (state.hasRotated === true)
            return integrateClick(state, action.rowIdx, action.colIdx);
        else if (state.hasRotated === false) {
            return state;
        }
        if (state.board[action.rowIdx][action.colIdx].isOccupied)
            return state;
    }
    else if (action.type === 'RIGHT_ROTATE_CLICKED')
    {
        return RightRotation(state, action.rowIdx, action.colIdx)
    }
    else if (action.type === 'LEFT_ROTATE_CLICKED')
    {
        return LeftRotation(state, action.rowIdx, action.colIdx)
    }
    return state;
}

export {
    reducers,
    createInitialState,
    RightRotation,
    LeftRotation
};
