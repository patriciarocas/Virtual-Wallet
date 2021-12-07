import { ShareDataService } from './../../services/share-data.service';
import { CoinInfo } from './../../models/CoinInfo';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  @Input() coins: CoinInfo[] = [];

  favorites: CoinInfo[] = [];

  favoriteIds: string[] = [
    "bitcoin", "solana", "chainlink"
  ];

  myCoins: { [key: string]: number } = {
    "bitcoin": 2,
    "solana": 3,
    "chainlink": 5
  }

  constructor(private sharedData: ShareDataService) { }

  ngOnInit(): void {
    this.setFavorites();
  }

  // ngOnChanges(): void {
  //   this.setFavorites();
  //   //console.log("fav", this.favorites);
  //   console.log("FAVORITES COMPONENT CHANGED");
  // }

  setFavorites() {
    this.sharedData.getCoin().subscribe( coinId => {
      let alreadyExist = this.favorites.findIndex(item => item.id === coinId);
      if(alreadyExist !== -1){
        this.favorites.splice(+coinId, 1);
      } else {
          this.favorites = this.coins.filter((coin: CoinInfo) => coin.id === coinId);
        this.favorites.forEach((favorite) => {
          favorite.my_currency = this.myCoins[favorite.id] * favorite.current_price;
        })
      }
    }) 
  }

}
