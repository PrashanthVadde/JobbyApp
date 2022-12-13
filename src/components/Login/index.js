import {Component} from 'react'

import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isSubmitError: false,
    errorMsg: '',
  }

  onChangeUsernameInput = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsernameField = () => {
    const {username} = this.state

    return (
      <div className="input-field-container">
        <label htmlFor="username" className="label-styles">
          USERNAME
        </label>
        <input
          id="username"
          type="text"
          value={username}
          placeholder="Username"
          onChange={this.onChangeUsernameInput}
          className="input-styles"
        />
      </div>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <div className="input-field-container">
        <label htmlFor="password" className="label-styles">
          PASSWORD
        </label>
        <input
          id="password"
          type="password"
          value={password}
          placeholder="Password"
          onChange={this.onChangePassword}
          className="input-styles"
        />
      </div>
    )
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})

    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({isSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
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

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {isSubmitError, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="bg-container">
        <div className="login-from-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="web-logo-styles"
          />
          <form onSubmit={this.onSubmitForm}>
            {this.renderUsernameField()}
            {this.renderPasswordField()}
            <button type="submit" className="login-btn-styles">
              Login
            </button>
            {isSubmitError && <p className="error-msg-styles">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
