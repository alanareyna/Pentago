import {Fragment, useReducer} from 'react';
import { Typography } from "@mui/material"
import { click_on_cell_action, reset_action, click_on_left_rotation, click_on_right_rotation } from "./actions";
import {createInitialState, reducers, LeftRotation, RightRotation } from "./reducers";
import {Stack} from "@mui/system";
import Grid from "@mui/system/Unstable_Grid";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import IconButton from '@mui/material/IconButton';


const config = {
    num_rows: 6,
    num_columns: 6,
    h_gap:7,
    cell_width: 60,
    cell_height: 60,
    subgrids_row_col: 3
}

// top rotation buttons function
function TopRotationButtons(props) {
    const {dispatch} = props;
    return (
        <Fragment>
            <Grid style={{
                backgroundColor: "white",
                borderColor: "black",
                border: 5,
                borderRadius: '50%',
                justifyContent: 'center'
            }}>
                <IconButton onClick={() => dispatch(click_on_left_rotation(0,0))}>
                    <UndoIcon />
                </IconButton>
            </Grid>
            <Grid style={{
                backgroundColor: "white",
                borderColor: "black",
                border: 5,
                borderRadius: '50%',
                marginLeft: 'auto'
            }}>
                <IconButton onClick={() => dispatch(click_on_right_rotation(0,0))}>
                    <RedoIcon />
                </IconButton>
            </Grid>
            <Grid style={{
                marginRight: 'auto',
                marginLeft: 'auto'
            }}>

            </Grid>

            <Grid style={{
                backgroundColor: "white",
                borderColor: "black",
                border: 5,
                borderRadius: '50%',
                marginRight: 'auto',
                justifyContent: 'center'
            }}>
                <IconButton onClick={() => dispatch(click_on_left_rotation(0,3))}>
                    <UndoIcon />
                </IconButton>
            </Grid>
            <Grid style={{
                backgroundColor: "white",
                borderColor: "black",
                border: 5,
                borderRadius: '50%',
                marginRight: 'auto'
            }}>
                <IconButton onClick={() => dispatch(click_on_right_rotation(0,3))}>
                    <RedoIcon />
                </IconButton>
            </Grid>
        </Fragment>
    )
}

// bottom rotation buttons function
function BottomRotationButtons(props) {
    const {dispatch} = props;
    return (
        <Fragment>
            <Grid style={{
                backgroundColor: "white",
                borderColor: "black",
                border: 5,
                borderRadius: '50%',
                justifyContent: 'center'
            }}>
                <IconButton onClick={() => dispatch(click_on_left_rotation(3,0))}>
                    <UndoIcon/>
                </IconButton>
            </Grid>
            <Grid style={{
                backgroundColor: "white",
                borderColor: "black",
                border: 5,
                borderRadius: '50%',
                marginLeft: 'auto'
            }}>
                <IconButton onClick={() => dispatch(click_on_right_rotation(3,0))}>
                    <RedoIcon/>
                </IconButton>
            </Grid>
            <Grid style={{
                marginRight: 'auto',
                marginLeft: 'auto'
            }}>

            </Grid>

            <Grid style={{
                backgroundColor: "white",
                borderColor: "black",
                border: 5,
                borderRadius: '50%',
                marginRight: 'auto',
                justifyContent: 'center'
            }}>
                <IconButton onClick={() => dispatch(click_on_left_rotation(3,3))}>
                    <UndoIcon />
                </IconButton>
            </Grid>
            <Grid style={{
                backgroundColor: "white",
                borderColor: "black",
                border: 5,
                borderRadius: '50%',
                marginRight: 'auto'
            }}>
                <IconButton onClick={() => dispatch(click_on_right_rotation(3,3))}>
                    <RedoIcon />
                </IconButton>
            </Grid>
        </Fragment>
    )
}

// function SubGrids(props)
// {
//     const { dispatch, row } = props;
//
//
// }

// Cell function: creates the cells for the board
function Cell(props)
{
    const { dispatch, cell, colIdx, rowIdx } = props;
    return (
        <Box sx={{
            width: config.cell_width,
            height: config.cell_height,
            backgroundColor: cell['color'],
            border: 1,
            borderColor: 'black',
            borderRadius: '50%'
        }}
             onClick={() => dispatch(click_on_cell_action(rowIdx, colIdx))}
        />
    );
}

// Row function: creates a row for the board
function Row(props)
{
    const {cell, dispatch } = props;

    return (
        <Grid container
              conlumns={config.num_columns}
              sx={{
                  display: 'flex',
                  direction: 'flex-row',
                  alignContent: 'space-between',
                  justifyContent: 'space-between'
              }}

        >
            {
                props.row.map((cell, idx) =>
                    <Grid item
                          key={idx}
                    >
                        <Cell key={idx}
                              cell={cell}
                              colIdx={idx}
                              rowIdx={props.rowIdx}
                              dispatch={dispatch}
                        />
                    </Grid>)
            }
        </Grid>
    )
}


// TopMessage: creates and prints the top message where we will indicate whose turn it is
function TopMessage(props)
{
    const {haveAWinner, winnerColor} = props;

    const playerColor = props.nextColor.charAt(0).toUpperCase() + props.nextColor.slice(1);
    const wColor = winnerColor ? winnerColor.charAt(0).toUpperCase() + winnerColor.slice(1) : null;

    const firstMessage = () => haveAWinner ? `${wColor} Wins. Game Over` : `${playerColor} plays next`;

    return (
        <Stack width='100%'>
            <Typography variant='h4' textAlign='center' fontWeight='bold' lineHeight={2}>
                {
                    firstMessage()
                }
            </Typography>
            <Button width='100%'
                    sx={{
                        opacity: haveAWinner ? 1 : 0
                    }}
                    onClick={() => props.dispatch(reset_action())}>Reset?
            </Button>
        </Stack>
    )
};

export default function Board(props)
{
    const [state, dispatch] = useReducer(reducers, undefined, createInitialState);
    const {nextColor, winnerColor, haveAWinner, board} = state;

    const calcWidth = () => config.num_columns * config.cell_width +
        (config.num_columns - 1) * config.h_gap

    return (
        <Fragment>
            <Grid>
                <TopMessage nextColor={nextColor}
                            winnerColor={winnerColor}
                            haveAWinner={haveAWinner}
                            dispatch={dispatch}
                />
            </Grid>

            <Grid container margin='auto'
                  columns={1}
                  sx={{
                      width: calcWidth(),
                      display: 'flex',
                      direction: 'flex-column',
                      justifyContent: 'center',
                      mt: 5,
                      backgroundColor: "#A0522D",
                      borderRadius: "10px",
                  }}
                  >

                <TopRotationButtons dispatch={dispatch} />

                <Grid container margin='auto'
                    columns={6}
                      sx={{
                    border: 1,
                    mt: 1,
                    borderWidth: 3,
                    borderRadius: "5px",
                    mb: 1
                }}>

                {
                    board.map((row, rowIdx) => (
                        <Grid item
                              key={rowIdx}
                              width='100%'
                              sx={{mb: 1}}
                              xs={1}
                              style={{
                                  backgroundColor: "#A0522D",
                                  borderColor: "black",
                                  border: 5
                              }}
                        >
                            <Row key={rowIdx}
                                 row={row}
                                 rowIdx={rowIdx}
                                 dispatch={dispatch}

                            />

                        </Grid>))
                }

                </Grid>
                <BottomRotationButtons dispatch={dispatch} />
            </Grid>
        </Fragment>
    );

}