import { Component, Input, OnInit } from '@angular/core';
import { Coin } from '../models/coin.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Input() coin: Coin[] = [];

  coins: Array<Coin> = [];

  nameCoins = [
    "bitcoin", "solana", "chainlink"
  ];

  constructor() { }

  ngOnInit(): void {

  }
  ngOnChanges(): void {
    this.setCoins();
  }

  setCoins() {
    this.coins = this.coin.filter(
      (coin: any) =>
        this.nameCoins.includes(coin.id)
    );
  }

}
