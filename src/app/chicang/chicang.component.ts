import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { DataService } from '../data.service';
import { Router, RouterState, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-chicang',
  templateUrl: './chicang.component.html',
  styleUrls: ['../chedan/chedan.component.css']
})
export class ChicangComponent implements OnInit {
  public userInfo: DataService['userInfo'];
  isJiaoyi: any;
  freezaFee: any;
  url:any;
  constructor(public data: DataService, public http: HttpService,private routeInfo: ActivatedRoute) { 
  }

  ngOnInit() {
    if (this.data.getUrl(2) === 'chicang') {
      this.isJiaoyi = false;
    } else {
      this.isJiaoyi = true;
    }
    this.userInfo = this.data.userInfo;
    this.usercenter();
    this.url=window.location.href.split('#')[1];
    console.log(this.url)
  }

  overflow(type) {
    if (!type) {
      return 'chicang';
    } else {
      return '';
    }
  }

  usercenter() {
    this.http.userCenter().subscribe((res: DataService['userInfo']) => {
      this.userInfo = res;
      this.freezaFee = parseFloat(this.userInfo.lockScale) + parseFloat(this.userInfo.freezeScale);
      this.data.intervalCapital = setTimeout(() => {
        this.usercenter();
      }, 3000);
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    }, () => {
      this.data.Loading(this.data.hide);
    });
  }
}
