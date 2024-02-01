// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      //create a variable to store each row of the board
      var row = this.rows()[rowIndex];
      //create a variable to count;
      var count = 0;
      //loop through rows to check how many spaces are not empty
      for (var i=0; i< row.length; i++) {
        count += row[i];
      }
        //count += row[i]
      //if the count more than 1.return true
      if (count >1) {
        return true
      } else {
      return false;
      } // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //loop through rows in the board
      for (var i=0;i< this.rows().length; i++ ) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      //check if any row has conflict
      //after loop, if there are no conflicts return false
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //create a variable rows()[rowIndex][colIndex]
      var rows = this.rows();
      var count =0;
      //loop through rows()[rowIndex][colIndex]
      for (var i=0;i<rows.length; i++) {
        count += rows[i][colIndex];
      }
      if ( count > 1) {
        return true;
      } else {
        return false;
      }// fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      //loop throuth all the columns to check if each column has conflict
      var rows = this.rows();
      for (var i = 0; i < rows.length; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict/ this.rows()[0][2]
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //create a variable to store all the rows in board
      var rows = this.rows();
      // create a counter variable
      var count = 0;
      //create a colIndex variable, initiate with the argument majorDiagonalColumnIndexAtFirstRow
      var colIndex = majorDiagonalColumnIndexAtFirstRow;
      //loop through each row, when each row goes down, we need to move to the next column
      for (var i = 0; i < rows.length; i++) {
        if (colIndex >=0 && colIndex < rows.length) {
        count += rows[i][colIndex];
        }
        colIndex +=1;
      };
      if (count > 1) {
        return true;
      } else {
        return false;
      }
      //count += rows[i][colIndex];
      //colIndex +=1
      //after loop, if count > 1 return true, otherwise return false

    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      //create a variable to store all the rows
      var rows = this.rows();
      var size = rows.length;
      //loop througn the major diagonals
      for (var i = 1 -size; i < size ; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      //apply the hasMajorDiagonalConflictAt function to check if each major diagonal has the conflict,
      //if yes, return true
      //else return false
      return false; // fixme
      // //check each square in the major diagonals
      // for ( var row = 0; row< size; row++ ){
      //   for (var col= 0; col< size; col++) {
      //     var count = 0;
      //     //walk down throuth the major diagonal
      //     for (var i = row, j= col; i< size && j < size ; i++, j++) {
      //       count += rows[i][j];
      //       if (count > 1) {
      //         return true
      //       }
      //     }
      //   }
      // }
      // return false;

    },


    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // create a variable to store the rows
      var rows = this.rows();
      // create column variable
      var count = 0;
      var colIndex = minorDiagonalColumnIndexAtFirstRow;
      // loop through the minor diagonals
      for (var i = 0; i < rows.length; i++) {
        if (colIndex >= 0 && colIndex < rows.length) {
          count += rows[i][colIndex]
        }
        colIndex--;
      }
      if (count > 1) {
        return true;
      }
        // with minorDiagonalColumnIndex, start iterating

      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // create a variable to store rows
      var rows = this.rows();
      // create a variable for size to store columns
      var size = rows.length;
      // loop through minor diagonals
      for (var i = 0; i < size + size - 1; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }

        // if call function to check if each minor diagonal has a conflict
          // return true
        // else return false

      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
