import { CommonModule } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';
import { routes } from '../../../app.routes';
import { RouterModule, Routes } from '@angular/router';
import { constantesObject } from '../../../Helpers/constantes';

@Component({
  selector: 'shared-navbar',
  standalone: true,
  imports: [ CommonModule, RouterModule ],
  templateUrl: './navbar.component.html',
  styles: ``
})
export class NavbarComponent {

  private menuItems = signal<Routes>(routes);
  private imageAssets = signal<string>(constantesObject.IMAGES_ROUTES);
  public imgsrcSet = input<string>();


  public computedSignal = computed(() =>
    this.menuItems()
    .filter( ({ path }) => path?.toLocaleLowerCase()
      .includes(constantesObject.HOME)
    )
    .map(route => route.children ?? [] )
    .flat()
    .filter(({ path }) => path !== '**')
  );


  public computedImage = computed( () => `${this.imageAssets()}/${this.imgsrcSet()}`)




}
