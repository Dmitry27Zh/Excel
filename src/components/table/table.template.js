const Head = {
  A: 'A'.codePointAt(),
  Z: 'Z'.codePointAt(),
}

const createResizer = (type) => `<div class="table__resizer" data-resizer="${type}"></div>`

const createHead = (head, colNumber) => {
  return `
    <div class="table__cell table__head cell" data-col="${colNumber}">
      ${head}
      ${createResizer('col')}
    </div>`
}

const createHeads = (headsCount = Head.Z - Head.A + 1) => {
  const heads = Array.from({ length: headsCount }, (_, index) => {
    return String.fromCodePoint(Head.A + index)
  })

  return heads.map(createHead).join('')
}

const createCell = (cell, colNumber) => {
  return `
    <div class="table__cell cell" contenteditable data-col="${colNumber}">${cell}</div>`
}

const createCells = (cells = ['Exc1', 'Exc2', 'Exc3']) => {
  return cells.map(createCell).join('')
}

const createRow = (info, data) => {
  const resizer = info ? createResizer('row') : ''

  return `
    <div class="table__row">
      <div class="table__info cell">
        ${info}
        ${resizer}
      </div>
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

const createMainRow = (info, cells) => {
  const data = createCells(cells)

  return createRow(info, data)
}

const createMainRows = (rows) => {
  return rows.map((cells, index) => {
    const info = index + 1
    const mainRow = createMainRow(info, cells)

    return mainRow
  })
}

const createTable = (rows = [['', '', ''], ['', '', ''], ['', '', '']]) => {
  const serviceRow = createServiceRow(rows[0].length)
  const mainRows = createMainRows(rows)

  return `<div class="table__box">${[serviceRow, ...mainRows].join('')}</div>`
}

export { createTable }
