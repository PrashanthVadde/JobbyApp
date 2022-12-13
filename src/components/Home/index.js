import Header from '../Header'

import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-content-container">
      <h1 className="home-heading">
        Find The Job That <br /> Fits Your Life
      </h1>
      <p className="home-description">
        Millions of people are searching for jobs, salary information,
        <br /> company reviews. Find the job that fits your abilities and
        potential.
      </p>
      <button type="button" className="find-job-btn-styles">
        Find Jobs
      </button>
    </div>
  </>
)

export default Home
