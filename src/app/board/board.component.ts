import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  Board_Size: number = 9;
  player: number;
  gameOver: boolean;
  winner: string;
  board1: any;
  board2: any;
  ships: number = 0;
  p1Ships: number;
  p2Ships: number;
  gotShips: boolean;
  coords: string;
  col: number;
  row: number;
  dir: string;

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

numShips(event:any)
{
 this.ships = event.target.value;
 this.p1Ships = this.ships;
 this.p2Ships = this.ships
}

enterShips()
{
 this.gotShips = true;
}

getCoords(event:any)
{
  this.coords = event.target.value.split(",", 3);
  this.col = this.convertLetter(this.coords[0]);
  this.row = Number(this.coords[1]);
  this.dir = this.coords[2];
}

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
