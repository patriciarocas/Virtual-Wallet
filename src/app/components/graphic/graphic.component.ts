import { ChartData } from './../../models/ChartData';
import { ShareDataService } from 'src/app/services/share-data.service';
import { CoinsService } from './../../services/coins.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphicComponent implements OnInit {

  public hours: string[] = [];
  public coinValues: number[] = [];
  public updateOptions: any;

  public types: string[] = ['bar', 'line'];
  public type: string = 'bar';
  public coinName: string;

  color = 'accent';
  checked = true;

  onChange() {
    let optionsLegend = this.options.legend;
    let optionsSeries = this.options.series[0];

    this.type = this.checked ? this.types[0] : this.types[1];
    optionsLegend.data[0] = this.type;
    optionsSeries.name = this.type;
    optionsSeries.type = this.type;
  }

  public options: any = {
    legend: {
      data: [this.type],
      align: 'left',
    },
    tooltip: {},
    xAxis: {
      data: this.hours,
      silent: false,
      splitLine: {
        show: false,
      },
    },
    yAxis: {},
    series: [
      {
        name: this.type,
        type: this.type,
        data: this.coinValues,
        animationDelay: (idx: number) => idx * 10,
      },
    ],
    animationEasing: 'elasticOut',
    animationDelayUpdate: (idx: number) => idx * 5,
  };

  constructor(
    private sharedData: ShareDataService,
    private coinService: CoinsService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.sharedData
      .getSelectedCoin()
      .pipe(switchMap(coinId => {
        return this.coinService.getHistoryDataForCoin(coinId)
      }))
      .subscribe((chartData: ChartData) => {
        this.formatChartData(chartData);
        this.updateOptions = {
          xAxis: {
            data: this.hours
          },
          yAxis: {
            scale: true
          },
          series: [{
            data: this.coinValues
          }]
        };
      });
    this.sharedData.getName().subscribe(coinName => {
      this.coinName = coinName;
    });
  }

  private formatChartData(chartData: ChartData) {
    this.hours = [];
    this.coinValues = [];

    for (let i = 0; i < chartData.prices.length; i++) {
      const price = chartData.prices[i];
      const priceTime = new Date(price[0]);
      const value = price[1].toFixed(2);

      this.hours.push(priceTime.toLocaleString());
      this.coinValues.push(+value);
    }

    this.cdr.markForCheck();
  }
}
