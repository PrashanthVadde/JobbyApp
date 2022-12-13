import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBoxArrowUpRight} from 'react-icons/bs'
import {BiShoppingBag} from 'react-icons/bi'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'

import SimilarJobItem from '../SimilarJobItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobDetailsData: [],
  }

  componentDidMount() {
    this.getJobDetailsData()
  }

  getJobDetailsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    console.log(response)

    if (response.ok === true) {
      const fetchedData = await response.json()

      const updatedData = {
        id: fetchedData.job_details.id,
        jobDescription: fetchedData.job_details.job_description,
        companyLogoUrl: fetchedData.job_details.company_logo_url,
        companyWebsiteUrl: fetchedData.job_details.company_website_url,
        employmentType: fetchedData.job_details.employment_type,
        lifeAtCompany: {
          description: fetchedData.job_details.life_at_company.description,
          imageUrl: fetchedData.job_details.life_at_company.image_url,
        },
        location: fetchedData.job_details.location,
        packagePerAnnum: fetchedData.job_details.package_per_annum,
        rating: fetchedData.job_details.rating,
        skills: fetchedData.job_details.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        title: fetchedData.job_details.title,
        similarJobs: fetchedData.similar_jobs.map(eachSimilarJob => ({
          id: eachSimilarJob.id,
          companyLogoUrl: eachSimilarJob.company_logo_url,
          employmentType: eachSimilarJob.employment_type,
          jobDescription: eachSimilarJob.job_description,
          location: eachSimilarJob.location,
          rating: eachSimilarJob.rating,
          title: eachSimilarJob.title,
        })),
      }

      this.setState({
        apiStatus: apiStatusConstants.success,
        jobDetailsData: updatedData,
      })

      console.log(fetchedData)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetailsCardView = () => {
    const {jobDetailsData} = this.state

    const {
      title,
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      similarJobs,
    } = jobDetailsData

    return (
      <div className="job-card-details-container">
        <div className="job-item-details-card">
          <div className="logo-and-title-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="job-details-card-img-styles"
            />
            <div className="job-card-title-and-rating-container">
              <h1 className="job-details-card-title">{title}</h1>
              <div className="star-logo-and-rating-container">
                <AiFillStar className="job-detail-card-star" />
                <p className="rating-styles">{rating}</p>
              </div>
            </div>
          </div>

          <div className="job-details-card-location-and-salary-container">
            <MdLocationOn className="job-details-card-location-icon" />
            <p className="job-item-details-location">{location}</p>
            <BiShoppingBag className="job-details-card-location-icon" />
            <p className="job-item-details-employment-type">{employmentType}</p>
            <p className="job-item-details-employment-package-per-annum">
              {packagePerAnnum}
            </p>
          </div>

          <hr className="job-details-card-divider" />

          <div className="description-heading-and-visit-link-container">
            <h1 className="job-details-card-description-side-heading">
              Description
            </h1>
            <div className="visit-link-container">
              <a
                href={companyWebsiteUrl}
                target="_blank"
                rel="noreferrer"
                className="visit-link-styles"
              >
                Visit{' '}
                <span>
                  <BsBoxArrowUpRight />
                </span>
              </a>
            </div>
          </div>

          <p className="job-details-card-description">{jobDescription}</p>
          <h1 className="job-details-card-description-side-heading">Skills</h1>
          <ul className="skills-details-container">
            {skills.map(eachSkill => {
              const {imageUrl, name} = eachSkill

              return (
                <li key={name} className="skill-container">
                  <img
                    src={imageUrl}
                    alt={name}
                    className="skills-img-styles"
                  />
                  <p className="skills-name-styles">{name}</p>
                </li>
              )
            })}
          </ul>
          <div className="life-at-company-container">
            <div className="life-at-company-text-container">
              <h1 className="job-details-card-description-side-heading">
                Life at Company
              </h1>
              <p className="job-details-card-description">
                {lifeAtCompany.description}
              </p>
            </div>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="life-at-company-img-styles"
            />
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-job-cards-container">
          {similarJobs.map(eachSimilarJob => (
            <SimilarJobItem similarJobDetails={eachSimilarJob} />
          ))}
        </ul>
      </div>
    )
  }

  onClickRetryButton = () => {
    this.getJobDetailsData()
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-details-card-failure-view-img"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-message">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button-styles"
        onClick={this.onClickRetryButton}
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
        return this.renderJobDetailsCardView()
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderViews()}
      </>
    )
  }
}

export default JobDetails
