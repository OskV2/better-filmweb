import { userPageRenderer } from './user/user'
import { ratedMoviesPageRenderer } from './user/votes/movies';
import { ratedSeriesPageRenderer } from './user/votes/series';
import { wantToSeeMoviesPageRenderer } from './user/wantToSee/movies';
import { wantToSeeSeriesPageRenderer } from './user/wantToSee/series';
import { singleSeriesPageRenderer } from './serial/serial';
import './content.css'

//  Insert styling
const link = document.createElement("link");
link.rel = "stylesheet";
link.type = "text/css";
link.href = chrome.runtime.getURL("assets/content.css");
document.head.appendChild(link);

// const currentUrl = window.location.href
// console.log('Content script loaded for:', currentUrl)

let lastPath = "";

function handleRoute(url) {
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
  if (USER_VOTES_MOVIES_PAGE) ratedMoviesPageRenderer();
  if (USER_VOTES_SERIES_PAGE) ratedSeriesPageRenderer();
  if (USER_WANT_TO_SEE_MOVIES_PAGE) wantToSeeMoviesPageRenderer();
  if (USER_WANT_TO_SEE_SERIES_PAGE) wantToSeeSeriesPageRenderer();
  if (SINGLE_SERIES_PAGE) singleSeriesPageRenderer(url)
}

handleRoute(location.href);

// Listen for background notifications
chrome.runtime.onMessage.addListener((msg) => {
  console.log(`Message received, passed URL: ${msg.url}`)

  if (msg.type === 'urlChanged') {
    handleRoute(msg.url);
  }
});