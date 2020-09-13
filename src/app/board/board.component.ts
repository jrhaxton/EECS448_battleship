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
  gameOver: boolean;
  winner: string;
  player1: string = 'player 1';
  player2: string = 'player 2';
  
  player1_turn: boolean = true;
  player2_turn: boolean = false;

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

    this.gameOver = this.win(this.board2);
    if (this.gameOver){
      this.winner = "Player 1";
    }
    this.flipView();
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

    this.gameOver = this.win(this.board1);
    if (this.gameOver){
      this.winner = "Player 2";
    }
    this.flipView();
  }

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

  board1: any;
  board2: any;
  board1_C: any;
  board2_C: any;

 
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