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
function hitOrMiss(row: number, col: number, player: number): boolean 
{
 if(player==1)
 {
   for(let i=0; i< 9; i++)
   {
     for(let j=0; i<9; j++)
     {
       if(i+1==row && j+1==col)
       {
         //Check to see if the ship is on the space 
         return true;
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
        //Check to see if the ship is on the space 
        return true;
      }
    }
  }
 }
}
