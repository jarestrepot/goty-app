import { HttpClient } from '@angular/common/http';
import { Injectable, effect, inject, signal } from '@angular/core';
import { ResponseGames } from '@interfaces/games.interface';
import { Observable, catchError, from, map, of, tap } from 'rxjs';
import { environments } from '@environments/environments';
import { ResponseOkHtttp } from '@interfaces/msg200http.interface';
import { Firestore, collection, collectionData, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { constantesObject } from '../Helpers/constantes';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  #http = inject(HttpClient);
  #games = signal<ResponseGames[]>([]);
  #firestore: Firestore = inject(Firestore);
  #collection = collection(this.#firestore, constantesObject.COLLECTIONS.GOTY);
  #document = signal<ResponseGames |undefined >(undefined);

  constructor(){
    this.getGames().subscribe( games => this.#games.set( games ));
  }

  /**
   * Function to get game collections
   * @returns All Collections
   */
  getGames():Observable<ResponseGames[]> {
    const $observableDocumentsColletions = collectionData(this.#collection) as Observable<ResponseGames[]>
    $observableDocumentsColletions.subscribe( games => this.#games.set( games ));
    return $observableDocumentsColletions;
  }

  /**
   * Función que solo sirve con las functions de firebase.
   * @returns Observable<ResponseGames[]>
   */
  getAllGames(): Observable<ResponseGames[]> {
    if (this.#games().length !== 0) {
      return of(this.#games());
    }
    return this.#http.get<ResponseGames[]>(`${environments.API_URL}/api/goty`)
      .pipe(
        tap((games) => this.#games.set(games)),
        catchError(error => {
          return this.getGames();
        })
      );
  }

  voteGame(id: string): Observable<ResponseOkHtttp> {
    return this.#http.post<ResponseOkHtttp>(`${environments.API_URL}/api/goty/${id}`, {});
  }

  /**
   * Function get one game for id
   * @param id game
   * @returns Observable<ResponseGames>
   */
  getGame(id: string):Observable<ResponseGames> {
    const document = doc(this.#firestore, constantesObject.COLLECTIONS.GOTY, id);
    return from(getDoc(document)).pipe(
      map(snapshot => snapshot.data() as ResponseGames)
    ); //any document
  }


  /**
   * Function to vote for one game
   * @param id To game
   */
  async voteForOne(id: string):Promise<void> {
    const document = doc(this.#firestore, constantesObject.COLLECTIONS.GOTY, id);
    const documentSnapshot = await getDoc( document );
    const data:ResponseGames = documentSnapshot.data() as ResponseGames;
    const newData:ResponseGames = {
      ...data,
      votes: (Number(data.votes) + 1)
    }
    this.#document.set( newData );

    updateDoc(document, {...this.#document() });

  }


  async resetVotes():Promise<void>{

    if( this.#games().length <= 0 ) return;
    this.#games().forEach( game => {
      game.votes = 0;
      let document = doc(this.#firestore, constantesObject.COLLECTIONS.GOTY, game.id);
      this.#document.set(game);
      updateDoc(document, { ...this.#document() });
    });

  }
}
