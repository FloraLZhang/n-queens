/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  //fix the variable solution
  // var solution = undefined; //fixme
  //initiate an emptyboard, useing the makeEmptyBoardMatrix, new Board
  var board = new Board({n: n});
  //iterate an array for the board,  put a rook on its own col
  for (var i = 0; i < n; i++) {
  //helper function to toggle a piece to a possible position i = 0
  board.togglePiece(i, i);
  }
  //increment the same rowIndex and colIndex i to put the next
  //assign the solution to the board.rows
  var solution = board.rows()
  //return solution

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme
  // if n is 0/1 ,there is only one way to arrange the rook
  if (n === 0 || n === 1) {
    return 1;
  }
  //return 1
  // maybe, call with window, maybe no
  solutionCount = n * window.countNRooksSolutions(n-1);
  // solutionCount = countNRooksSolutions(n * (n - 1))
  //recursively: n rooks can be arrange in n! factorial ways
  //for the first rook we have n choices to toggle it, for the next we have n-1 choices....
  //initiate a variable to hold the solutionCount result
  //return the solutionCount
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  //create a new board instance
  var board = new Board({n : n});
  var solution = board.rows();//fixme
  //create a helper function to store a copy of the Board
    // create a  variable to store the empty board
  // loop through copied array's rows and columns
    // to get each space of the board to get to the copied board.
    // return copyied array
  var makeCopyBoard = function () {
    var copy = [];
    for (var i = 0; i < n; i++) {
      copy[i] = [];
      for (var j = 0; j < n; j++) {
        copy[i][j] = board.get(i)[j]
      }
    }
    return copy;
  };

  var placeQueens = function(rowIndex) {
    if (rowIndex === n) {
      solution = makeCopyBoard();
      return true; // return true?
    }
    for (var i = 0; i < n; i++) {
      board.togglePiece(rowIndex, i);

       if (!board.hasAnyQueensConflicts()) {
        var result = placeQueens(rowIndex + 1);
       if (result) {
        return true;
       }
       }
       board.togglePiece(rowIndex, i);
    }
    return false;
  }


  //call the placeQueens with first row;


  placeQueens(0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  //
  return solution;
};

  // var findSolutions = function(inputBoard) {
  //   for (var i = 0; i < n; i++) {
  //     if (inputBoard.hasAnyQueensConflicts() === false) {
  //       solution = findSolutions(boardRows[i]);
  //     }
  //   }
  // }

  // findSolutions(boardRows[0]);





// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
