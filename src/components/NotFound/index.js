import './index.css'

import Header from '../Header'

const NotFound = props => {
  const onClickHomeButton = () => {
    const {history} = props

    history.replace('/')
  }

  return (
    <div className="not-found-container">
      <Header searchIcon={false} showMenuItems={false} avatarIcon={false} />
      <div className="not-found-description-container">
        <h1 className="not-found-heading">Lost Your Way ?</h1>
        <p className="not-found-description">
          Sorry, we can’t find that page. You’ll find lots to explore on the
          home page
        </p>
        <button
          onClick={onClickHomeButton}
          type="button"
          className="home-route-button"
        >
          Netflix Home
        </button>
        <div className="error-container">
          <p className="error-paragraph">Error code</p>
          <p className="error-code">NSES- 404</p>
        </div>
      </div>
    </div>
  )
}

export default NotFound
