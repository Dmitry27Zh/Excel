const Head = {
  A: 'A'.codePointAt(),
  Z: 'Z'.codePointAt(),
}

const createCell = (
    data,
    colNumber,
    rowNumber,
    contenteditable = 'true',
    extraClassName = 'table__cell',
) => {
  return `
    <div class="cell ${extraClassName}" contenteditable="${contenteditable}"
      data-col="${colNumber}" data-row="${rowNumber}">${data}</div>`
}

const createResizer = (type) => `<div class="table__resizer" data-resizer="${type}"></div>`

const createHead = (headData, colNumber) => {
  const resizer = createResizer('col')
  const cellData = `${headData}${resizer}`
  const extraClassName = 'table__cell table__head'
  const rowNumber = ''
  const contenteditable = 'false'

  return createCell(
      cellData,
      colNumber,
      rowNumber,
      contenteditable,
      extraClassName
  )
}

const createHeads = (headsCount = Head.Z - Head.A + 1) => {
  const headsData = Array.from({ length: headsCount }, (_, index) => {
    return String.fromCodePoint(Head.A + index)
  })

  return headsData.map(createHead).join('')
}

const createInfo = (infoData, rowNumber) => {
  const resizer = infoData ? createResizer('row') : ''
  const cellData = `${infoData}${resizer}`
  const extraClassName = 'table__info'
  const colNumber = ''
  const contenteditable = 'false'

  return createCell(
      cellData,
      colNumber,
      rowNumber,
      contenteditable,
      extraClassName
  )
}

const createRow = (infoData, data, rowNumber = '') => {
  return `
    <div class="table__row">
      ${createInfo(infoData, rowNumber)}
      <div class="table__data">
        ${data}
      </div>
    </div>`
}

const createServiceRow = (headsCount) => {
  const info = ''
  const data = createHeads(headsCount)

  return createRow(info, data)
}

const createCells = (cellsData = ['Exc1', 'Exc2', 'Exc3'], rowNumber) => {
  return cellsData
      .map((cellData, colNumber) => createCell(cellData, colNumber, rowNumber))
      .join('')
}

const createMainRow = (info, cells, rowNumber) => {
  const data = createCells(cells, rowNumber)

  return createRow(info, data, rowNumber)
}

const createMainRows = (rows) => {
  return rows.map((cells, index) => {
    const info = index + 1
    const mainRow = createMainRow(info, cells, index)

    return mainRow
  })
}

const createTable = (rows = [['', '', ''], ['', '', ''], ['', '', '']]) => {
  const serviceRow = createServiceRow(rows[0].length)
  const mainRows = createMainRows(rows)

  return `<div class="table__box">${[serviceRow, ...mainRows].join('')}</div>`
}

export { createTable }
