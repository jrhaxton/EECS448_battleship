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


}
function hitOrMiss(row: number, col: unknown, player: number): boolean 
{

 if(player==1)
 {
   for(let i=0; i< 9; i++)
   {
     for(let j=0; i<9; j++)
     {
       if(i+1==row && j+1==col)
       {
         if(board2[i+1][j+1]=='s')
         {
          return true;
         } 
         else if(board2[i+1][j+1]=='`')
         {
           return false
         }
         else if(board2[i+1][j+1]=='x' || board2[i+1][j+1]=='0')
         {
          //return an error the resets the attack
        }
       }
     }
   }
 }
 else if(player==2)
 {
  for(let i=0; i< 9; i++)
  {
    for(let j=0; i<9; j++)
    {
      if(i+1==row && j+1==col)
      {
        if(board1[i+1][j+1]=='s')
         {
          return true;
         } 
         else if(board1[i+1][j+1]=='`')
         {
           return false
         }
         else if(board1[i+1][j+1]=='x' || board2[i+1][j+1]=='0')
         {
          //return an error the resets the attack
        }
      }
    }
  }
 }
}
