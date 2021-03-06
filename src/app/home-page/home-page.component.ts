import { Component, OnInit, HostListener } from '@angular/core';
// import { Getall  } from '.././display/category/api-calls/GetAllCategories';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  // constructor() {}

  ngOnInit(): void {}
  
  scrWidth: any;
  sidebar: string;
  opened: boolean = true;
  hide: boolean = true;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    // this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
    // console.log(this.scrWidth);
    if(this.scrWidth <= 768) {
      this.sidebar = 'over'
      this.opened = false;
      this.hide = false;
    }
    else {
      this.sidebar = 'side';
      this.opened = true;
      this.hide = true
    }
  }

  // Constructor
  constructor() {
    this.getScreenSize();
  }
 

  logout() {

    // document.cookie = "token" + "=" + "";
    localStorage.removeItem("userid");
    localStorage.removeItem("token");
    location.href = '/login';  
    // location.assign("https://pavan-code.github.io/Inventory-management/login")  
    
  }
}
