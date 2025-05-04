import { userPageRenderer } from './user/user'
import './content.css'

//  Insert styling
const link = document.createElement("link");
link.rel = "stylesheet";
link.type = "text/css";
link.href = chrome.runtime.getURL("assets/content.css");
document.head.appendChild(link);

const currentUrl = window.location.href
console.log('Content script loaded for:', currentUrl)

//  * Routing
const HOME_PAGE = 'https://www.filmweb.pl/'
const USER_PROFILE_PAGE = currentUrl.match("^https:\/\/www\.filmweb\.pl\/user\/[^\/]+$");  //  Example:  https://www.filmweb.pl/user/OskV2
const USER_VOTES_MOVIES_PAGE = currentUrl.match("^https:\\/\\/www\\.filmweb\\.pl\\/user\\/[^\\/]+#\\/votes\\/film$");
const USER_VOTES_SERIES_PAGE = currentUrl.match("^https:\\/\\/www\\.filmweb\\.pl\\/user\\/[^\\/]+#\\/votes\\/serial$");
const USER_WANT_TO_SEE_MOVIES_PAGE = currentUrl.match("^https:\\/\\/www\\.filmweb\\.pl\\/user\\/[^\\/]+#\\/wantToSee\\/film$");
const USER_WANT_TO_SEE_SERIES_PAGE = currentUrl.match("^https:\\/\\/www\\.filmweb\\.pl\\/user\\/[^\\/]+#\\/wantToSee\\/serial$");


window.navigation.addEventListener("navigate", (event) => {
  console.log(`location changed! URL: ${currentUrl}`);
  // const userName = USER_PROFILE_PAGE.toString().split('/')
  // console.log(`You are currently at ${userName[4]} filmweb profile `)

  if (USER_PROFILE_PAGE) {
    userPageRenderer()
  }
})

