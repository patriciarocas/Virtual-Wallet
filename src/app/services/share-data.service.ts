import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  public coin$ = new BehaviorSubject<string[]>(undefined);

  public selectedCoin$ = new Subject<string>();

  public coinName$ = new Subject<string>();

  constructor() { }

  public getCoin(): Observable<string[]> {
    return this.coin$.asObservable();
  }

  public getSelectedCoin(): Observable<string> {
     console.log("selected coin", this.selectedCoin$);
    return this.selectedCoin$.asObservable();
  }

  public getName(): Observable<string>{
     return this.coinName$.asObservable();
  }
}
