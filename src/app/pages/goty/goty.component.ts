import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { ResponseGames } from '@interfaces/games.interface';
import { GameService } from '@services/game.service';
import { CardComponent } from '@shared/components/card/card.component';
// import { tap } from 'rxjs';


@Component({
  selector: 'app-goty',
  standalone: true,
  imports: [ CommonModule, CardComponent ],
  templateUrl: './goty.component.html',
  styles: ``
})
export class GotyComponent {

  private gameService = inject( GameService );
  public gamesOTY = signal<ResponseGames[]>([]);
  @ViewChild('elementCard')
  public cards!: ElementRef<HTMLDivElement>;
  private cardById = inject( ElementRef );


  constructor(){
    this.gameService.getGames()
    .pipe(
      // tap(console.log)
    )
    .subscribe(
      {
        next: (response: ResponseGames[]) => this.gamesOTY.set( response ),
        error: (err: Error) => console.error( err ), // Modal
      }
    );
  }

  voteForGame( id: string ): void{
    this.gameService.voteForOne(id);
  }

  voteForGameFirebase( id: string ){

  }


  errorVoteAnimation( id: string ):void{
    const value = this.cardById.nativeElement.querySelector(`#${id}`);
    let moveAnimation = value.animate([
      { transform: 'translateX(0)' },
      { transform: 'translateX(-5px)' },
      { transform: 'translateX(5px)' },
      { transform: 'translateX(0)' }
    ], {
      duration: 1000,
      easing: 'ease-in-out',
      iterations: 1
    });

    let shadowAnimation = value.animate([
      { boxShadow: '0px 0px 10px 5px rgba(255, 0, 0, 0.5)' },
      { boxShadow: 'none' }
    ], {
      duration: 1000,
      easing: 'ease-in-out',
      iterations: 1
    });

    Promise.allSettled([moveAnimation.finished, shadowAnimation.finished]).then(() => {
      value.style.boxShadow = 'none';
    });
  }

  succesfullyVote( id:string ){
    const value = this.cardById.nativeElement.querySelector(`#${id}`);
    if (value) {
      let originalColor = getComputedStyle(value).getPropertyValue('background-color');
      const colors = ['#555555', '#444444', '#333333', '#222222', '#111111', originalColor];
      let colorAnimation = colors.map(color => ({ backgroundColor: color }));
      value.animate(colorAnimation, {
        duration: 2000,
        easing: 'ease-in-out',
        fill: 'forwards'
      }).onfinish = function () {
        this.style.backgroundColor = 'transparent';
      };
    }
  }

  resetVotesGames(){

    this.gameService.resetVotes();
  }
}
