import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-level-2',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './level-2.html',
  styleUrl: './level-2.css',
})
export class Level2Component implements OnInit {
  applicationForm!: FormGroup;
  submittedData: any = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.applicationForm = this.fb.group({
      personalDetails: this.fb.group({
        name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
        email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
        phone: ['', Validators.required],
      }),
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        pincode: ['', Validators.required],
      }),
      experience: this.fb.group({
        yearsOfExp: ['', Validators.required],
        currentRole: ['', Validators.required],
        skills: this.fb.array([]),
      }),
    });

    this.applicationForm.get(['personalDetails', 'email'])?.valueChanges.subscribe((value) => {
      console.log('Email changed:', value);
    });
  }

  get skills(): FormArray {
    return this.applicationForm.get(['experience', 'skills']) as FormArray;
  }

  addSkill(): void {
    this.skills.push(this.fb.control('', Validators.required));
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

  onSubmit(): undefined {
    console.log("this.applicationForm")
    if (this.applicationForm.valid) {
      this.submittedData = this.applicationForm.value;
    }
  }
}
