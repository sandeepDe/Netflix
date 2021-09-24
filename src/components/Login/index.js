import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import {Component} from 'react'

import ProfilesContext from '../../Context/ProfilesContext'

import './index.css'

const apiKey = '7217fff849c53b7c442da641b5faa4ba'

const SignInOption = localStorage.getItem('signIn')

if (SignInOption === null) {
  localStorage.setItem('signIn', JSON.stringify(false))
} else if (JSON.parse(SignInOption) === false) {
  localStorage.setItem('signIn', JSON.stringify(true))
}

class LoginForm extends Component {
  constructor(props) {
    super(props)

    const showSignIn = localStorage.getItem('signIn')

    this.state = {
      showSignIn: JSON.parse(showSignIn),
      username: '',
      password: '',
      showErrorMessage: false,
      errorMsg: '',
    }
  }

  onResetPassword = () => {
    alert(
      'You are re-directing to a website which provides data to this application. Do follow instructions, to reset the password and login with the same password!',
    )
  }

  OnSignUp = () => {
    alert(
      'You are re-directing to a website, which provides data to this application. Do follow instructions, to signup with ur credentials and use them while login into this application',
    )
  }

  onLoginSuccess = token => {
    const {username, password} = this.state

    const {history} = this.props

    const userDetails = {username, password}

    localStorage.setItem('userDetails', JSON.stringify(userDetails))

    Cookies.set('access_token', token, {expires: 30})

    history.replace('/profiles')
  }

  onLoginFailure = errorMsg => {
    this.setState({showErrorMessage: true, errorMsg})
  }

  onSubmitUserDetails = async event => {
    event.preventDefault()

    const {username, password} = this.state

    const getRequestTokenApi = `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`
    const getRequestTokenOptions = {
      method: 'GET',
    }
    const getRequestToken = await fetch(
      getRequestTokenApi,
      getRequestTokenOptions,
    )
    const data = await getRequestToken.json()
    const userDetails = {username, password, request_token: data.request_token}

    const postLoginApi = `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`
    const postLoginOptions = {
      method: 'POST',
      body: JSON.stringify(userDetails),
      headers: {
        'Content-type': 'application/json',
      },
    }
    const loginResponse = await fetch(postLoginApi, postLoginOptions)
    const loginData = await loginResponse.json()

    if (loginData.success === false) {
      this.onLoginFailure(loginData.status_message)
    } else {
      this.onLoginSuccess(loginData.request_token)
    }
  }

  onChangeInput = event => {
    this.setState({username: event.target.value, showErrorMessage: false})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value, showErrorMessage: false})
  }

  OnIntroToSignIn = () => {
    this.setState({showSignIn: true})
  }

  renderPassword = () => {
    const {password} = this.state

    return (
      <div className="password-container">
        <label htmlFor="passwordElement" className="label-element">
          PASSWORD
        </label>
        <input
          onChange={this.onChangePassword}
          placeholder="Password"
          value={password}
          type="password"
          id="passwordElement"
          className="input-element"
        />
      </div>
    )
  }

  renderUsername = () => {
    const {username} = this.state

    return (
      <div className="username-container">
        <label htmlFor="inputElement" className="label-element">
          USERNAME
        </label>
        <input
          onChange={this.onChangeInput}
          placeholder="Username"
          value={username}
          type="text"
          id="inputElement"
          className="input-element"
        />
      </div>
    )
  }

  renderSignInForm = () => {
    const {showErrorMessage, errorMsg} = this.state

    return (
      <ProfilesContext.Consumer>
        {value => {
          const {onLoginProfiles} = value

          const onSubmitLoginDetailsAndUpdateProfile = () => {
            onLoginProfiles()
          }

          return (
            <div className="login-container">
              <img
                alt="movies-img"
                className="website-logo"
                src="https://res.cloudinary.com/breakingbad/image/upload/v1626011241/Group_7399_cl6qfz.png"
              />
              <form
                className="login-form-container"
                onSubmit={this.onSubmitUserDetails}
              >
                <h1 className="form-heading">Sign in</h1>
                {this.renderUsername()}
                {this.renderPassword()}
                {showErrorMessage && (
                  <p className="error-message">{errorMsg}</p>
                )}
                <button type="submit" className="sign-in-button">
                  Sign in
                </button>
                <div className="forgot-password-container">
                  <p className="forgot-password-msg">Forgot your Password ?</p>
                  <a
                    className="anchor-element"
                    href="https://www.themoviedb.org/reset-password"
                    onClick={this.onResetPassword}
                  >
                    Reset Password
                  </a>
                </div>
                <div className="sign-up-container">
                  <p className="sign-up-msg">New to Movies ?</p>
                  <a
                    className="anchor-element"
                    href="https://www.themoviedb.org/signup"
                    onClick={this.OnSignUp}
                  >
                    Sign up now
                  </a>
                </div>
              </form>
            </div>
          )
        }}
      </ProfilesContext.Consumer>
    )
  }

  renderIntroduction = () => (
    <div className="movies-introduction-page">
      <div className="movies-introduction-cover-page">
        <div className="movie-introduction-logo-sign-in-container">
          <img
            alt="movies-website-logo"
            className="movies-website-introduction-logo"
            src="https://res.cloudinary.com/breakingbad/image/upload/v1626011241/Group_7399_cl6qfz.png"
          />
          <button
            type="button"
            className="intro-to-sign-in-button"
            onClick={this.OnIntroToSignIn}
          >
            Sign In
          </button>
        </div>
        <div className="movies-introduction-content-container">{}</div>
      </div>
    </div>
  )

  render() {
    const {showSignIn} = this.state

    const SignInData = localStorage.getItem('signIn')

    if (JSON.parse(SignInData) !== showSignIn) {
      localStorage.setItem('signIn', JSON.stringify(showSignIn))
    }

    const accessToken = Cookies.get('access_token')

    if (accessToken !== undefined) {
      return <Redirect to="/profiles" />
    }

    return (
      <>{showSignIn ? this.renderSignInForm() : this.renderIntroduction()}</>
    )
  }
}

export default LoginForm
