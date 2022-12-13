import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

const ProtectedRoute = props => {
  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return <ProtectedRoute {...props} />
}

export default ProtectedRoute
