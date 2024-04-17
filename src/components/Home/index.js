import {Component} from 'react'
import {AiOutlineClose, AiOutlineSearch} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'
import HomeVideosRoute from '../HomeVideosRoute'

import Navigation from '../Navigation'

import {
  HomeContainer,
  BannerContainer,
  BannerContent,
  BannerImg,
  BannerGetButton,
  CloseButton,
  HomeBodyContainer,
  SearchInput,
} from './styledComponent'

import ThemeAndVideoContext from '../../Context/ThemeAndVideoContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    homeVideos: [],
    searchEl: '',
    apiStatus: apiStatusConstants.initial,
    showBanner: true,
  }

  componentDidMount() {
    this.getHomeVideos()
  }

  getHomeVideos = async () => {
    const {searchEl} = this.state
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchEl}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const fetchedData = data.videos.map(each => ({
        id: each.id,
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        channel: {
          name: each.name,
          profileImageUrl: each.profile_image_url,
        },
        viewCount: each.view_count,
        publishedAt: each.published_at,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        homeVideos: fetchedData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClose = () => {
    this.setState({
      showBanner: false,
    })
  }

  renderBannerSection = () => {
    const {showBanner} = this.state
    return (
      <>
        {showBanner && (
          <BannerContainer>
            <BannerContent>
              <BannerImg
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                alt="img logo"
              />
              <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
              <BannerGetButton>GET IT NOW</BannerGetButton>
            </BannerContent>
            <CloseButton type="button" label="btn" onClick={this.onClose}>
              <AiOutlineClose />
            </CloseButton>
          </BannerContainer>
        )}
      </>
    )
  }

  onSearchChange = event => {
    this.setState({
      searchEl: event.target.value,
    })
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#4f46e5" height="50" width="50" />
    </div>
  )

  renderVideoDetails = () => {
    const {homeVideos} = this.state
    return <HomeVideosRoute homeVideos={homeVideos} />
  }

  apiStatusSwitch = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatus.success:
        return this.renderVideoDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {searchEl} = this.state
    return (
      <ThemeAndVideoContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          const bgColor = isDarkTheme ? '#212121' : '#f1f1f1'

          const color = isDarkTheme ? '#ffffff' : '#000000'

          return (
            <div>
              <Header />
              <Navigation />
              <HomeContainer bgColor={bgColor} data-testid="Home">
                {this.renderBannerSection()}
                <HomeBodyContainer>
                  <SearchInput
                    type="search"
                    placeholder="Search"
                    value={searchEl}
                    onChange={this.onSearchChange}
                  />
                  {this.apiStatusSwitch()}
                </HomeBodyContainer>
              </HomeContainer>
            </div>
          )
        }}
      </ThemeAndVideoContext.Consumer>
    )
  }
}

export default Home
