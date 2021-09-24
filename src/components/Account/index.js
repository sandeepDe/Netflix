import Cookies from 'js-cookie'

import './index.css'

import Header from '../Header'

const Account = props => {
  const userDetails = localStorage.getItem('userDetails')

  const parsedUserDetails = JSON.parse(userDetails)

  const {username, password} = parsedUserDetails

  const lengthOfPassWord = password.length

  const passwordPattern = '*'.repeat(lengthOfPassWord)

  const onClickLogout = () => {
    const {history} = props

    Cookies.remove('access_token')

    localStorage.removeItem('userDetails')

    localStorage.removeItem('signIn')

    localStorage.removeItem('user_input')

    localStorage.removeItem('searched_movies_page_number')

    history.replace('/login')
  }

  return (
    <div className="account-container">
      <Header searchIcon={false} account={`${true}`} listItemStyle={false} />
      <div className="account-information-container">
        <h1 className="account-heading">Account</h1>
        <hr className="line-element" />
        <div className="membership-container">
          <h1 className="membership-heading">Member ship</h1>
          <div className="membership-details-container">
            <p className="membership-username">{username}</p>
            <p className="membership-password">Password : {passwordPattern}</p>
          </div>
        </div>
        <hr className="line-element" />
        <div className="plan-container">
          <h1 className="membership-heading">Plan details</h1>
          <div className="plan-details-container">
            <p className="plan-paragraph">Premium</p>
            <div className="plan-details">Ultra HD</div>
          </div>
        </div>
        <hr className="line-element" />
        <div className="logout-button-container">
          <button
            onClick={onClickLogout}
            type="button"
            className="logout-button"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Account
