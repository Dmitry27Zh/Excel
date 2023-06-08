import { ExcelComponent } from '@core/excel-component';
import { createToolbar } from '@/components/toolbar/toolbar.template';
import { BUTTON_ATTR } from '@/components/toolbar/toolbar.template';

export class Toolbar extends ExcelComponent {
  static CLASS_NAME = 'excel__toolbar toolbar'
  static Selector = {
    BUTTON: `[${BUTTON_ATTR}]`,
  }
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

  constructor(...args) {
    super(...args)
    this.eventTypes = ['click']
  }

  toHTML() {
    return createToolbar(Toolbar.BUTTONS)
  }

  onClick(event) {
    if (event.target.matches(Toolbar.Selector.BUTTON)) {
      const button = event.target.closest(Toolbar.Selector.BUTTON)
      this.changeTool(button)
    }
  }

  changeTool(button) {
    const value = button.dataset.value
    console.log(value)
  }
}
