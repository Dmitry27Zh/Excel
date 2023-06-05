import { getStyleCSS } from '@core/utils'

const HeadContent = {
  A: 'A'.codePointAt(),
  Z: 'Z'.codePointAt(),
}

const createCell = (
    content,
    resizeData,
    colIndex,
    rowIndex,
    contenteditable = 'true',
    extraClassName = 'table__cell',
    isResize = false,
) => {
  const colAttr = colIndex == null ? '' : `data-col="${colIndex}"`
  const rowAttr = rowIndex == null ? '' : `data-row="${rowIndex}"`
  const resizeAttr = isResize ? 'data-resize' : ''
  const dataCellAttr = colIndex == null || rowIndex == null ? '' : 'data-cell'
  const width = resizeData.col?.[colIndex]
  const height = resizeData.row?.[rowIndex]
  const style = {
    width: width == null ? '' : `${width}px`,
    height: height == null ? '' : `${height}px`,
  }
  const styleAttr = `style="${getStyleCSS(style)}"`

  return `
    <div class="cell ${extraClassName}"
        ${resizeAttr}
        ${dataCellAttr}
        ${colAttr}
        ${rowAttr}
        ${styleAttr}
        contenteditable="${contenteditable}"><div class="cell__data">${content}</div></div>`
}

const createResizer = (type) => `<div class="table__resizer" data-resizer="${type}"></div>`

const createHead = (content, resizeData, colIndex) => {
  const resizer = createResizer('col')
  content = `${content}${resizer}`
  const extraClassName = 'table__cell table__head'
  const rowIndex = null
  const contenteditable = 'false'
  const isResize = true

  return createCell(
      content,
      resizeData,
      colIndex,
      rowIndex,
      contenteditable,
      extraClassName,
      isResize
  )
}

const createHeads = (
    colsCount = HeadContent.Z - HeadContent.A + 1,
    resizeData
) => {
  const contentList = Array.from({ length: colsCount }, (_, index) => {
    return String.fromCodePoint(HeadContent.A + index)
  })

  return contentList.map((content, index) =>
    createHead(content, resizeData, index)).join('')
}

const createInfo = (content, rowIndex, resizeData) => {
  const resizer = content ? createResizer('row') : ''
  content = `${content}${resizer}`
  const extraClassName = 'table__info'
  const colIndex = null
  const contenteditable = 'false'
  const isResize = true

  return createCell(
      content,
      resizeData,
      colIndex,
      rowIndex,
      contenteditable,
      extraClassName,
      isResize
  )
}

const createRow = (infoContent, cells, rowIndex, resizeData) => {
  const info = createInfo(infoContent, rowIndex, resizeData)

  return `
    <div class="table__row">
      ${info}
      <div class="table__data">
        ${cells}
      </div>
    </div>`
}

const createServiceRow = (colsCount, resizeData) => {
  const infoContent = ''
  const cells = createHeads(colsCount, resizeData)
  const rowIndex = null

  return createRow(infoContent, cells, rowIndex, resizeData)
}

const createDataRow = (infoContent, contentList, rowIndex, resizeData) => {
  const cells = contentList
      .map((content, colIndex) =>
        createCell(content, resizeData, colIndex, rowIndex))
      .join('')

  return createRow(infoContent, cells, rowIndex, resizeData)
}

const createDataRows = (data, resizeData) => {
  return data.map((cells, rowIndex) => {
    const infoContent = rowIndex + 1
    const mainRow = createDataRow(infoContent, cells, rowIndex, resizeData)

    return mainRow
  })
}

const createTable = (
    data,
    resizeData
) => {
  const colsCount = data[0].length
  const serviceRow = createServiceRow(colsCount, resizeData)
  const dataRows = createDataRows(data, resizeData)

  return `<div class="table__box">${[serviceRow, ...dataRows].join('')}</div>`
}

export { createTable }
