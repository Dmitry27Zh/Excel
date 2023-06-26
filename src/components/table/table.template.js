import { getStyleCSS } from '@core/utils'

const HeadContent = {
  A: 'A'.codePointAt(),
  Z: 'Z'.codePointAt(),
}

const createCell = (
    content,
    resize,
    colIndex,
    rowIndex,
    tools = null,
    contenteditable = 'true',
    extraClassName = 'table__cell',
    isResize = false,
) => {
  const colAttr = colIndex == null ? '' : `data-col="${colIndex}"`
  const rowAttr = rowIndex == null ? '' : `data-row="${rowIndex}"`
  const resizeAttr = isResize ? 'data-resize' : ''
  const dataCellAttr = colIndex == null || rowIndex == null ? '' : 'data-cell'
  const width = resize.col?.[colIndex]
  const height = resize.row?.[rowIndex]
  const style = {
    width: width == null ? '' : `${width}px`,
    height: height == null ? '' : `${height}px`,
  }
  const dataStyle = {
    ...tools,
  }
  const styleAttr = `style="${getStyleCSS(style)}"`
  const dataStyleAttr = `style="${getStyleCSS(dataStyle)}"`


  return `
    <div class="cell ${extraClassName}"
        ${resizeAttr}
        ${dataCellAttr}
        ${colAttr}
        ${rowAttr}
        ${styleAttr}
        contenteditable="${contenteditable}"><div class="cell__data" ${dataStyleAttr}>${content}</div></div>`
}

const createResizer = (type) => `<div class="table__resizer" data-resizer="${type}"></div>`

const createHead = (content, resize, colIndex) => {
  const resizer = createResizer('col')
  content = `${content}${resizer}`
  const extraClassName = 'table__cell table__head'
  const rowIndex = null
  const tools = null
  const contenteditable = 'false'
  const isResize = true

  return createCell(
      content,
      resize,
      colIndex,
      rowIndex,
      tools,
      contenteditable,
      extraClassName,
      isResize
  )
}

const createHeads = (
    colsCount = HeadContent.Z - HeadContent.A + 1,
    resize
) => {
  const contentList = Array.from({ length: colsCount }, (_, index) => {
    return String.fromCodePoint(HeadContent.A + index)
  })

  return contentList.map((content, index) =>
    createHead(content, resize, index)).join('')
}

const createInfo = (content, rowIndex, resize) => {
  const resizer = content ? createResizer('row') : ''
  content = `${content}${resizer}`
  const extraClassName = 'table__info'
  const colIndex = null
  const tools = null
  const contenteditable = 'false'
  const isResize = true

  return createCell(
      content,
      resize,
      colIndex,
      rowIndex,
      tools,
      contenteditable,
      extraClassName,
      isResize
  )
}

const createRow = (infoContent, cells, rowIndex, resize) => {
  const info = createInfo(infoContent, rowIndex, resize)

  return `
    <div class="table__row">
      ${info}
      <div class="table__data">
        ${cells}
      </div>
    </div>`
}

const createServiceRow = (colsCount, resize) => {
  const infoContent = ''
  const cells = createHeads(colsCount, resize)
  const rowIndex = null

  return createRow(infoContent, cells, rowIndex, resize)
}

const createDataRow = (infoContent, row, rowIndex, resize) => {
  const cells = row
      .map((cell, colIndex) => {
        const { content, tools } = cell
        return createCell(content, resize, colIndex, rowIndex, tools)
      })
      .join('')

  return createRow(infoContent, cells, rowIndex, resize)
}

const createDataRows = (cells, resize) => {
  return cells.map((row, index) => {
    const infoContent = index + 1
    const mainRow = createDataRow(infoContent, row, index, resize)

    return mainRow
  })
}

const createTable = (
    cells,
    resize
) => {
  const colsCount = cells[0].length
  const serviceRow = createServiceRow(colsCount, resize)
  const dataRows = createDataRows(cells, resize)

  return `<div class="table__box">${[serviceRow, ...dataRows].join('')}</div>`
}

export { createTable }
