const Head = {
  A: 'A'.codePointAt(),
  Z: 'Z'.codePointAt(),
}

const createHead = (head) => {
  return `
    <div class="table__cell table__head cell">${head}</div>`
}

const createHeads = () => {
  const headsCount = Head.Z - Head.A + 1
  const heads = Array.from({ length: headsCount }, (_, index) => {
    return String.fromCodePoint(Head.A + index)
  })

  return heads.map(createHead).join('')
}

const createCell = (cell) => {
  return `
    <div class="table__cell cell" contenteditable>${cell}</div>`
}

const createCells = (cells = ['Exc1', 'Exc2', 'Exc3']) => {
  return cells.map(createCell).join('')
}

const createRow = (info, data) => {
  return `
    <div class="table__row">
      <div class="table__info cell">${info}</div>
      <div class="table__data">
        ${data}
      </div>
    </div>`
}

const createServiceRow = () => {
  const info = ''
  const data = createHeads()

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
  const serviceRow = createServiceRow()
  const mainRows = createMainRows(rows)

  return [serviceRow, ...mainRows].join('')
}

export { createTable }
