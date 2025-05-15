const CACHE_EXPIRY_MS = 15 * 60 * 1000  //  15 mins in miliseconds

export const getCachedData = (key) => {
  // * Check if cached data exists
  // * If it does not exist return null
  const cachedData = JSON.parse(localStorage.getItem(key));
  if (!cachedData) return null;
  
  // * Check if cached data is expired
  // * If its expired then remove it
  const expired = isCachedDataExpired(cachedData)
  if (expired) {
    localStorage.removeItem(key)
  }

  // * If cached data exists extract 'data' from it and return it
  return cachedData.data;
}

export const setCachedData = (key, data) => {
  const payload = {
    data,
    timestamp: Date.now()
  };
  localStorage.setItem(key, JSON.stringify(payload));
}

export const isCachedDataExpired = (cachedData) => {
  const now = Date.now() - cachedData.timestamp;

  if (now < CACHE_EXPIRY_MS) {
    return false
  } else {
    return true
  }
}
