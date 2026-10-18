import { waitForElements } from '../../../../lib/wait-for-element.js'
import { watchtimeWantToSeeSeries } from '../../../../services/user-watchtime.js'
import { renderWatchtimeSummary } from '../../../../ui/render-list.js'
import { renderDuration } from '../../../../ui/mount.jsx'
import { getSeriesData } from '../../../../services/series.js'

export const wantToSeeSeriesPageRenderer = async () => {
  const watchtime = await watchtimeWantToSeeSeries()
  await renderWatchtimeSummary(watchtime, 'Watchtime seriali')

  const nodes = await waitForElements('#app > div.sc-fiCwlc.sc-fVRevi.bvDKKG.eYGpSc > section > div.sc-hxhCaM.dcMjYg > div.sc-fiCwlc.sc-tDzRk.gZoKdo.iDegVb > div.jJoTow')

  for (const node of nodes) {
    const anchor = node.querySelector('a[href^="/serial/"]')
    const match = anchor?.getAttribute('href').match(/-(\d+)$/)
    if (!match) continue

    const series = await getSeriesData(match[1])

    const container = document.createElement('div')
    node.append(container)

    renderDuration(container, {
      compact: true,
      minutes: series.avgEpisodeDuration * series.numberOfEpisodes,
    })
  }
}
