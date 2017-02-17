import { Injectable, Inject } from '@angular/core';

@Injectable()
export class ConfigService {
  private serviceUrl: string;

  constructor(
    @Inject(Window) private _window: Window
  ) {
    this.serviceUrl = `http://${this._window.location.hostname}:8080`;
  };

  public getServiceUrl(): string {
    return this.serviceUrl;
  }
}
