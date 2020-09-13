import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  Board_Size: number = 9;
  player: number; // Used to know which player is controlling
  gameOver: boolean; // Used to know when the game is over
  winner: string; // Used to show which player won
  board1: any; // Player one's board
  board2: any; // Player two's board
  ships: number = 0; // Number of ships
  p1Ships: number; // Number of ships player one has to place and used to know the length of the ship
  p2Ships: number; // Number of ships player two has to place and used to know the length of the ship
  gotShips: boolean; // Used to know if the number of ships has been given
  coords: string; // Used to convert the user's ship coordinates into useable values
  col: number; // Used to select column to place ship
  row: number; // Used to select row to place ship
  dir: string; // Used to know if the ship is horizontal or vertical

  constructor() { }

  attack1(row,col){
    if(this.board2[row][col] != 'X' && row != 0 && col != 0){
      if(this.board2[row][col] == 's'){
        this.board2[row][col] = 'X';
      }
    }
    if (this.win(this.board2)){
      this.winner = "Player 1";
    }
  }

  attack2(row,col){
    if(this.board1[row][col] != 'X' && row != 0 && col != 0){
      if(this.board1[row][col] == 's'){
        this.board1[row][col] = 'X';
      }
    }
    if (this.win(this.board1)){
      this.winner = "Player 2";
    }
  }

playGame() // Used to control the user's interaction as they play the game
{
  if(this.player == 1)
  {
    //...
    //shoot(); //function for player one to shoot at player two's board
    //...
    if(this.win(this.board2)==true)
    {
      //Output the game is over and player one won
      return;
    }
    else
    {
      this.player = 2;
    }
  }
  else
  {
    //...
    //shoot();//function for player two to shoot at player one's board
    //...
    if(this.win(this.board1)==true)
    {
      //Output the game is over and player two won
      return;
    }
    else
    {
      this.player = 1;
    }
  }
this.playGame();
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

//Function used to take in the number of ships and helps keep track of the length/number of ships that players need to place
numShips(event:any)
{
 this.ships = event.target.value;
 this.p1Ships = this.ships;
 this.p2Ships = this.ships
}

//Function used to let the program know that the number of ships has been entered whent the button is clicked
enterShips()
{
 this.gotShips = true;
}

//Function used to take in the user's placement for their ships and convert them into useable values
getCoords(event:any)
{
  this.coords = event.target.value.split(",", 3);
  this.col = this.convertLetter(this.coords[0]);
  this.row = Number(this.coords[1]);
  this.dir = this.coords[2];
}

//Function used to place the ships on the board
placeShips(col, row, direction:string, board, length:number)
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

// Function used to verify if a ship can be placed given the coordinates
checkPlacements(row, col:number, dir:string, board, length:number)
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

// Function used to convert the column letter to a numerical value
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
  else{
    //error
  }
  return (num);
}

// Function used to update the boards after ship placement
updateBoards()
{
  this.board1= [...this.board1];
  this.board2= [...this.board2];
}
  ngOnInit(): void {
    this.player= 1;
    this.gotShips = false;
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
  }
}
