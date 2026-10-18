import { waitForElement } from '../lib/wait-for-element.js'
import { renderCard } from './mount.jsx'

export async function renderWatchtimeSummary(watchtime, label) {
  const target = await waitForElement('div.page__content section')
  let container = document.querySelector('.bf__card')

  if (!container) {
    container = document.createElement('div')
    container.className = 'bf__card'
    target.prepend(container)
  }

  renderCard(container, { label, watchtime })
  return container
}
