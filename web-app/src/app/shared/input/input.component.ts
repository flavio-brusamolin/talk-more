import { Component, forwardRef, Input } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true
  }]
})
export class InputComponent implements ControlValueAccessor {
  @Input() label: string
  @Input() name: string
  @Input() type: string

  private propagateChange = (_: string): void => { }

  registerOnChange (fn: any): void {
    this.propagateChange = fn
  }

  updateValue (value: string): void {
    this.propagateChange(value)
  }

  writeValue (_: string): void { }
  registerOnTouched (_: any): void { }
}
