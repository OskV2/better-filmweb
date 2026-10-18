import { createRoot } from 'react-dom/client'
import { WatchtimeCard, SeriesDuration } from '../components/WatchtimeCard.jsx'
import { ProfileWatchtimeCard } from '../components/ProfileWatchtimeCard.jsx'

const roots = new Map()

function mount(container, element) {
  let root = roots.get(container)
  if (!root) {
    root = createRoot(container)
    roots.set(container, root)
  }
  root.render(element)
}

export function renderCard(container, props) {
  mount(container, <WatchtimeCard {...props} />)
}

export function renderProfileCard(container, props) {
  mount(container, <ProfileWatchtimeCard {...props} />)
}

export function renderDuration(container, props) {
  mount(container, <SeriesDuration {...props} />)
}

export function unmountAll() {
  for (const root of roots.values()) root.unmount()
  roots.clear()
}

if (import.meta.hot) import.meta.hot.dispose(unmountAll)
