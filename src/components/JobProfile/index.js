import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobProfile extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    profileDetails: [],
  }

  componentDidMount() {
    this.getProfileData()
  }

  getProfileData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/profile'

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    // console.log(response)

    if (response.ok === true) {
      const fetchedData = await response.json()

      //   console.log(fetchedData)

      const updatedProfileData = {
        name: fetchedData.profile_details.name,
        profileImageUrl: fetchedData.profile_details.profile_image_url,
        shortBio: fetchedData.profile_details.short_bio,
      }

      this.setState({
        apiStatus: apiStatusConstants.success,
        profileDetails: updatedProfileData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickRetryButton = () => {
    this.getProfileData()
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileView = () => {
    const {profileDetails} = this.state
    const {profileImageUrl, name, shortBio} = profileDetails

    return (
      <div className="profile-container">
        <img
          src={profileImageUrl}
          alt="profile"
          className="profile-img-styles"
        />
        <h1 className="profile-name-styles">{name}</h1>
        <p className="profile-bio-styles">{shortBio}</p>
      </div>
    )
  }

  renderFailureView = () => (
    <button
      type="button"
      className="profile-retry-btn-styles"
      onClick={this.onClickRetryButton}
    >
      Retry
    </button>
  )

  renderViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'IN_PROGRESS':
        return this.renderLoadingView()
      case 'SUCCESS':
        return this.renderProfileView()
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderViews()}</>
  }
}

export default JobProfile
