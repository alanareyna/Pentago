// function to deal with clicking a cell
const click_on_cell_action = (clickRowIdx, clickColIdx) => {
    console.log("rowIdx: ", clickRowIdx, "colIdx: ", clickColIdx)
    return{
        type: "CELL_CLICKED",
        rowIdx: clickRowIdx,
        colIdx: clickColIdx
    }
}

// function to deal with reset of the board
const reset_action = () => {
    return {
        type: "RESET"
    }
}

const click_on_right_rotation = (clickRowIdx, clickColIdx) => {
    console.log("right rotate x: ", clickRowIdx, "rotate y: ", clickColIdx)
    return{
        type: "RIGHT_ROTATE_CLICKED",
        rowIdx: clickRowIdx,
        colIdx: clickColIdx
    }
}

const click_on_left_rotation = (clickRowIdx, clickColIdx) => {
    console.log("left rotate x: ", clickRowIdx, "rotate y: ", clickColIdx)
    return {
        type: "LEFT_ROTATE_CLICKED",
        rowIdx: clickRowIdx,
        colIdx: clickColIdx
    }
}

export {
    click_on_cell_action,
    reset_action,
    click_on_right_rotation,
    click_on_left_rotation
};