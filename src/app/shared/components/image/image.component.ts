import { Component, computed, input } from '@angular/core';
import { constantesObject } from '../../../Helpers/constantes';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [],
  templateUrl: './image.component.html',
  styles: ``
})
export class ImageComponent {

  public alt = input.required<string>({ alias: 'altImage' });
  private imgName = input.required<string>({ alias: 'imageName'});
  private src = input.required<string>({
    alias: 'srcImage',
  });
  public classImage = input<string>( constantesObject.CLASS_IMEGE_SMALL, { alias: 'classImage'});
  public imagenSet = computed( () => `${this.src()}/${this.imgName()}` );
}
