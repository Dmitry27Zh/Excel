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
    if (event.target.dataset.resizer) {
      this.startResize(event)
    }
  }

  onMousemove(event) {
    this.resize(event)
  }

  onMouseup(event) {
    this.stopResize(event)
  }

  onMouseleave(event) {
    this.stopResize(event)
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
    this.resizer.$el.classList.add('is-active')
    this.addListener('mousemove')
    this.addListener('mouseup')
    this.addListener('mouseleave')
  }

  resize(event) {
    event.preventDefault()
    this.resizer.geometry.move.x = event.clientX -
      this.resizer.geometry.startCoords.x
    this.resizer.geometry.move.y = event.clientY -
      this.resizer.geometry.startCoords.y

    const { x, y } = this.resizer.geometry.move

    switch (this.resizer.$el.dataset.resizer) {
      case 'col':
        this.resizer.$el.style.transform = `translateX(${x}px)`
        break
      case 'row':
        this.resizer.$el.style.transform = `translateY(${y}px)`
        break
    }
  }

  stopResize(event) {
    event.preventDefault()
    this.$root.$el.style.setProperty(
        '--table-height',
        null
    )
    this.$root.$el.style.setProperty(
        '--table-width',
        null
    )
    this.resizer.$el.style.transform = null
    this.resizer.$el.classList.remove('is-active')
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
    this.removeListener('mouseleave')
  }
}
