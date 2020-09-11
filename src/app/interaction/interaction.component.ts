import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interaction',
  templateUrl: './interaction.component.html',
  styleUrls: ['./interaction.component.css']
})
export class InteractionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

/*playGame() // Used to control the user's interaction as they play the game
{
  (if player == 1)
  {
    ...
    shoot(); //function for player one to shoot at player two's board
    ...
    if(win(player two's board)==true)
    {
      Output the game is over and player one won
      return();
    }
    else
    {
      player = 2;
    }
  }
  else
  {
    ...
    shoot();//function for player two to shoot at player one's board
    ...
    if(win(player one's board)==true)
    {
      Output the game is over and player two won
      return();
    }
    else
    {
      player = 1;
    }
  }
playGame();
}


win(board) //Determines whether or not a player has won the game
{
boolean gameOver = true
  for(int i=1; i<10; i ++)
  {
    for(int j=1; j<10; j++)
    {
       if(board[i][j] == symbol/number for ship)
       {
         gameOver = false;
         return(gameOver);
       }
    }
  }
return(gameOver);
}
*/
}
