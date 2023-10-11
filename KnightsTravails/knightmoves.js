// start position, end position

// function to move based on moves array

// function knightmoves, tracks current position

// start at start position
// recursively try all positions as long as they are on the board, ensure you dont move backwards to last square
// if the new move is the target position, done, console.log all moves up the call stack

let node = (pos, path = []) => {
    return { pos, path };
}
    

let knightMoves = ([x, y], [a, b]) => {
    // start = [x, y]
    // end = [a, b]

    let makeMove = (start, move)  => {
        return [start[0] + move[0], start[1] + move[1]];
    }

    let isOnBoard = pos => {
        let x = pos[0];
        let y = pos[1];

        return ((x > 7) || (x < 0) || (y > 7) || (y < 0)) ? false : true;
    }

    let legalMoves = [[2, 1], [1, 2], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]];

    if (!isOnBoard([x, y]) || !isOnBoard([x, y])) {
        console.log(`Error: Illegal position!`)
        return;
    }

    let run = () => {

        let queue = [node([x, y], [ [x, y] ])];

        let currentNode = queue.shift();

        while((currentNode.pos[0] !== a) || (currentNode.pos[1] !== b)) {   // not found yet

            for(let i = 0; i < 8; i++) {
                let moveResult = makeMove(currentNode.pos, legalMoves[i]);
    
                // make nodes out of each move and add to queue for BFS
                if (isOnBoard(moveResult)) {
                    let newChildNode = node(moveResult, currentNode.path.concat([moveResult]));
                    queue.push(newChildNode);
                }
            }
    
            // make nodes of of each sub child in a BFS manner
            currentNode = queue.shift();
        }
    

        console.log(`Target found in ${currentNode.path.length} moves...`);

        let trail = "Path: ";

        currentNode.path.forEach(move => {
            let rank = move[0];
            let file = move[1] + 1;

            if (rank === 0) {
                rank = 'a'
            } else if (rank === 1) {
                rank = 'b'
            } else if (rank === 2) {
                rank = 'c'
            } else if (rank === 3) {
                rank = 'd'
            } else if (rank === 4) {
                rank = 'e'
            } else if (rank === 5) {
                rank = 'f'
            } else if (rank === 6) {
                rank = 'g'
            } else if (rank === 7) {
                rank = 'h'
            }

            trail += `[${rank}${file}] -> `
        })

        trail = trail.slice(0, -4)

        console.log(trail);
    }

    run();
}

knightMoves([7, 0], [0, 7]);