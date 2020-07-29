import axios from 'axios';
import { MatSnackBar } from '@angular/material/snack-bar';

let token = localStorage.getItem('token');
let userid = localStorage.getItem('userid');
let categories = [];
export class getCategories {
    categories = [];
  leng: any;
    constructor(){}

    cat() {
        axios({
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
              Authorization: `Bearer ${token}`,
            },
            method: 'get',
            url: `https://inventory-shop-api.herokuapp.com/category/${userid}`,
          })
            .then((response) => {         
              response.data.message.filter(cat => {
                this.categories.push(cat.name)                
              })                                              
              // console.log("res:"+ this.categories);
              // console.log(response.data.message.length);
            })   
            
            return this.categories
            // .catch((error) => {        
            //   this.snackbar.open(error.response.data.message, '', {
            //     duration: 5000,
            //     verticalPosition: 'top',
            //     horizontalPosition: 'center'
            //   })                
            // });
            // console.log("cat: "+this.categories);
            
            // return this.categories;
    }
    len() {
      axios({
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${token}`,
        },
        method: 'get',
        url: `https://inventory-shop-api.herokuapp.com/category/${userid}`,
      })
        .then((response) => {         
          response.data.message.filter(cat => {
            this.categories.push(cat.name)                
          })                                              
          // console.log("res:"+ this.categories);
          this.leng = response.data.message.length
          return this.leng
        })   
        // console.log(this.leng);
        
        // return this.leng;
    }
 
}

