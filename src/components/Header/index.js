import {withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import Popup from 'reactjs-popup'

import {BsMoon, BsBrightnessHigh} from 'react-icons/bs'

import {FiLogOut} from 'react-icons/fi'

import {
  Navbar,
  ImgEl,
  IconsContainer,
  ThemeButton,
  ProfileImage,
} from './styledComponent'

import ThemeAndVideoContext from '../../Context/ThemeAndVideoContext'

const Header = props => (
  <ThemeAndVideoContext.Consumer>
    {value => {
      const {isDarkTheme, toggleTheme} = value

      const bgColor = isDarkTheme ? '#231f20' : ' #f9f9f9'

      const onChangeTheme = () => {
        toggleTheme()
      }

      const onLogout = () => {
        const {history} = props

        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      return (
        <Navbar bgColor={bgColor}>
          {isDarkTheme ? (
            <ImgEl
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
              alt="website logo"
            />
          ) : (
            <ImgEl
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="website logo"
            />
          )}
          <IconsContainer>
            <ThemeButton type="button" onClick={onChangeTheme}>
              {isDarkTheme ? (
                <BsBrightnessHigh size={25} color="#ffffff" />
              ) : (
                <BsMoon size={25} />
              )}
            </ThemeButton>

            <ProfileImage
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
            />

            <button type="button" onClick={onLogout}>
              Logout
            </button>
          </IconsContainer>
        </Navbar>
      )
    }}
  </ThemeAndVideoContext.Consumer>
)
export default withRouter(Header)
