const CACHE_EXPIRY_MS = 15 * 60 * 1000

/**
 * Reads a cached value from extension storage, removing expired entries.
 * @param {string} key - Cache entry key.
 * @returns {Promise<*>} Cached data, or null if missing or expired.
 */
export async function getCachedData(key) {
  const result = await chrome.storage.local.get(key)
  const cachedData = result[key]
  if (!cachedData) return null

  if (isCachedDataExpired(cachedData) || cachedData.data === undefined) {
    await chrome.storage.local.remove(key)
    return null
  }

  return cachedData.data
}

/**
 * Stores data in extension storage for 15 minutes.
 * @param {string} key - Cache entry key.
 * @param {*} data - JSON-serializable data to cache.
 * @returns {Promise<void>}
 */
export async function setCachedData(key, data) {
  await chrome.storage.local.set({
    [key]: { data, expiresAt: Date.now() + CACHE_EXPIRY_MS },
  })
}

export function isCachedDataExpired(cachedData) {
  return !Number.isFinite(cachedData.expiresAt) || Date.now() >= cachedData.expiresAt
}
