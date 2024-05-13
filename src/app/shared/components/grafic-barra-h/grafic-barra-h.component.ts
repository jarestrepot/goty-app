import { CommonModule } from '@angular/common';
import { Component, HostListener, effect, input, signal } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { constantesObject } from '../../../Helpers/constantes';
import { ResponseGames } from '@interfaces/games.interface';
import { Graficas } from '@interfaces/graficas.interfaces';

@Component({
  selector: 'shared-grafic-barra-h',
  standalone: true,
  providers: [ BrowserAnimationsModule ],
  imports: [ NgxChartsModule, CommonModule ],
  templateUrl: './grafic-barra-h.component.html',
  styles: ``
})
export class GraficBarraHComponent {


  results: Graficas[] = [];
  inputs = input.required<Graficas[]>();

  public viewportWidthSignal =  signal<number>(window.innerWidth);

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.viewportWidthSignal.set( window.innerWidth );
  }

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Games';
  showYAxisLabel = true;
  yAxisLabel = 'Votes';

  colorScheme = constantesObject.COLORSCHEMA;

  constructor() {
    effect(() => {
      this.results = this.inputs();
    })
  }

  onSelect( event: EventListener ) {
    // console.log(event);
  }
}
