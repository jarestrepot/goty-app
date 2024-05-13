import { Routes } from "@angular/router";

export default class RoutesMain  {


  private routesMain: Routes = [];

  constructor( routes: Routes ){
    this.routesMain = routes;
  }

  public getRoutes(): Routes {
    return this.routesMain;
  }

  public addRoutes( routes: Routes ){
    this.routesMain = [
      ...this.routesMain,
      ...routes
    ];
  }
}

