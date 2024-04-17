import formatDistanceStrict from 'date-fns/formatDistanceStrict'

import {
  ItemLink,
  VideoCardITem,
  VideoThumbnailImg,
  VideoDetailsContainer,
  ChannelProfileImage,
  VideoTitle,
  VideoAndChannelInfoSection,
  ChannelTitleAndVideoInfo,
  ChannelTitle,
  VideoInfo,
  Dot,
} from './styledComponent'

import ThemeAndVideoContext from '../../Context/ThemeAndVideoContext'

const VideoCard = props => {
  const {videoDetails} = props
  const {
    id,
    thumbnailUrl,
    channel,
    title,
    viewCount,
    publishedAt,
  } = videoDetails
  const videoPublishDate = formatDistanceStrict(
    new Date(publishedAt),
    new Date(),
  )
  return (
    <ThemeAndVideoContext.Consumer>
      {value => {
        const {darkTheme} = value
        return (
          <ItemLink to={`/videos/${id}`}>
            <VideoCardITem>
              <VideoThumbnailImg src={thumbnailUrl} alt="video thumbnail" />
              <VideoDetailsContainer>
                <ChannelProfileImage
                  src={channel.profileImageUrl}
                  alt="channel logo"
                />
                <VideoAndChannelInfoSection>
                  <VideoTitle darkTheme={darkTheme}>{title}</VideoTitle>
                  <ChannelTitleAndVideoInfo>
                    <ChannelTitle darkTheme={darkTheme}>
                      {channel.name} <Dot>• </Dot>
                    </ChannelTitle>
                    <VideoInfo darkTheme={darkTheme}>
                      {viewCount} views • {videoPublishDate} ago
                    </VideoInfo>
                  </ChannelTitleAndVideoInfo>
                </VideoAndChannelInfoSection>
              </VideoDetailsContainer>
            </VideoCardITem>
          </ItemLink>
        )
      }}
    </ThemeAndVideoContext.Consumer>
  )
}

export default VideoCard
