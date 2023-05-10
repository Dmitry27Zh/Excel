import { ExcelComponent } from '@core/excel-component';
import { createTable } from '@/components/table/table.template';
import { throttle } from '../../core/utils';

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
      timeout: 30,
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

    this.$cells = [...this.$box.querySelectorAll(
        '.cell:is([data-col], [data-row])'
    )],
    this.$cols = this.$cells.reduce((result, $cell) => {
      const colNumber = $cell.dataset.col

      if (!colNumber) {
        return result
      }

      if (result[colNumber]) {
        result[colNumber].push($cell)
      } else {
        result[colNumber] = [$cell]
      }

      return result
    }, [])
    this.$rows = this.$cells.reduce((result, $cell) => {
      const rowNumber = $cell.dataset.row

      if (!rowNumber) {
        return result
      }

      if (result[rowNumber]) {
        result[rowNumber].push($cell)
      } else {
        result[rowNumber] = [$cell]
      }

      return result
    }, [])

    this.moveResizer = throttle(this.moveResizer, this.resizer.timeout)
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
    this.moveResizer(event)
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

  moveResizer(event) {
    event.preventDefault()

    if (this.resizer.$el) {
      this.resizer.geometry.move.x = event.clientX -
      this.resizer.geometry.startCoords.x
      this.resizer.geometry.move.y = event.clientY -
      this.resizer.geometry.startCoords.y

      const { x, y } = this.resizer.geometry.move
      const type = this.resizer.$el.dataset.resizer

      switch (type) {
        case 'col':
          this.resizer.$el.style.transform = `translateX(${x}px)`
          break
        case 'row':
          this.resizer.$el.style.transform = `translateY(${y}px)`
          break
        default:
          throw new Error(`Unknown type of resizer!`)
      }
    }
  }

  resize() {
    const $cell = this.resizer.$el.parentElement
    const type = this.resizer.$el.dataset.resizer

    switch (type) {
      case 'col':
        this.resizeCol($cell)
        break
      case 'row':
        this.resizeRow($cell)
        break
      default:
        throw new Error(`Unknown type of resizer!`)
    }
  }

  resizeCol($cell) {
    const currentCellWidth = $cell.offsetWidth
    const newCellWidth = currentCellWidth + this.resizer.geometry.move.x
    const colNumber = $cell.dataset.col
    const $cellsInCol = this.$cols[colNumber]
    $cellsInCol.forEach(($cell) => $cell.style.width = `${newCellWidth}px`)
  }

  resizeRow($cell) {
    const currentRowHeight = $cell.offsetHeight
    const newCellHeight = currentRowHeight + this.resizer.geometry.move.y
    const rowNumber = $cell.dataset.row
    const $cellsInRow = this.$rows[rowNumber]
    $cellsInRow.forEach(($cell) => $cell.style.height = `${newCellHeight}px`)
  }

  stopResize(event) {
    event.preventDefault()
    this.resize()
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
