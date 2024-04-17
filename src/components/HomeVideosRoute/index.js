import VideoCard from '../VideoCard'

import {
  HomeVideoContainer,
  NoSearchContainer,
  NoSearchImage,
  NoSearchHeading,
  NoSearchDescribe,
  RetryButton,
  VideoCardListItem,
} from './styledComponents'

import ThemeAndVideoContext from '../../Context/ThemeAndVideoContext'

const HomeVideosRoute = props => {
  const {homeVideos} = props

  return (
    <ThemeAndVideoContext.Consumer>
      {value => {
        const {darkTheme} = value
        return (
          <HomeVideoContainer>
            {homeVideos.length > 0 ? (
              <VideoCardListItem>
                {homeVideos.map(eachVideo => (
                  <VideoCard key={eachVideo.id} videoDetails={eachVideo} />
                ))}
              </VideoCardListItem>
            ) : (
              <NoSearchContainer>
                <NoSearchImage
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                  alt="no videos"
                />
                <NoSearchHeading darkTheme={darkTheme}>
                  No Search results found
                </NoSearchHeading>
                <NoSearchDescribe darkTheme={darkTheme}>
                  Try different key words or remove search filter
                </NoSearchDescribe>
                <RetryButton type="button">Retry</RetryButton>
              </NoSearchContainer>
            )}
          </HomeVideoContainer>
        )
      }}
    </ThemeAndVideoContext.Consumer>
  )
}

export default HomeVideosRoute
