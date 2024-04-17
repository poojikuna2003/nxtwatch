import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import {
  AppContainer,
  FormContainer,
  LoginWebsiteLogo,
  LabelContainer,
  ShowPasswordContainer,
  InputContainer,
  LoginBtn,
} from './styledComponents'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: false,
    showPassword: false,
    errorContent: '',
  }

  onChangeInputName = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onChangeEdit = () =>
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))

  renderUserNameField = () => {
    const {userName} = this.state

    return (
      <>
        <LabelContainer htmlFor="userNameId">USERNAME</LabelContainer>
        <input
          type="text"
          placeholder="Enter name"
          onChange={this.onChangeInputName}
          id="userNameId"
          value={userName}
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {showPassword, password} = this.state
    return (
      <>
        <LabelContainer htmlFor="passwordId">PASSWORD</LabelContainer>
        <input
          type={showPassword ? 'text' : 'password'}
          onChange={this.onChangePassword}
          id="passwordId"
          value={password}
        />
        <ShowPasswordContainer>
          <input
            type="checkbox"
            value={showPassword}
            onChange={this.onChangeEdit}
            id="show-password"
          />
          <LabelContainer htmlFor="show-password">Show Password</LabelContainer>
        </ShowPasswordContainer>
      </>
    )
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      errorMsg: true,
      errorContent: errorMsg,
    })
  }

  onLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {errorMsg, errorContent} = this.state

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <AppContainer>
        <FormContainer onSubmit={this.onLogin}>
          <LoginWebsiteLogo
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="logo"
          />
          <InputContainer>{this.renderUserNameField()}</InputContainer>
          <InputContainer>{this.renderPasswordField()}</InputContainer>
          <LoginBtn>Login</LoginBtn>
          {errorMsg && <p>{errorContent}</p>}
        </FormContainer>
      </AppContainer>
    )
  }
}

export default LoginRoute
