import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogoutButton = () => {
    Cookies.remove('jwt_token')

    const {history} = props

    history.replace('/login')
  }

  return (
    <div className="header-container">
      <Link to="/" className="nav-link">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-web-logo-styles"
        />
      </Link>

      <div className="jobs-and-home-tabs-container">
        <Link to="/" className="nav-link">
          <h1 className="header-tab-styles">Home</h1>
        </Link>

        <Link to="/jobs" className="nav-link">
          <h1 className="header-tab-styles">Jobs</h1>
        </Link>
      </div>
      <div>
        <button
          type="button"
          className="logout-btn-styles"
          onClick={onClickLogoutButton}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
