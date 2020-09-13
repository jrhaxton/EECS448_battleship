import { Component, OnInit } from '@angular/core';
//import { table } from 'console';
import { AppComponent } from '../app.component';
import * as $ from 'jquery';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  Board_Size: number = 9;
  total_player: number = 2;
  player: number; // Used to know which player is controlling
  gameOver: boolean; // Used to know when the game is over
  winner: string; // Used to show which player won
  board1: any; // Player one's board
  board2: any; // Player two's board
  board1_C: any;
  board2_C: any;
  ships: number = 0; // Number of ships
  p1Ships: number; // Number of ships player one has to place and used to know the length of the ship
  p2Ships: number; // Number of ships player two has to place and used to know the length of the ship
  gotShips: boolean; // Used to know if the number of ships has been given
  coords: string; // Used to convert the user's ship coordinates into useable values
  col: number; // Used to select column to place ship
  row: number = 1; // Used to select row to place ship
  dir: string; // Used to know if the ship is horizontal or vertical
  validCoords: boolean; // Used to verify that a coordinate is valid
  validNum: boolean; // Used to verify if the number of ship is valid
  player1: string = 'player 1';
  player2: string = 'player 2';
  
  player1_turn: boolean = true;
  player2_turn: boolean = false;
  play: boolean = false;

  constructor() { }
  flipView(){
    
    $('#screen').toggle();
    $('#main-screen').toggle();
   }
     
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
    if (this.win(this.board2)){
      this.winner = "Player 1";
    }
    this.flipView();
    this.player = 2;
  }

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
    if (this.win(this.board1)){
      this.winner = "Player 2";
    }
    this.flipView();
    this.player = 1;
  }

  playGame() // Used to control the user's interaction as they play the game
  {
   this.play = true;
   this.gameOver = false; 
  }

  win(board) //Determines whether or not a player has won the game
  {
    this.gameOver = true
    for(let i=1; i<10; i ++)
    {
      for(let j=1; j<10; j++)
      {
        if(board[i][j] == 's')
        {
          this.gameOver = false;
          return(this.gameOver);
        }
      }
    }
  return(this.gameOver);
  }

  /*
  - Function used to take in the number of ships and helps keep track of the length/number of ships that players need to place
  - @param {any} event The input string from the user for the number of ships
  */
  numShips(event:any)
  {
    if(Number(event.target.value) > 0 && Number(event.target.value) < 6)
    {
      this.ships = event.target.value;
      this.p1Ships = this.ships;
      this.p2Ships = this.ships
      this.validNum = true
    }
    else{
      this.validNum = false;
    }
  }

  /*
  - Function used to let the program know that the number of ships has been entered whent the button is clicked
  */
  enterShips()
  {
    if(!this.validNum)
    {
      alert("Not a valid number");
    }
    else{
      this.gotShips = true
    }
  }

  /*
  - Function used to take in the user's placement for their ships and convert them into useable values
  - @param {any} event The input string from the user for the coordinates of the ships head and orientation
  */
  getCoords(event:any)
  {
    this.validCoords = false;
    this.coords = event.target.value.split(",", 3);
    if(this.convertLetter(this.coords[0]) != 0 && (Number(this.coords[1]) > 0 && Number(this.coords[1]) < 10) && (this.coords[2].toUpperCase() == 'H' || this.coords[2].toUpperCase() == 'V'))
    {
      this.col = this.convertLetter(this.coords[0]);
      this.row = Number(this.coords[1]);
      this.dir = this.coords[2];
      this.validCoords = true
    }
  }

  /*
  - Function used to place the ships on the board
  - @param {number} col The column number for the head of the ship
  - @param {number} row The row number for the head of the ship
  - @param {string} direction The string/char symbolzing horizontal or vertical alignment
  - @param {any} board The board being marked with ships
  - @param {number} length The length/size of the ship being placed
  */
  placeShips(col: number, row: number, direction:string, board: any, length:number)
  {
    if(this.validCoords == true)
    {
      if (this.checkPlacements(row, col, direction, board, length)) 
      {
        for (let i = 0; i < length; i++) 
        {
          if (direction == 'H' || direction == 'h') 
          {
            board[row][col + i] = 's';
          } 
          else 
          {
            board[row + i][col] = 's';
          }
        }
        if(this.player == 1)
        {
          this.p1Ships--;
          if(this.p1Ships == 0)
          {
            this.player = 2;
          }
        }
        else
        {
          this.p2Ships--;
          if(this.p2Ships == 0)
          {
            this.player = 1;
          }
        }
      this.updateBoards(); 
      }
    }
    else{
      alert("Invalid coordinates");
    }
  }

  /* 
  - Function used to verify if a ship can be placed given the coordinates
  - @param {number} row The row number for the head of the ship
  - @param {number} col The column number for the head of the ship
  - @param {string} dir The string/char symbolzing horizontal or vertical alignment
  - @param {any} board The board being marked with ships
  - @param {number} length The length/size of the ship being placed
  - @return {boolean} If placement of the ship is valid
  */
  checkPlacements(row:number, col:number, dir:string, board, length:number)
  {
    let valid = true;
    for (let i = 0; i < length; i++) {
      if (dir.toUpperCase() == 'H') {
        if(board[row][col + i] != '~')
        {
          valid = false;
        }
      } 
      else {
        if(board[row + i][col] != '~')
        {
          valid = false;
        }
      }
    }
    return(valid);
  }

  /*
  - Function used to convert the column letter to a numerical value
  - @param {string} letter The letter corresponding to a col of the board
  - @return {number} A numeric value corresponding to valid letters
  */
  convertLetter(letter:string)
  {
    let num = 0;
    if( letter.toUpperCase() == 'A')
    {
      num = 1;
    }
    else if( letter.toUpperCase() == 'B')
    {
      num = 2;
    }
    else if( letter.toUpperCase() == 'C')
    {
      num = 3;
    }
    else if( letter.toUpperCase() == 'D')
    {
      num = 4;
    }
    else if( letter.toUpperCase() == 'E')
    {
      num = 5;
    }
    else if( letter.toUpperCase() == 'F')
    {
      num = 6;
    }
    else if( letter.toUpperCase() == 'G')
    {
      num = 7;
    }
    else if( letter.toUpperCase() == 'H')
    {
      num = 8;
    }
    else if( letter.toUpperCase() == 'I')
    {
      num = 9;
    }
    else if( letter.toUpperCase() == '')
    {
      num = 1;
    }
    else{
      num = 0;
    }
    return (num);
  }

  /* 
  - Function used to update the boards after ship placement
  */
  updateBoards()
  {
    this.board1= [...this.board1];
    this.board2= [...this.board2];
  }

  ngOnInit(): void {
    this.player= 1;
    this.gotShips = false;
    $("#screen").hide();
    this.board1=[
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
    this.board2=[
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