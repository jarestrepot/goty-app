import { Component, input, output } from '@angular/core';
import { ResponseGames } from '@interfaces/games.interface';

@Component({
  selector: 'shared-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  private emitIdCard = output<string>();

  public card = input.required<ResponseGames>({ alias: 'cardValue' });

  emitValue( id:string ){
    this.emitIdCard.emit( id );
  }

}
