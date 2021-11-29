import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Coin } from './models/coin.model';

@Injectable({
  providedIn: 'root'
})
export class CoinService {
  private API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false";

  constructor(private http: HttpClient) { }

  

  getCoins(): Observable<Coin[]> {
   return this.http.get(this.API_URL) as Observable<Coin[]>;
}

}
