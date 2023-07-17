export const parse = (text = '') => {
  if (text.startsWith('=')) {
    try {
      return String(eval(text.slice(1)))
    } catch (e) {
      console.warn('Skipped eval error', e.message)
    }
  }

  return text
}
