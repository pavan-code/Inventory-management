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
    
    this.isLoggedIn = document.cookie.substring(0,5) === "token";
    console.log(this.isLoggedIn);
        
  }
  

}
