import { getMovieDetails } from './movie-details'
import { getSeriesData, getNumberOfEpisodes } from './numbers-for-series'

// * About this function:
// @param IDs - accepts [] of IDs of movies
// * - returns (int) watchtime in minutes

// ! This function works only for logged user - if user is not logged info filmweb.pl website, there wont be valid cookie, which means that request will not work properly

export async function getMoviesWatchtime(IDs) {
  let watchtime = 0;
  let i = 0;
  try {
    for (const id of IDs) {
      const response = await getMovieDetails(id);
      if (response.duration) watchtime = watchtime + response.duration;
      i++;
    }
  } catch (error) {
    console.error('Failed in movies watchtime');
  }
  return watchtime;
}

export async function getSeriesWatchtime(IDs) {
    try {
      let watchtime = 0;
      let allSeriesData = []

      for (const id of IDs) {
        const series = {
          seriesID: id,
          numberOfEpisodes: 0,
          avgEpisodeDuration: 0
        }

        const seriesData = await getSeriesData(id)
        const numberOfEpisodes = seriesData.episodes

        //  ! DEPRECATED
        //  * I used to get number of episodes by myself, but decided to give up on this idea
        //  * Generally it was more precise because data in seriesData object is not always correct and my solution was always getting correct number of episodes
        //  * But my solution was also fireing hundrets of GET requests to filmweb server
        //  Sometimes when series has only one season, property .seasons doesnt exist in object
        //  When property .seasons doesnt exist i can just get number of episodes from the object
        // if (numberOfSeasons) {
        //   for (i = 1; i <= numberOfSeasons; i++) {
        //     numberOfEpisodesInSeason = await getNumberOfEpisodes(id, i)
        //     numberOfEpisodes += numberOfEpisodesInSeason 
        //   }
        // } else {
        //   numberOfEpisodes = seriesData.episodes
        // }
        // console.log(`Is mu number of episodes(${numberOfEpisodes}) the same as number of episodes declared by filmweb(${seriesData.episodes}): ${numberOfEpisodes == seriesData.episodes}`)

        const seriesDetails = await getMovieDetails(id)
        const avgEpisodeDuration = seriesDetails.duration
  
        series.numberOfEpisodes = numberOfEpisodes
        series.avgEpisodeDuration = avgEpisodeDuration
        allSeriesData.push(series)
      }

      for(const series of allSeriesData) {
        watchtime = watchtime + (series.numberOfEpisodes * series.avgEpisodeDuration)
      }
      return [watchtime, allSeriesData]
    } catch (error) {
      console.error('Failed in series watchtime')
      console.error(error)
    }
}