import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private snackbar: MatSnackBar) { }

  isLoggedIn: boolean;
  disable: boolean = false;

  ngOnInit(): void {   
    this.isLoggedIn = localStorage.getItem("token") != null;
    this.check();
  }

  check() {
    if(!this.isLoggedIn) {
      this.disable = true;
    }
  }

}
