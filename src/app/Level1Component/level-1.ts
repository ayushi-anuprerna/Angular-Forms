import { Component } from '@angular/core';
import {
  ReactiveFormsModule, //reactivefromsmodule are used to handle reactive forms.reactive form means form will take some action based on user input.for ex vlidation of phoneno,age etc
  FormGroup,
  FormControl,
  Validators, //this is a module/class
  AbstractControl, //base class of form grp,cntrl,array
  ValidationErrors,
} from '@angular/forms'; //step1
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-level-1',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './level-1.html',
  styleUrl: './level-1.css',
})
export class Level1Component {
  public registerForm: FormGroup; //step2

  constructor() { //so that on page reload form grp will be created
    this.registerForm = new FormGroup(
      {
       fullname: new FormControl('', [ //formcontrol is a class that tracks the value and validation status of an individual form input element.it holds the current value of the input field,and tracks the validation status
          Validators.required,          //we have written ('',) bcz we are initializing full name with no value means its null in start
          Validators.minLength(4),
          Validators.maxLength(15),
        ]),
        email: new FormControl('', [Validators.required,this.emailValidator]), //it will also work if we have written validation.pattern( regex)
        password: new FormControl('', [Validators.required,Validators.minLength(8)]),
        confirmPassword: new FormControl('', [Validators.required]),
        phoneno: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[0-9]{10}$/) //validators willonly work if we have declared formcontrol
        ]),
        dob: new FormControl('', [Validators.required, this.calAge]), //this.calage is internally written as this.calage(this.registerform.get('dob'))
      },
      { validators: this.passwordMatchValidator },
    ); //bcz we are operating on more than 1 form control.internally this.passwordMatchValidator will be written as this.passwordMatchValidator(this.registerform)
  }
  
 private calAge(control: AbstractControl): ValidationErrors | null { //control is the variable of type abstractcontrol
    //const dob_year=control.get('dob').value

    const dob = new Date(control.value);
    const curr_yr = new Date();

    let age = curr_yr.getFullYear() - dob.getFullYear();
    if(dob.getMonth()<curr_yr.getMonth()){
       age=age-1
    }
    else if(dob.getMonth()==curr_yr.getMonth()){
      if(dob.getDate()<curr_yr.getDate()){
        age=age-1
      }
    }
    if (age >= 18) {
      return null;
    } else {
      return { ageValid: true };//it is returning validationerror
    }
  }
  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {

    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password === confirmPassword) {
      return null;
    } else {
      return { passwordMismatch: true };
    }
  }
  public handleSubmit():null{
    if(this.registerForm.invalid){
      return null
    }
    console.log(this.registerForm.value)
    return null
  }
  private emailValidator(control: AbstractControl):ValidationErrors | null{
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const email=control.value;
    if(regex.test(email)){
      return null
    }else{
      return {invalidEmail:true}
    }
  }
}

