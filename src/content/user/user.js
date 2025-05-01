//  * /user/{user}

import { waitForElement } from '../../../utils/wait-for-element'
import {
  watchtimeRatedOverall,
  watchtimeRatedMovies,
  watchtimeRatedSeries,
} from '../../../utils/data';

export const userPageRenderer = async () => {

  let htmlContent = `
    <h2>Better Filmweb</h2>
    <p>This is a paragraph inside a card.</p>
    <ul>
      <li>Obliczanie watchtime'u</li>
    </ul>
  `

  const div = document.createElement('div')
  div.innerHTML = htmlContent
  div.style.backgroundColor = 'red'
  div.style.color = 'white'
  div.style.padding = '10px'
  div.style.zIndex = '9999'
  // div.textContent = 'Obliczanie watchTime\'u'

  waitForElement('div.page__content h2')
  .then((elm) => {
    console.log('Element is ready');
    console.log(elm);
    elm.appendChild(div);
  })

  const watchtimeOverall = await watchtimeRatedOverall()
  const watchtimeMovies = await watchtimeRatedMovies()
  const watchtimeSeries = await watchtimeRatedSeries()


  htmlContent = `
    <div>
      <h2>Better Filmweb</h2>
      <p>This is a paragraph inside a card.</p>
      <ul>
        <li>Watchtime filmów: ${watchtimeMovies}</li>
        <li>Watchtime seriali: ${watchtimeSeries} </li>
        <li>Watchtime sumaryczny: ${watchtimeOverall} </li>
      </ul>
    </div>
  `
  div.innerHTML = htmlContent
}