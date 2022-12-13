import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BiShoppingBag} from 'react-icons/bi'

import './index.css'

const SimilarJobItem = props => {
  const {similarJobDetails} = props

  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails

  return (
    <li className="similar-job-card-container">
      <div className="logo-and-title-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-job-card-img-styles"
        />
        <div className="similar-job-card-title-rating-container">
          <h1 className="similar-job-card-title">{title}</h1>
          <div className="similar-job-card-star-rating-container">
            <AiFillStar className="similar-job-card-star" />
            <p className="similar-job-card-rating">{rating}</p>
          </div>
        </div>
      </div>

      <h1 className="similar-card-description-heading">Description</h1>
      <p className="similar-job-card-description">{jobDescription}</p>
      <div className="similar-job-card-location-employment-container">
        <MdLocationOn className="similar-job-card-location-icon" />
        <p className="similar-job-card-location">{location}</p>
        <BiShoppingBag className="similar-job-card-location-icon" />
        <p className="similar-job-card-employment">{employmentType}</p>
      </div>
    </li>
  )
}

export default SimilarJobItem
