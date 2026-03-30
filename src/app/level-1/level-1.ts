import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms'; //step1
import { email } from '@angular/forms/signals';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-level-1',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './level-1.html',
  styleUrl: './level-1.css',
})
export class Level1 {
  registerForm: FormGroup; //step2

  constructor() {
    this.registerForm = new FormGroup(
      {
        fullname: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(15),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required]),
        phoneno: new FormControl('', [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ]),
        dob: new FormControl('', [Validators.required, this.calAge]),
      },
      { validators: this.passwordMatchValidator },
    ); //bcz we are operating on more than 1 form control.internally this.passwordMatchValidator will be written as this.passwordMatchValidator(this.registerform)
  }
  calAge(control: AbstractControl): ValidationErrors | null {
    //const dob_year=control.get('dob').value

    const dob = new Date(control.value);
    const curr_yr = new Date();

    const age = curr_yr.getFullYear() - dob.getFullYear();
    if (age >= 18) {
      return null;
    } else {
      return { ageValid: true };
    }
  }
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {

    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    console.log(password," ",confirmPassword)
    if (password === confirmPassword) {
      return null;
    } else {
      return { passwordMismatch: true };
    }
  }
  handleSubmit(){
    console.log(this.registerForm.value)
  }
}

/* { controls.get('dob').value
  controls: {
    name: FormControl({
        status: 'VALID'/'INVALID',
        touched: true/false,
        dirty: true/false,
        value:'',
        error:null
    }),
    email: FormControl({
        status: 'VALID'/'INVALID',
        touched: true/false,
        dirty: true/false,
        value:'',
        error:null
    }),
    password: FormControl({
        status: 'VALID'/'INVALID',
        touched: true/false,
        dirty: true/false,
        value:'',
        error:null
    }),
    confirmPassword: FormControl({
        status: 'VALID'/'INVALID',
        touched: true/false,
        dirty: true/false,
        value:'',
        error:null
    }),
    phone: FormControl({
        status: 'VALID'/'INVALID',
        touched: true/false,
        dirty: true/false,
        value:'',
        error:null
    }),
    dob: FormControl({
        status: 'VALID'/'INVALID',
        touched: true/false,
        dirty: true/false,
        value:'',
        error:null
    })
  },
  value: {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dob: ''
  },
  valid: true/false
} 


//Fields: Full Name, Email, Password, Confirm Password, Phone Number, Date of Birth */
