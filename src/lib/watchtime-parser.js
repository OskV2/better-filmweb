//  * This functions accepts (int) watchtime in minutes as a parameter and returns a string in format "10h 34m" for example
export const watchtimeParser = (watchtime) => {
  const minutes = watchtime % 60
  const hours = (watchtime - minutes) / 60

  return `${hours}h ${minutes}m`
}