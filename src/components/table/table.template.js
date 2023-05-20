const HeadContent = {
  A: 'A'.codePointAt(),
  Z: 'Z'.codePointAt(),
}

const createCell = (
    content,
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

  return `
    <div class="cell ${extraClassName}" ${resizeAttr} ${dataCellAttr} ${colAttr} ${rowAttr}>
        <div class="cell__data" contenteditable="${contenteditable}">${content}</div>
      </div>`
}

const createResizer = (type) => `<div class="table__resizer" data-resizer="${type}"></div>`

const createHead = (content, colIndex) => {
  const resizer = createResizer('col')
  content = `${content}${resizer}`
  const extraClassName = 'table__cell table__head'
  const rowIndex = null
  const contenteditable = 'false'
  const isResize = true

  return createCell(
      content,
      colIndex,
      rowIndex,
      contenteditable,
      extraClassName,
      isResize
  )
}

const createHeads = (colsCount = HeadContent.Z - HeadContent.A + 1) => {
  const contentList = Array.from({ length: colsCount }, (_, index) => {
    return String.fromCodePoint(HeadContent.A + index)
  })

  return contentList.map(createHead).join('')
}

const createInfo = (content, rowIndex) => {
  const resizer = content ? createResizer('row') : ''
  content = `${content}${resizer}`
  const extraClassName = 'table__info'
  const colIndex = null
  const contenteditable = 'false'
  const isResize = true

  return createCell(
      content,
      colIndex,
      rowIndex,
      contenteditable,
      extraClassName,
      isResize
  )
}

const createRow = (infoContent, cells, rowIndex) => {
  const info = createInfo(infoContent, rowIndex)

  return `
    <div class="table__row">
      ${info}
      <div class="table__data">
        ${cells}
      </div>
    </div>`
}

const createServiceRow = (colsCount) => {
  const infoContent = ''
  const cells = createHeads(colsCount)
  const rowIndex = null

  return createRow(infoContent, cells, rowIndex)
}

const createDataRow = (infoContent, contentList, rowIndex) => {
  const cells = contentList
      .map((content, colIndex) => createCell(content, colIndex, rowIndex))
      .join('')

  return createRow(infoContent, cells, rowIndex)
}

const createDataRows = (data) => {
  return data.map((cells, rowIndex) => {
    const infoContent = rowIndex + 1
    const mainRow = createDataRow(infoContent, cells, rowIndex)

    return mainRow
  })
}

const createTable = (data = [['', '', ''], ['', '', ''], ['', '', '']]) => {
  const colsCount = data[0].length
  const serviceRow = createServiceRow(colsCount)
  const dataRows = createDataRows(data)

  return `<div class="table__box">${[serviceRow, ...dataRows].join('')}</div>`
}

export { createTable }
