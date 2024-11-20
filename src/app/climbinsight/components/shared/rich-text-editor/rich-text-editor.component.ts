import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';

@Component({
  selector: 'app-rich-text-editor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    EditorModule
  ],
  template: `
    <p-editor [(ngModel)]="value"
              [style]="{'height': '200px'}"
              [placeholder]="placeholder"
              (ngModelChange)="onValueChange($event)">
        <ng-template pTemplate="header">
            <span class="ql-formats">
                <select class="ql-header">
                    <option value="1">Heading</option>
                    <option value="2">Subheading</option>
                    <option selected>Normal</option>
                </select>
            </span>
            <span class="ql-formats">
                <button type="button" class="ql-bold" aria-label="Bold"></button>
                <button type="button" class="ql-italic" aria-label="Italic"></button>
                <button type="button" class="ql-underline" aria-label="Underline"></button>
                <button type="button" class="ql-strike" aria-label="Strike"></button>
            </span>
            <span class="ql-formats">
                <select class="ql-color"></select>
                <select class="ql-background"></select>
            </span>
            <span class="ql-formats">
                <button type="button" class="ql-list" value="ordered" aria-label="Ordered List"></button>
                <button type="button" class="ql-list" value="bullet" aria-label="Bullet List"></button>
                <select class="ql-align">
                    <option selected></option>
                    <option value="center"></option>
                    <option value="right"></option>
                    <option value="justify"></option>
                </select>
            </span>
            <span class="ql-formats">
                <button type="button" class="ql-link" aria-label="Link"></button>
                <button type="button" class="ql-code-block" aria-label="Code Block"></button>
            </span>
            <span class="ql-formats">
                <button type="button" class="ql-clean" aria-label="Clean"></button>
            </span>
        </ng-template>
    </p-editor>
  `,
  styleUrls: ['./rich-text-editor.component.scss']
})
export class RichTextEditorComponent {
  @Input() value: string = '';
  @Input() placeholder: string = 'Enter text...';
  @Output() valueChange = new EventEmitter<string>();

  onValueChange(newValue: string) {
    this.valueChange.emit(newValue);
  }
}
