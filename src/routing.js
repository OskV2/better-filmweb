import { userPageRenderer } from './routes/user/[username]/index.js'
import { ratedMoviesPageRenderer } from './routes/user/[username]/votes/film.js';
import { ratedSeriesPageRenderer } from './routes/user/[username]/votes/serial.js';
import { wantToSeeMoviesPageRenderer } from './routes/user/[username]/wantToSee/film.js';
import { wantToSeeSeriesPageRenderer } from './routes/user/[username]/wantToSee/serial.js';
import { singleSeriesPageRenderer } from './routes/serial/[slug].js';

let lastPath = "";

export function handleRoute(url) {
  // const path = new URL(url).pathname;
  if (url === lastPath) return;
  lastPath = url;

  const HOME_PAGE = 'https://www.filmweb.pl/'
  const USER_PROFILE_PAGE = url.match("^https:\/\/www\.filmweb\.pl\/user\/[^\/]+$");  //  Example:  https://www.filmweb.pl/user/OskV2
  const USER_VOTES_MOVIES_PAGE = url.match("^https:\\/\\/www\\.filmweb\\.pl\\/user\\/[^\\/]+#\\/votes\\/film$");  //  Example:  https://www.filmweb.pl/user/OskV2#/votes/film
  const USER_VOTES_SERIES_PAGE = url.match("^https:\\/\\/www\\.filmweb\\.pl\\/user\\/[^\\/]+#\\/votes\\/serial$");  //  Example:  https://www.filmweb.pl/user/OskV2#/votes/serial
  const USER_WANT_TO_SEE_MOVIES_PAGE = url.match("^https:\\/\\/www\\.filmweb\\.pl\\/user\\/[^\\/]+#\\/wantToSee\\/film$");  //  Example:  https://www.filmweb.pl/user/OskV2#/wantToSee/film
  const USER_WANT_TO_SEE_SERIES_PAGE = url.match("^https:\\/\\/www\\.filmweb\\.pl\\/user\\/[^\\/]+#\\/wantToSee\\/serial$");  //  Example:  https://www.filmweb.pl/user/OskV2#/wantToSee/serial
  const SINGLE_SERIES_PAGE = url.match("^https:\\/\\/www\\.filmweb\\.pl\\/serial\\/[^\\/]+$");  //  Example:  https://www.filmweb.pl/serial/Breaking+Bad-2008-430668
  
  // Route dispatch
  if (USER_PROFILE_PAGE) userPageRenderer();
  if (USER_VOTES_MOVIES_PAGE) {
    console.log('rated movies')
    ratedMoviesPageRenderer();
  }
  if (USER_VOTES_SERIES_PAGE) {
    console.log('rated series')
    ratedSeriesPageRenderer();
  }
  if (USER_WANT_TO_SEE_MOVIES_PAGE) {
    console.log('want2see movies')
    wantToSeeMoviesPageRenderer();
  }
  if (USER_WANT_TO_SEE_SERIES_PAGE) {
    console.log('want2see series')
    wantToSeeSeriesPageRenderer();
  }
    
  if (SINGLE_SERIES_PAGE) singleSeriesPageRenderer(url)
}

