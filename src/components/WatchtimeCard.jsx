import { watchtimeParser } from '../lib/watchtime-parser.js'

export function WatchtimeCard({ label, watchtime }) {
  return <>
    <h2 className="bf__title">Better Filmweb</h2>
    <p className="bf__paragraph">
      {label}: <span className="bf__paragraph--yellow">{watchtimeParser(watchtime)}</span>
    </p>
  </>
}

export function SeriesDuration({ minutes, loading = false, compact = false }) {
  const className = compact ? 'bf__series-watchtime' : 'bf__single-series-watchtime'
  return <p className={className}>
    Długość: <span className={className + '--yellow'}>
      {loading ? 'Obliczanie' : watchtimeParser(minutes)}
    </span>
  </p>
}
