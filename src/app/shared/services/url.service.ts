import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UrlService {

  private host = 'interview.torodata.io';
  private protocol = 'https';
  private appPath = `${this.protocol}://${this.host}`;

  /**
   * Return a complete URL for a given metric ID.
   * @param  id  The ID of the metric to fetch.
   */
  metricUrl = (id: number): string => {
    return `${this.appPath}/metrics/${id}`;
  }

  /**
   * Return a complete URL for the tables collection.
   */
  tablesUrl = (): string => {
    return `${this.appPath}/tables`;
  }
}
