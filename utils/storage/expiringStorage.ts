/**
 * @param key localStorage key
 * @param value any value
 * @param ttl the data lifetime in milliseconds
 */
const setItem = (key: string, value: any, ttl: number) => {
  const now = new Date()

  const item = {
    value,
    expiry: now.getTime() + ttl,
  }
  localStorage.setItem(key, JSON.stringify(item))
}

const getItem = (key: string) => {
  const itemStr = localStorage.getItem(key)

  if (!itemStr) {
    return null
  }

  const item = JSON.parse(itemStr)
  const now = new Date()

  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key)
    return null
  }
  return item.value
}

const removeItem = (key: string) => {
  localStorage.removeItem(key)
}

/**
 * Wrapper for the localStorage API
 * to store and retrieve data with an expiry time
 */
export const expiringStorage = {
  setItem,
  getItem,
  removeItem,
}
