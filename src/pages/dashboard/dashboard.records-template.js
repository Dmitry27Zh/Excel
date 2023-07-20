import { storage } from '@/core/storage'

const getRecordTemplate = ({
  title,
  date,
}) => {
  date = new Date(date).toLocaleDateString('ru-RU')

  return `
    <li class="record">
      <a class="record__link" href="#">
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
