/**--------------------------------------------------------------
 * File Name: board.component.ts
 * Description: Component that takes care of creating boards,
 *        user interactions, and determining the winner for
 *        each game.
 *----------------------------------------------------------------*/

import { Component, OnInit } from '@angular/core';
//import { table } from 'console';
import { AppComponent } from '../app.component';
import * as $ from 'jquery'; // Using the $ for jquery instructions

@Component({
  selector: 'app-board', // html tag name for the component
  templateUrl: './board.component.html', // Link HTML file to present
  styleUrls: ['./board.component.css'] // Link CSS file to use
})


/** Name: Brief description
 * @pre precondition
 * @post post condition
 * @param list of parameters and uses
 * @throws errors thrown, if any
 * @return returned values if any. 
 */
export class BoardComponent implements OnInit {
  Board_Size: number = 9; 
  total_player: number = 2;
  gameOver: boolean; // Used to end the game when a player wins
  winner: string;
  player1: string = 'player 1';
  player2: string = 'player 2';
  board1: any;
  board2: any;
  /*We make copies of each board. The copies are 
    presented to the opponent as a map to attack.
  */
  board1_C: any; 
  board2_C: any;

/** Constructor: Creates and initilaze the class 
 * @pre None
 * @post Component class created with all its dependencies
 * @param None 
 * @throws None
 * @return None
 */
  constructor() { }

/** flipView: Switch views as a form of swtiching turns
 * Called after each play by a user to give the turn to the
 * other user
 * @pre None
 * @post One view is hidden and another shown
 * @param None
 * @throws None
 * @return None
 */
  flipView(){
    
    $('#screen').toggle();
    $('#main-screen').toggle();
   }
    
/** Attack1: - Takes care of the attacks from player 1
 *           - Checks if Player 1 won, after each turn
 * @pre A Board[][] is created and ready for use.
 * @post Any hits/misses are marked and the turn is
 *       given to player 2. 
 * @param row: Row index where player 1 want to hit
 *        col: Column index where player 1 want to hit
 *      these coordinates are used to mark the boards for
 *      hits/misses
 * @throws None
 * @return None
 */
  attack1(row,col){
    if(this.board2[row][col] != 'X' && row != 0 && col != 0){
      if(this.board2[row][col] == 's'){
        this.board2_C[row][col] = 'X';
        this.board2[row][col] = 'X';
      }
      else{
        this.board2_C[row][col] = '0';
      }
    }

    this.gameOver = this.win(this.board2);
    if (this.gameOver){
      this.winner = "Player 1";
    }
    this.flipView();
  }

/** Attack2: - Takes care of the attacks from player 2
 *           - Checks if Player 2 won, after each turn
 * @pre A Board[][] is created and ready for use.
 * @post Any hits/misses are marked and the turn is
 *       given to player 1. 
 * @param row: Row index where player 2 want to hit
 *        col: Column index where player 2 want to hit
 *      these coordinates are used to mark the boards for
 *      hits/misses
 * @throws None
 * @return None
 */
  attack2(row,col){
    if(this.board1[row][col] != 'X' && row != 0 && col != 0){
      if(this.board1[row][col] == 's'){
        this.board1_C[row][col] = 'X';
        this.board1[row][col] = 'X';
      }
      else{
        this.board1_C[row][col] = '0';
      }
    }

    this.gameOver = this.win(this.board1);
    if (this.gameOver){
      this.winner = "Player 2";
    }
    this.flipView();
  }

/** win: Check if all ships of a player are hit
 * @pre A Board[][] is created and ready for use.
 * @post None
 * @param board the board to check
 * @throws None
 * @return - true: if all ships of the board are down
 *         - false: if any ship is left not hit
 */
  win(board: string[][]){
    for (var i = 1; i <= 9; i++){
      for (var j = 1; j <= 9; j++){
        if(board[i][j] == 's'){
          return false;
        }
      }
    }
    return true;
  }


 /** ngOnInit: lifecycle hook of the component called after
  *    the constructor to initialize the component. Here we create
  *    the two boards and their copies. The turn is given to player 1,
  *    so his screen is the only shown. 
   * @pre 4 boards created and initilized. Only one screen show to the user
   * @post post condition
   * @param None
   * @throws None
   * @return None
   */
  ngOnInit(): void {

    $("#screen").hide();
    this.board1=[
      [' ','A','B','C','D','E','F','G','H','I'],
      ['1','~','~','~','~','s','~','~','~','~'],
      ['2','~','~','~','~','s','~','~','~','~'],
      ['3','~','~','s','~','s','~','~','~','~'],
      ['4','s','~','~','~','~','~','~','~','~'],
      ['5','s','s','s','~','~','~','~','s','~'],
      ['6','~','~','~','~','~','~','~','s','~'],
      ['7','~','~','~','s','~','~','~','s','~'],
      ['8','~','s','~','s','~','~','~','~','~'],
      ['9','~','~','~','~','s','s','s','s','~'],
    ];
    this.board2=[
      [' ','A','B','C','D','E','F','G','H','I'],
      ['1','~','s','~','~','~','s','s','s','~'],
      ['2','~','~','~','~','~','~','~','s','~'],
      ['3','s','~','~','~','~','~','~','s','~'],
      ['4','s','~','s','s','s','~','~','~','~'],
      ['5','~','~','~','~','~','~','~','~','~'],
      ['6','~','s','~','~','~','~','~','s','~'],
      ['7','~','s','~','~','s','~','~','s','~'],
      ['8','~','s','~','~','s','~','~','s','~'],
      ['9','~','s','~','~','s','~','~','~','s'],
    ];

    this.board1_C=[
      [' ','A','B','C','D','E','F','G','H','I'],
      ['1','~','~','~','~','~','~','~','~','~'],
      ['2','~','~','~','~','~','~','~','~','~'],
      ['3','~','~','~','~','~','~','~','~','~'],
      ['4','~','~','~','~','~','~','~','~','~'],
      ['5','~','~','~','~','~','~','~','~','~'],
      ['6','~','~','~','~','~','~','~','~','~'],
      ['7','~','~','~','~','~','~','~','~','~'],
      ['8','~','~','~','~','~','~','~','~','~'],
      ['9','~','~','~','~','~','~','~','~','~'],
    ];
    this.board2_C=[
      [' ','A','B','C','D','E','F','G','H','I'],
      ['1','~','~','~','~','~','~','~','~','~'],
      ['2','~','~','~','~','~','~','~','~','~'],
      ['3','~','~','~','~','~','~','~','~','~'],
      ['4','~','~','~','~','~','~','~','~','~'],
      ['5','~','~','~','~','~','~','~','~','~'],
      ['6','~','~','~','~','~','~','~','~','~'],
      ['7','~','~','~','~','~','~','~','~','~'],
      ['8','~','~','~','~','~','~','~','~','~'],
      ['9','~','~','~','~','~','~','~','~','~'],
    ];
  }
  
}