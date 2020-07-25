import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  isLoggedIn: boolean;
  ngOnInit(): void {
    // console.log(document.cookie.substring(6));
    
    this.isLoggedIn = document.cookie.length == 6;
    
    // console.log(this.isLoggedIn);
  }
  

}
