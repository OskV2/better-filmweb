//  * /user/{user}

import { waitForElement } from '../../../utils/wait-for-element'
import {
  watchtimeRatedOverall,
  watchtimeRatedMovies,
  watchtimeRatedSeries,
} from '../../../utils/data';

export const userPageRenderer = async () => {
  // Simple DOM manipulation to verify it's working
  const div = document.createElement('div')
  div.style.backgroundColor = 'red'
  div.style.color = 'white'
  div.style.padding = '10px'
  div.style.zIndex = '9999'
  div.textContent = 'Obliczanie watchTime\'u'

  waitForElement('div.page__content h2')
  .then((elm) => {
    console.log('Element is ready');
    console.log(elm);
    elm.appendChild(div);
  })

  const watchtime = await watchtimeRatedOverall()
  div.textContent = `Watchtime: ${watchtime}`
}