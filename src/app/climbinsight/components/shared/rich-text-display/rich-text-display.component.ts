import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rich-text-display',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ql-editor" [innerHTML]="content || 'No content available.'"></div>
  `,
  styleUrls: ['./rich-text-display.component.scss']
})
export class RichTextDisplayComponent {
  @Input() content: string = '';
}
