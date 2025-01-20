import { Component, Input, Self } from '@angular/core';
import { NgControl, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatError, MatFormField, MatLabel, MatOption, MatSelect, MatSelectChange, MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-select-input',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.scss'
})
export class SelectInputComponent {
  @Input() label = '';
  @Input() options: string[] = []

  value: string = '';
  onChange: any = () => { };
  onTouched: any = () => { };

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  onSelect(event: MatSelectChange) {
    this.value = event.value;
    this.onChange(this.value);
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
