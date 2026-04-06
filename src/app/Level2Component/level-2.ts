import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-level-2',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './level-2.html',
  styleUrl: './level-2.css',
})
export class Level2Component {
  public applicationForm!: FormGroup;
  public submittedData: any = null;
  public skillsList!: FormArray;

  constructor(private fb: FormBuilder) {

    this.skillsList = this.fb.array([]);
    this.applicationForm = this.fb.group({
      personalDetails: this.fb.group({
        name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^\d[0-9]{9}$/)]],
      }),
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        pincode: ['', Validators.required],
      }),
      experience: this.fb.group({
        yearsOfExp: [0, Validators.required],
        currentRole: ['', Validators.required],
        skills: this.skillsList,
      }),
    });

    this.applicationForm.get(['personalDetails', 'email'])?.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value) => {
        console.log('Email changed:', value);
    });
  }

  public get skills(): FormArray {
    return this.applicationForm.get(['experience', 'skills']) as FormArray;
  }

  public addSkill(): void {
    this.skillsList.push(this.fb.control('', Validators.required));
  }

  public removeSkill(index: number): void {
    this.skillsList.removeAt(index);
  }

  public onSubmit(): void {
    if (this.applicationForm.valid) {
      this.submittedData = this.applicationForm.value;
    }
  }
}


