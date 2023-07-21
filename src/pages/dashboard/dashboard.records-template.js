import { storage } from '@/core/storage'
import { PageMeta } from '@core/constants'

const getRecordTemplate = ({
  title,
  date,
  id,
}) => {
  date = new Date(date).toLocaleDateString('ru-RU')

  return `
    <li class="record">
      <a class="record__link" href="#${PageMeta.EXCEL.name}/${id}">
        <h3 class="record__title">${title}</h3>
        <time class="record__time" datetime="${date}">${date}</time>
      </a>
    </li>
  `
}

const getRecords = () => {
  const keys = storage.getAllKeys('excel')

  return storage.getValues(keys)
}

export const getRecordsTemplate = () => {
  const records = getRecords()

  return records.map(getRecordTemplate).join('')
}
