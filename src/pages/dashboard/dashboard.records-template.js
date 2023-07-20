const getRecordTemplate = () => {
  return `
    <li class="record">
      <a class="record__link" href="#">
        <h3 class="record__title">Таблица 1</h3>
        <time class="record__time" datetime="12.12.2022">12.12.2022</time>
      </a>
    </li>
  `
}

export const getRecordsTemplate = () => {
  const records = [{}, {}, {}]

  return records.map(getRecordTemplate).join('')
}
