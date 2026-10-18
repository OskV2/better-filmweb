import { handleRoute } from '../routing.js'
import '../styles/content.css'

handleRoute(location.href)

// Listen for background notifications
const onMessage = (msg) => {
  // console.log(`Message received, passed URL: ${msg.url}`)

  if (msg.type === 'urlChanged') {
    handleRoute(msg.url);
  }
};
chrome.runtime.onMessage.addListener(onMessage);
if (import.meta.hot) {
  import.meta.hot.dispose(() => chrome.runtime.onMessage.removeListener(onMessage));
}
