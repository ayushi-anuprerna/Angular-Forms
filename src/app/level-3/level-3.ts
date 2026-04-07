import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, AsyncValidatorFn, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { delay, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-level-3',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './level-3.html',
  styleUrls: ['./level-3.css'],
})
export class Level3Component {
  public productForm: FormGroup

  public categories: string[] = ['Electronics', 'Books', 'Clothing', 'Home', 'Toys', 'Furniture', 'Sports'];

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      sku: ['', [Validators.required, Validators.pattern(/^PRD-\d{4}$/)], [this.skuAsyncValidator()]],
      price: ['', [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      category: ['', [Validators.required]],
      tags: this.fb.array([])
    })
  }

  private skuAsyncValidator(): AsyncValidatorFn {
    const takenSkus = ['PRD-0001', 'PRD-0002'];

    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return of(control.value).pipe(
        delay(500),
        map((value) => {
          return takenSkus.includes(value)
            ? { skuTaken: true }
            : null;
        })
      );
    };
  }

  public get tags() {
    return this.productForm.get('tags') as FormArray;
  }

  public addTag() {
    this.tags.push(this.fb.control(''));
  }

  public removeTag(index: number) {
    this.tags.removeAt(index);
  }

  public onSubmit() {
    if(this.productForm.invalid) return;
    
    console.log(this.productForm.value)

    this.productForm.disable();

    setTimeout(() => {
      this.productForm.enable();
      this.productForm.reset();
    }, 2000);
  }
}
