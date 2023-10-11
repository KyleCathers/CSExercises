let isOnBoard = (x, y) => {
    return ((x > 7) || (x < 0) || (y > 7) || (y < 1)) ? false : true;
}

// start position, end position

let moves = [[1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]];

// function to move based on moves array

// function knightmoves, tracks current position

// start at start position
// recursively try all positions as long as they are on the board, ensure you dont move backwards to last square
// if the new move is the target position, done, console.log all moves up the call stack