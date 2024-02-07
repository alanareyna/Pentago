import { NUM_ROWS, NUM_COLUMNS } from "./constants";

const doWeHaveAWinnerThatIncludes = (rowIdx, colIdx, color, board) => {
    // check to see if we have 5 matching colors downward
    const doWeHaveAWinnerDownward = (rowIdx, colIdx) => {
        // an array of objects of row and column of matching colors
        let matchingCells = [{row: rowIdx, column: colIdx}];
        // increment rowIdx while doing nothing to column to check if we have matching colors downward
        rowIdx += 1;
        while(rowIdx < NUM_ROWS && board[rowIdx][colIdx]['color'] === color ){
            matchingCells.push({row: rowIdx, column: colIdx});
            rowIdx += 1;
        }
        // if the number of matchingCells is >= 5, then we have a winner downward
        return matchingCells.length >= 5 ? matchingCells : false;
    };

    const doWeHaveAWinnerUpward = (rowIdx, colIdx) => {
        let matchingCells = [{row: rowIdx, column: colIdx}];
        if (rowIdx > 0)
            rowIdx -= 1;

        while(rowIdx >= 0 && board[rowIdx][colIdx]['color'] === color){
            matchingCells.push({row: rowIdx, column: colIdx});
            rowIdx -= 1;
        }
        return matchingCells.length >= 5 ? matchingCells : false;
    }

    // check to see if we have 5 matching colors sideways
    const doWeHaveAWinnerSideways = (rowIdx, colIdx) => {
        let matchingCells = [{row: rowIdx, column: colIdx}];
        // create a new variable to keep track and decrement the left columns we need to check
        let leftColIdx = colIdx - 1;

        while(leftColIdx >= 0 && board[rowIdx][leftColIdx]['color'] === color ) {
            matchingCells.push({row: rowIdx, column: leftColIdx});
            leftColIdx -= 1;
        }
        // create a new variable to keep track and decrement the right columns we need to check
        let rightColIdx = colIdx + 1;

        while(rightColIdx < NUM_COLUMNS && board[rowIdx][rightColIdx]['color'] === color ) {
            matchingCells.push({row: rowIdx, column: rightColIdx});

            rightColIdx += 1;
        }
        return matchingCells.length >= 5 ? matchingCells : false;
    };

    // check to see if we have a winner on the right diagonal
    const dowWeHaveAWinnerOnRightDiagonal = (rowIdx, colIdx) => {
        let matchingCells = [{row: rowIdx, column: colIdx}];
        // create variables set to 1+ the row and column idx
        let downRowIdx = rowIdx + 1;
        let downColIdx = colIdx + 1;

        // must now check to see if row and col idx are less than the total row
        // and column size and that the color matches
        while (downRowIdx < NUM_ROWS && downColIdx < NUM_COLUMNS &&
        board[downRowIdx][downColIdx]['color'] === color) {
            matchingCells.push({row: downRowIdx, column: downColIdx});

            downRowIdx += 1;
            downColIdx += 1;

        }
        // create new variables that will store the row and column idx one below
        // the current row and column
        let upRowIdx = rowIdx - 1;
        let upColIdx = colIdx - 1;

        // check that the cell at row and column idx match the color while the rowIdx and colIdx
        // while there are still rows and columns above it
        while (upRowIdx >= 0 && upColIdx >= 0 &&
        board[upRowIdx][upColIdx]['color'] === color) {
            matchingCells.push({row: upRowIdx, column: upColIdx});
            upRowIdx -= 1;
            upColIdx -= 1;

        }
        return matchingCells.length >= 5 ? matchingCells : false;
    };

        // check to see if we have a winner on the left diagonal
        const dowWeHaveAWinnerOnLeftDiagonal = (rowIdx, colIdx) => {
            let matchingCells = [{row: rowIdx, column: colIdx}];

            // create new variables to store the idx of row one above the row we are at
            // and the column one below the column we are at
            let downRowIdx = rowIdx + 1;
            let downColIdx = colIdx - 1;

            // check to see that the color matches at the cell we are at as long as
            // the downRowIdx is less than the total rows but greater than 0
            while (downRowIdx < NUM_ROWS && downColIdx >= 0 &&
            board[downRowIdx][downColIdx]['color'] === color) {
                matchingCells.push({row: downRowIdx, column: downColIdx});
                downRowIdx += 1;
                downColIdx -= 1;

            }

            // create new variables to store the idx of the row one below the current row
            // and the column one above the current column
            let upRowIdx = rowIdx - 1;
            let upColIdx = colIdx + 1;

            // check to see that the cell color is matching while the rowIdx above the current row
            // is greater than 0 and the column above the current column is less than the total column number
            while (upRowIdx >= 0 && upColIdx < NUM_COLUMNS &&
            board[upRowIdx][upColIdx]['color'] === color) {
                matchingCells.push({row: upRowIdx, column: upColIdx});
                upRowIdx -= 1;
                upColIdx += 1;

            }
            return matchingCells.length >= 5 ? matchingCells : false;
        };

        return doWeHaveAWinnerDownward(rowIdx, colIdx) ||
            doWeHaveAWinnerSideways(rowIdx, colIdx) ||
            dowWeHaveAWinnerOnLeftDiagonal(rowIdx, colIdx) ||
            doWeHaveAWinnerUpward(rowIdx, colIdx) ||
            dowWeHaveAWinnerOnRightDiagonal(rowIdx, colIdx);

};

export default doWeHaveAWinnerThatIncludes;
