import { throttle } from '@core/utils';
import { Table } from './table';

export class Resizer {
  static TIMEOUT = 30
  static isResizer = ($el) => !!$el.dataset.resizer

  constructor(table) {
    this.table = table
    this.$el = null
    this.$table = table.$root.$el
    this.$tableBox = table.$box
    this.startCoords = {
      x: 0,
      y: 0,
    }
    this.offset = {
      x: 0,
      y: 0,
    }
    this.move = throttle(this.move, Resizer.TIMEOUT)
  }

  start(event) {
    event.preventDefault()
    this.$table.style.setProperty(
        '--table-height',
        this.$tableBox.offsetHeight
    )
    this.$table.style.setProperty(
        '--table-width',
        this.$tableBox.offsetWidth
    )
    this.$el = event.target
    this.startCoords = {
      x: event.clientX,
      y: event.clientY,
    }
    this.$el.classList.add('is-active')
    this.table.addListener('mousemove')
    this.table.addListener('mouseup')
    this.table.addListener('mouseleave')
  }

  move(event) {
    if (this.$el) {
      event.preventDefault()
      this.offset.x = event.clientX - this.startCoords.x
      this.offset.y = event.clientY - this.startCoords.y

      const { x, y } = this.offset
      const type = this.$el.dataset.resizer

      switch (type) {
        case 'col':
          this.$el.style.transform = `translateX(${x}px)`
          break
        case 'row':
          this.$el.style.transform = `translateY(${y}px)`
          break
        default:
          throw new Error(`Unknown type of resizer!`)
      }
    }
  }

  async resize() {
    const $cell = this.$el.closest(Table.Selector.RESIZE)
    const type = this.$el.dataset.resizer
    let data

    switch (type) {
      case 'col':
        data = await this.resizeCol($cell)
        break
      case 'row':
        data = await this.resizeRow($cell)
        break
      default:
        throw new Error(`Unknown type of resizer!`)
    }

    return data
  }

  async resizeCol($cell) {
    const currentCellWidth = $cell.offsetWidth
    const newCellWidth = currentCellWidth + this.offset.x
    const colNumber = $cell.dataset.col
    const $dataCellsInCol = this.table.$cols[colNumber]
    const $cellsToResize = $dataCellsInCol.concat($cell)
    $cellsToResize.forEach(($cell) => $cell.style.width = `${newCellWidth}px`)

    return {
      col: {
        [colNumber]: newCellWidth,
      },
    }
  }

  async resizeRow($cell) {
    const currentRowHeight = $cell.offsetHeight
    const newCellHeight = currentRowHeight + this.offset.y
    const rowNumber = $cell.dataset.row
    const $dataCellsInRow = this.table.$rows[rowNumber]
    const $cellsToResize = $dataCellsInRow.concat($cell)
    $cellsToResize.forEach(($cell) => $cell.style.height = `${newCellHeight}px`)

    return {
      row: {
        [rowNumber]: newCellHeight,
      },
    }
  }

  async stop(event) {
    try {
      event.preventDefault()
      const data = await this.resize(event)
      this.$el.style.setProperty(
          '--table-height',
          null
      )
      this.$el.style.setProperty(
          '--table-width',
          null
      )
      this.$el.style.transform = null
      this.$el.classList.remove('is-active')
      this.$el = null
      this.startCoords = {
        x: 0,
        y: 0,
      }
      this.offset = {
        x: 0,
        y: 0,
      }
      this.table.removeListener('mousemove')
      this.table.removeListener('mouseup')
      this.table.removeListener('mouseleave')

      return data
    } catch (e) {
      console.error(`Failed resize stop! ${e}`)
    }
  }
}
