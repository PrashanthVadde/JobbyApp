import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'

import JobProfile from '../JobProfile'
import JobCard from '../JobCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    jobCardDetails: [],
    checkedDataList: [],
    salaryDetails: '',
  }

  componentDidMount() {
    this.getJobsData()
  }

  getJobsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput, checkedDataList, salaryDetails} = this.state

    console.log(checkedDataList)

    console.log(checkedDataList.join(','))

    const checkedCategory = checkedDataList.join(',')

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${checkedCategory}&minimum_package=${salaryDetails}&search=${searchInput}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)

      const updatedJobCardData = fetchedData.jobs.map(eachCardDetails => ({
        id: eachCardDetails.id,
        companyLogoUrl: eachCardDetails.company_logo_url,
        title: eachCardDetails.title,
        rating: eachCardDetails.rating,
        employmentType: eachCardDetails.employment_type,
        jobDescription: eachCardDetails.job_description,
        location: eachCardDetails.location,
        packagePerAnnum: eachCardDetails.package_per_annum,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        jobCardDetails: updatedJobCardData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsView = () => {
    const {jobCardDetails} = this.state

    if (jobCardDetails.length === 0) {
      return (
        <div className="no-jobs-found-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="no-jobs-img-styles"
          />
          <h1 className="no-jobs-heading">No Jobs Found</h1>
          <p className="no-jogs-message">
            We could not find any jobs. Try other filters.
          </p>
        </div>
      )
    }

    return (
      <ul className="job-cards-container">
        {jobCardDetails.map(eachJob => (
          <JobCard key={eachJob.id} eachJobDetails={eachJob} />
        ))}
      </ul>
    )
  }

  onClickRetryButtonInFailureView = () => {
    this.getJobsData()
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-img-styles"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-message">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button-styles"
        onClick={this.onClickRetryButtonInFailureView}
      >
        Retry
      </button>
    </div>
  )

  renderViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'IN_PROGRESS':
        return this.renderLoadingView()
      case 'SUCCESS':
        return this.renderJobsView()
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return null
    }
  }

  onClickSearchButton = () => {
    this.getJobsData()
  }

  updateCheckedData = employmentTypeId => {
    const {checkedDataList} = this.state

    const updatedChecked = checkedDataList.concat(employmentTypeId)
    this.setState({checkedDataList: updatedChecked}, this.getJobsData)
  }

  removeCategory = employmentTypeId => {
    const {checkedDataList} = this.state

    const myArray = checkedDataList

    const index = myArray.findIndex(eachItem => {
      if (employmentTypeId === eachItem) {
        return true
      }
      return false
    })

    if (index !== -1) {
      myArray.splice(index, 1)
      this.setState({checkedDataList: myArray}, this.getJobsData)
    }
  }

  updateSalary = salaryRangeId => {
    this.setState({salaryDetails: salaryRangeId}, this.getJobsData)
  }

  render() {
    const {searchInput} = this.state
    const {employmentTypesList, salaryRangesList} = this.props

    console.log(employmentTypesList)

    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="jobs-description-part">
            <JobProfile />
            <ul className="employment-all-details-container">
              {employmentTypesList.map(eachEmployee => {
                const {employmentTypeId, label} = eachEmployee

                const handleChange = event => {
                  if (event.target.checked) {
                    this.updateCheckedData(employmentTypeId)
                  } else {
                    this.removeCategory(employmentTypeId)
                  }
                }

                return (
                  <li className="employment-details" key={employmentTypeId}>
                    <input
                      type="checkbox"
                      className="checkbox-styles"
                      onChange={handleChange}
                      id={employmentTypeId}
                    />
                    <label className="label-styles" htmlFor={employmentTypeId}>
                      {label}
                    </label>
                  </li>
                )
              })}
            </ul>

            <hr className="divider-styles" />

            <ul className="salary-all-details-container">
              {salaryRangesList.map(eachSalary => {
                const {salaryRangeId, label} = eachSalary

                const handleRadioChange = () => {
                  this.updateSalary(salaryRangeId)
                }

                return (
                  <li className="salary-details" key={salaryRangeId}>
                    <input
                      type="radio"
                      name="salary"
                      className="radio-btn-styles"
                      id={salaryRangeId}
                      onChange={handleRadioChange}
                    />
                    <label className="label-styles" htmlFor={salaryRangeId}>
                      {label}
                    </label>
                  </li>
                )
              })}
            </ul>

            <hr className="divider-styles" />
          </div>

          <div className="jobs-details-part">
            <div className="search-input-container">
              <input
                type="search"
                value={searchInput}
                placeholder="Search"
                className="search-input-styles"
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                className="search-button-styles"
                onClick={this.onClickSearchButton}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderViews()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
