import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  Board_Size: number = 9;
  total_player: number = 2;
  gameOver: boolean;
  winner: string;

  constructor() { }

  attack1(row,col){
    if(this.board2[row][col] != 'X' && row != 0 && col != 0){
      if(this.board2[row][col] == 's'){
        this.board2[row][col] = 'X';
      }
    }
    this.gameOver = this.win(this.board1);
    if (this.gameOver){
      this.winner = "Player 1";
    }
  }

  attack2(row,col){
    if(this.board1[row][col] != 'X' && row != 0 && col != 0){
      if(this.board1[row][col] == 's'){
        this.board1[row][col] = 'X';
      }
    }
    this.gameOver = this.win(this.board1);
    if (this.gameOver){
      this.winner = "Player 2";
    }
  }


  win(board: string[][]){

    for (var i = 0; i < 9; i++){
      for (var j = 0; j < 9; j++){
        if(board[i][j] == 's'){
          return false;
        }
      }
    }
    return true;

  }

  board1: any;
  board2: any;
  ngOnInit(): void {
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
  }
}
