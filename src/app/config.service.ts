import { Injectable, Inject } from '@angular/core';

@Injectable()
export class ConfigService {
  private url: string;
  private serviceUrl: string;

  constructor(@Inject(Window) private _window: Window) {
    this.url = `http://${this._window.location.hostname}:4200`
    this.serviceUrl = `http://${this._window.location.hostname}:8080`;
  };

  public getUrl(): string {
    return this.url;
  }

  public getServiceUrl(): string {
    return this.serviceUrl;
  }
}
