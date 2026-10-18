import { watchtimeParser } from '../lib/watchtime-parser.js'

export function ProfileWatchtimeCard({
  title = 'Better Filmweb',
  moviesWatchtime,
  seriesWatchtime,
  overallWatchtime,
  loading = false,
}) {
  return <>
    <h2 className="bf__title">{title}</h2>
    {loading ? <p className="bf__paragraph" role="status">Obliczanie watchtime'u</p> : <>
      <p className="bf__paragraph">
        Watchtime filmów: <span className="bf__paragraph--yellow">{watchtimeParser(moviesWatchtime)}</span>
      </p>
      <p className="bf__paragraph">
        Watchtime seriali: <span className="bf__paragraph--yellow">{watchtimeParser(seriesWatchtime)}</span>
      </p>
      <p className="bf__paragraph">
        Watchtime sumaryczny: <span className="bf__paragraph--yellow">{watchtimeParser(overallWatchtime)}</span>
      </p>
    </>}
  </>
}
