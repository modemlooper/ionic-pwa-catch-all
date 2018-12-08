import { Component } from "@stencil/core";

@Component({
  tag: "app-404",
  styleUrl: "app-404.css"
})
export class App_404 {

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/" />
          </ion-buttons>
          <ion-title>404</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content padding>
        <p>Page not found.</p>
      </ion-content>
    ];

  }
}
