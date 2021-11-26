import { Component } from '@angular/core';
import { CoinService } from './coin.service';
import { Coin } from './models/coin.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'virtual-wallet';
  coins: Coin[] = [];

  constructor(private coinService: CoinService) {
  }

  ngOnInit(): void {
    this.getCoinsData();
    setInterval(this.getCoinsData.bind(this), 20000);
  }


  getCoinsData() {
    this.coinService.getCoins().subscribe((response) => {
      this.coins = response;
      console.log(this.coins);
    })
  }
}
