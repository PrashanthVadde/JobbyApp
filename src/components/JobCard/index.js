import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
// import {BsFillBagDashFill} from 'react-icons/bs'
// import {IoBagRemove} from 'react-icons/io'
// import {BsBagDashFill} from 'react-icons/bs'

import {Link} from 'react-router-dom'

import './index.css'

const JobCard = props => {
  const {eachJobDetails} = props

  const {
    id,
    companyLogoUrl,
    employmentType,
    rating,
    title,
    packagePerAnnum,
    location,
    jobDescription,
  } = eachJobDetails

  return (
    <>
      <Link to={`/jobs/${id}`} className="nav-link-styles">
        <li className="job-card-container">
          <div className="logo-and-title-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo-styles"
            />
            <div className="title-and-rating-container">
              <h1 className="job-card-title">{title}</h1>
              <div className="star-and-rating-container">
                <AiFillStar className="star-styles" />
                <p className="rating-num-styles">{rating}</p>
              </div>
            </div>
          </div>

          <div className="location-and-employment-type-container">
            <MdLocationOn className="location-bag-icons-styles" />
            <p className="location-employment-styles">{location}</p>

            <p className="location-employment-styles">{employmentType}</p>

            <p className="package-styles">{packagePerAnnum}</p>
          </div>

          <hr className="divider-styles" />

          <h1 className="description-heading">Description</h1>
          <p className="job-card-description">{jobDescription}</p>
        </li>
      </Link>
    </>
  )
}

export default JobCard
