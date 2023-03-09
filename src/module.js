console.log('Module')

async function start() {
  const result = await Promise.resolve('Start')
  return result
}

start().then((msg) => console.log(msg))
