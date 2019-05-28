import { Component, DoCheck } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-jiaoyi',
  templateUrl: './jiaoyi.component.html',
  styleUrls: ['./jiaoyi.component.css']
})
export class JiaoyiComponent implements DoCheck {
  public url: string;
  routerState = true;
  routerStateCode = 'active';
  public menuList: any;
  constructor(public data: DataService, public http: HttpService) {
    this.menuList = this.data.getCenterMenuList();
  }

  ngDoCheck() {
    if (this.data.nowUrl !== this.data.getUrl(3)) {
      this.data.nowUrl = this.data.getUrl(3);
      this.url = this.data.getUrl(3);
      this.data.clearInterval();
    }

  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    console.log('destroy');
    this.data.clearInterval();
  }

  goto(url) {
    if (url !== this.data.getUrl(3)) {
      this.http.cancelSubscribe().subscribe(res => {
        console.log('取消订阅');
      });
      this.data.sellCnt = '';
      this.data.searchStockCode = '';
      this.data.resetStockHQ();
      this.data.removeSession('optionCode');
      this.url = url;
      this.data.goto('main/jiaoyi/' + url);
    }


  }

}
