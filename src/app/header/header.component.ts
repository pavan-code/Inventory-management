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
    // console.log(localStorage.getItem("token"));
    
    this.isLoggedIn = localStorage.getItem("token") == null;
    // console.log(this.isLoggedIn);
    
    // console.log(this.isLoggedIn);
  }
  

}
