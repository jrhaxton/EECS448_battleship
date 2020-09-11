import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { InteractionComponent } from './interaction/interaction.component';

const routes: Routes = [
  {path: 'game', component: InteractionComponent},
  {path: '', redirectTo: 'game', pathMatch: 'full' },
  {path: 'board', component: BoardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
