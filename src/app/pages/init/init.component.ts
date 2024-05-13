import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ResponseGames } from '@interfaces/games.interface';
import { Graficas } from '@interfaces/graficas.interfaces';
import { GameService } from '@services/game.service';
import { GraficBarraHComponent } from '@shared/components/grafic-barra-h/grafic-barra-h.component';
import {  map } from 'rxjs';


@Component({
  selector: 'app-init',
  standalone: true,
  imports: [CommonModule, GraficBarraHComponent, AsyncPipe],
  templateUrl: './init.component.html',
  styles: ``
})
export class InitComponent {

  #gameService = inject(GameService);
  public games = signal<Graficas[]>([]);
  constructor() {
    this.#gameService.getGames()
      .pipe(
        map( (game) => {
          return game.map( ({ name, votes }):Graficas => ({ name, value: votes ?? 0 }))
        })
      )
      .subscribe({
        next: res  => {
          this.games.set(res)
        }
      });
  }

}
