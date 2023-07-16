import { getStyleCSS } from '@core/utils'

const HeadContent = {
  A: 'A'.codePointAt(),
  Z: 'Z'.codePointAt(),
}

const createCell = (
    content,
    resize,
    col,
    row,
    tools = null,
    contenteditable = 'true',
    extraClassName = 'table__cell',
    isResize = false,
) => {
  const colAttr = col == null ? '' : `data-col="${col}"`
  const rowAttr = row == null ? '' : `data-row="${row}"`
  const resizeAttr = isResize ? 'data-resize' : ''
  const dataCellAttr = col == null || row == null ? '' : 'data-cell'
  const width = resize.col?.[col]
  const height = resize.row?.[row]
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

const createInfo = (content, row, resize) => {
  const resizer = content ? createResizer('row') : ''
  content = `${content}${resizer}`
  const extraClassName = 'table__info'
  const col = null
  const tools = null
  const contenteditable = 'false'
  const isResize = true

  return createCell(
      content,
      resize,
      col,
      row,
      tools,
      contenteditable,
      extraClassName,
      isResize
  )
}

const createRow = (infoContent, cells, row, resize) => {
  const info = createInfo(infoContent, row, resize)

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
  const row = null

  return createRow(infoContent, cells, row, resize)
}

const createDataRow = (infoContent, rowContent, tools, row, resize) => {
  const cells = rowContent
      .map((content, col) => {
        const currentTools = tools[row][col]

        return createCell(content, resize, col, row, currentTools)
      })
      .join('')

  return createRow(infoContent, cells, row, resize)
}

const createDataRows = (content, tools, resize) => {
  return content.map((rowContent, row) => {
    const infoContent = row + 1
    const dataRow = createDataRow(infoContent, rowContent, tools, row, resize)

    return dataRow
  })
}

const createTable = (
    content,
    tools,
    resize
) => {
  const colsCount = content[0].length
  const serviceRow = createServiceRow(colsCount, resize)
  const dataRows = createDataRows(content, tools, resize)

  return `<div class="table__box">${[serviceRow, ...dataRows].join('')}</div>`
}

export { createTable }
