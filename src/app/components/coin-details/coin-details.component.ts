import { ShareDataService } from './../../services/share-data.service';
import { CoinInfo } from './../../models/CoinInfo';
import { CoinsService } from './../../services/coins.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-coin-details',
  templateUrl: './coin-details.component.html',
  styleUrls: ['./coin-details.component.css']
})
export class CoinDetailsComponent implements OnInit {

  displayedColumns: string[] = ['info', 'image', 'name', 'current_price', 'symbol', 'last_updated', 'favorites', 'graphic'];
  dataSource = new MatTableDataSource<CoinInfo>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;


  public viewDetails(){
    this.trigger.openMenu();
 }

  public setFavorite(element: CoinInfo): void {
    if(this.favoritesSet.has(element.id)) {
      this.favoritesSet.delete(element.id);
      this.sharedData.coin$.next(element.id);
      console.log('deleted');
    } else {
      this.favoritesSet.add(element.id);
      this.sharedData.coin$.next(element.id);
      console.log('added');
    }
  }

  public setGraphic(element: CoinInfo): void {
     this.sharedData.coinGrf$.next(element.id);
    console.log('added');
  }

  public favoritesSet = new Set<string>();
  public graphicSet =  new Set<string>();

  constructor(private coinService: CoinsService, private sharedData: ShareDataService) { }

  ngOnInit(): void {
    this.coinService.getCoins().subscribe((data: CoinInfo[]) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

