import { ExcelComponent } from '@core/excel-component';
import { createTable } from '@/components/table/table.template';

export class Table extends ExcelComponent {
  static className = 'excel__table table'

  constructor($root) {
    super($root, {
      name: 'Table',
      eventTypes: ['click', 'mousedown'],
    })

    this.$box = $root.$el.firstElementChild
    this.resizer = {
      $el: null,
      geometry: {
        startCoords: {
          x: 0,
          y: 0,
        },
        move: {
          x: 0,
          y: 0,
        },
      },
    }
  }

  onClick(event) {
    console.log(`Click! ${event.target}`);
  }

  toHTML() {
    return createTable()
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      this.startResize(event)
    }
  }

  onMousemove(event) {
    this.resize(event)
  }

  onMouseup() {
    this.stopResize()
  }

  startResize(event) {
    event.preventDefault()
    this.$root.$el.style.setProperty(
        '--table-height',
        this.$box.offsetHeight
    )
    this.$root.$el.style.setProperty(
        '--table-width',
        this.$box.offsetWidth
    )
    this.resizer.$el = event.target
    this.resizer.geometry.startCoords = {
      x: event.clientX,
      y: event.clientY,
    }
    this.addListener('mousemove')
    this.addListener('mouseup')
  }

  resize(event) {
    this.resizer.geometry.move.x = event.clientX -
      this.resizer.geometry.startCoords.x
    this.resizer.geometry.move.y = event.clientY -
      this.resizer.geometry.startCoords.y

    const { x, y } = this.resizer.geometry.move

    switch (this.resizer.$el.dataset.resize) {
      case 'col':
        this.resizer.$el.style.transform = `translateX(${x}px)`
        break
      case 'row':
        this.resizer.$el.style.transform = `translateY(${y}px)`
        break
    }
  }

  stopResize() {
    this.$root.$el.style.setProperty(
        '--table-height',
        null
    )
    this.$root.$el.style.setProperty(
        '--table-width',
        null
    )
    this.resizer.$el.style.transform = null
    this.resizer.$el = null
    this.resizer.geometry.startCoords = {
      x: 0,
      y: 0,
    }
    this.resizer.geometry.move = {
      x: 0,
      y: 0,
    }
    this.removeListener('mousemove')
    this.removeListener('mouseup')
  }

  checkResizeArea(event) {
    const elementsUnderPointer = document.elementsFromPoint(
        event.clientX,
        event.clientY
    )

    return elementsUnderPointer.includes(this.$box)
  }
}
