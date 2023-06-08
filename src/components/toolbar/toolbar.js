import { ExcelComponent } from '@core/excel-component';
import { createToolbar } from '@/components/toolbar/toolbar.template';

export class Toolbar extends ExcelComponent {
  static CLASS_NAME = 'excel__toolbar toolbar'
  static BUTTONS = [
    {
      type: 'align left',
      content: '<span class="material-icons">format_align_left</span>',
    },
    {
      type: 'align center',
      content: '<span class="material-icons">format_align_center</span>',
    },
    {
      type: 'align right',
      content: '<span class="material-icons">format_align_right</span>',
    },
    {
      type: 'bold',
      content: '<span class="material-icons">format_bold</span>',
    },
    {
      type: 'italic',
      content: '<span class="material-icons">format_italic</span>',
    },
    {
      type: 'underline',
      content: '<span class="material-icons">format_underline</span>',
    },
  ]

  toHTML() {
    return createToolbar(Toolbar.BUTTONS)
  }
}
