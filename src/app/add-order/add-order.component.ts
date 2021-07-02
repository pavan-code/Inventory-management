import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {

  orderForm : FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }
  
  createForm() {
    this.orderForm = this.fb.group({
      customerName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone : ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]]
    })
    this.orderForm.valueChanges
    .subscribe(data => this.onValueChanged());
    // this.onValueChanged();
  }
  onValueChanged() {
    if (!this.orderForm) {
      return;
    }
    const form = this.orderForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previuos error messages if any
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMsgs[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key];
            }
          }
        }
      }
    }
  }
  formErrors = {
    'customerName': '',
    'address': '',
    'phone' : ''
  }
  validationMsgs = {
    'customerName': {
      'required' : 'Name is required'
    } ,
    'address' : {
      'required' : "Address is required"
    },
    'phone' : {
      'required' : "Please provide your contact number",
      'pattern' : "Mobile number must be 10 digit",    
    }
  }

  generatePdf(){
    const documentDefinition = { 
      content: [
        {
          text: new Date(),
          styles: 'date'
        }
      ],
      styles : {
        date : {
          fontsize : 19,
          alignment: 'right'
        }
      }
    };
    pdfMake.createPdf(documentDefinition).print({}, window);
   }
}
