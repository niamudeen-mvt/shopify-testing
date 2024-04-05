export const roundTo99 = number => Math.floor(number) + 0.99

export const replaceSpaces = (string, pastedChar) => string.trim().replaceAll(' ', pastedChar)

export const wait = async time => await new Promise(resolve => setTimeout(resolve, time))

export const getRandomBetween = (min = 1, max = 100) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const batchRequests = async (promises, batchSize = 10, delay) => {
  const result = []

  for (let i = 0; i < promises.length; i += batchSize) {
    const batch = promises.slice(i, i + batchSize)
    const batchResult = await Promise.all(batch.map(fn => fn()))
    result.push(...batchResult)

    if (i + batchSize >= promises.length) {
      if (delay && promises.slice(result.length).length > 0) {
        await wait(delay)
      }
      break
    }

    if (delay) {
      await wait(delay)
    }
  }

  const remainingPromises = promises.slice(result.length)
  if (remainingPromises.length > 0) {
    const remainingResult = await Promise.all(remainingPromises.map(fn => fn()))
    result.push(...remainingResult)
  }
  return result
}
