import { Component, Prop, State, Listen } from '@stencil/core';
// https://github.com/pillarjs/path-to-regexp
import pathToRegExp from "path-to-regexp";

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {

  @Prop({ context: "window" }) win: Window;
  @Prop({ connect: "ion-nav" }) nav: HTMLIonNavElement;
  @Prop({ connect: "ion-router" }) router: HTMLIonRouterElement;
  @State() path_found: boolean = false;

  // Listen to route changes and check path matches
  @Listen('ionRouteWillChange')
  async route_change(data) {

    //Set global path_found so we can turn on redirect checks
    this.path_found = true;

    // Get the current path and the the paths setup in ion-router 
    const path = data.detail.to;
    const routes = await this.getRoutes();

    // Setup var to pass boolean to path_found if current path is valid or not
    let found = false;

    // If a path doesnt match exactly then we need to check with regex because of url :name tokens
    if (!routes.includes(path)) {

      for (var i = 0; i < routes.length; i++) {

        var keys = [];
        var re = pathToRegExp(routes[i], keys);
        var regex = re.exec(path);

        if (regex === null) {
          console.log("not found", path);
          found = true;
        } else {
          console.log("found", path);
          found = false;
          break;
        }

      }

      // Update if current path was found so the route-redirect can fire
      this.path_found = found;

    }
  }

  // Returns the route path urls from ion-router html
  async getRoutes() {
    const routes = await this.router.componentOnReady();

    return (Array.from(routes.children) as HTMLIonRouteElement[])
      .filter(el => el.tagName === "ION-ROUTE" && el.component)
      .map(el => {
        return el.url;
      });
  }

  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <ion-route url="/" component="app-home" />
          <ion-route url="/profile/:name" component="app-profile" />
          <ion-route url="/404" component="app-404" />
          <ion-route-redirect from="*" to={!this.path_found ? undefined : "/404"} />
        </ion-router>
        <ion-nav/>
      </ion-app>
    );
  }
}
