import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }
  i:number = 1;
  duration: number = 5;
  ngOnInit(): void {
    setInterval(() => {
      this.decrement();
    }, 1000);

  }
  decrement(){
    
    if(this.duration > 0) 
      this.duration -= 1;
    else
    window.location.href = 'https://pavan-code.github.io/Inventory-management/home';
  } 
 
}
