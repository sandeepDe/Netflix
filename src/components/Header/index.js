import {Link, withRouter} from 'react-router-dom'

import {Component} from 'react'

import './index.css'

class Header extends Component {
  constructor(props) {
    super(props)

    const {searchIconContainer = false} = this.props

    const localStorageInput = localStorage.getItem('user_input')

    if (localStorageInput === null) {
      localStorage.setItem('user_input', '')
    } else {
      localStorage.setItem('user_input', `${localStorageInput}`)
    }

    const userEnteredInput = localStorage.getItem('user_input')

    this.state = {
      userInput: userEnteredInput,
      showMenu: false,
      searchIconElement: true,
      searchIconContainer,
    }
  }

  hideMenuItems = () => {
    this.setState({showMenu: false})
  }

  onClickAvatarButton = () => {
    const {history} = this.props

    history.push('/account')
  }

  toggleRenderMenuItems = () => {
    this.setState(prevState => ({showMenu: !prevState.showMenu}))
  }

  onClickSearchInputIcon = event => {
    event.preventDefault()

    const {userInput} = this.state
    const {getInputAccess = () => {}} = this.props

    if (userInput !== '') {
      const {history} = this.props

      history.push('/home/search')

      getInputAccess(userInput)
    }
  }

  onChangeInput = event => {
    this.setState({userInput: event.target.value})
  }

  onClickSearchIcon = () => {
    this.setState({searchIconContainer: true, searchIconElement: false})
  }

  renderMenuItems = () => {
    const {showMenu} = this.state
    const {
      listItemStyle = true,
      home = false,
      popular = false,
      account = false,
    } = this.props

    const listIconClassName = listItemStyle ? '' : 'false-menu-list-color'
    const closeIconUrl = listItemStyle
      ? 'https://res.cloudinary.com/breakingbad/image/upload/v1626175731/Shape_iavz9j.png'
      : 'https://res.cloudinary.com/breakingbad/image/upload/v1626278426/Round_cin16i.png'
    const closeIconClassName = listItemStyle
      ? 'menu-close-icon'
      : 'false-menu-close-icon'
    const homeClassName = home ? 'active-list-item list-item' : 'list-item'
    const popularClassName = popular
      ? 'active-list-item list-item'
      : 'list-item'
    const accountClassName = account
      ? 'active-list-item list-item'
      : 'list-item'

    return (
      <div className="header-menu-list-item-container">
        {showMenu && (
          <ul className="menu-items-container">
            <Link to="/" className="link-item">
              <li className={`${homeClassName} ${listIconClassName}`}>Home</li>
            </Link>
            <Link to={`/popular/${1}`} className="link-item">
              <li className={`${popularClassName} ${listIconClassName}`}>
                Popular
              </li>
            </Link>
            <Link to="/account" className="link-item">
              <li className={`${accountClassName} ${listIconClassName}`}>
                Account
              </li>
            </Link>
            <li className="list-icon">
              <img
                onClick={this.hideMenuItems}
                alt="close-icon"
                className={closeIconClassName}
                src={closeIconUrl}
              />
            </li>
          </ul>
        )}
      </div>
    )
  }

  renderSearchAccountAndMenuItems = () => {
    const {userInput, searchIconContainer, searchIconElement} = this.state
    const {searchIcon = true, avatarIcon = true} = this.props

    let avatarUrl =
      'https://res.cloudinary.com/breakingbad/image/upload/v1626183993/Mask_Group_qjad2b.png'

    localStorage.setItem('user_input', userInput)

    const activeProfile = localStorage.getItem('activeProfile')

    if (activeProfile !== null) {
      const ProfileDetails = JSON.parse(activeProfile)

      const {imageUrl} = ProfileDetails

      if (imageUrl !== undefined) {
        avatarUrl = imageUrl
      }
    }

    return (
      <div className="search-menu-container">
        {searchIconElement && searchIcon && (
          <img
            onClick={this.onClickSearchIcon}
            alt="search-logo"
            className="search-logo"
            src="https://res.cloudinary.com/breakingbad/image/upload/v1626162280/search_er6u41.png"
          />
        )}
        {searchIconContainer && (
          <form
            className="search-input-container"
            onSubmit={this.onClickSearchInputIcon}
          >
            <input
              onChange={this.onChangeInput}
              value={userInput}
              type="text"
              className="search-input-element"
            />
            <button type="submit" className="search-image-button">
              <img
                alt="search-container-logo"
                className="container-search-logo"
                src="https://res.cloudinary.com/breakingbad/image/upload/v1626162280/search_er6u41.png"
              />
            </button>
          </form>
        )}
        {avatarIcon && (
          <button
            type="button"
            className="avatar-button"
            onClick={this.onClickAvatarButton}
          >
            <img alt="avatar-logo" className="avatar-logo" src={avatarUrl} />
          </button>
        )}
        <img
          onClick={this.toggleRenderMenuItems}
          alt="menu-logo"
          className="menu-logo"
          src="https://res.cloudinary.com/breakingbad/image/upload/v1626161227/add-to-queue_1_bbn2ej.png"
        />
      </div>
    )
  }

  renderMediumScreenMenuItems = () => {
    const {showMenuItems = true, home = false, popular = false} = this.props

    const homeClassName = home ? 'list-item active-list-item' : 'list-item'
    const popularClassName = popular
      ? 'list-item active-list-item'
      : 'list-item'

    return (
      <>
        {showMenuItems && (
          <ul className="medium-screen-menu-list-container">
            <Link to="/" className="link-item">
              <li className={homeClassName}>Home</li>
            </Link>
            <Link to={`/popular/${1}`} className="link-item">
              <li className={popularClassName}>Popular</li>
            </Link>
          </ul>
        )}
      </>
    )
  }

  render() {
    const {bgColor = false} = this.props

    const backgroundColor = bgColor ? 'light-header' : ''

    return (
      <>
        <nav className={`header-background ${backgroundColor}`}>
          <div className="movie-logo-container">
            <Link to="/" className="link-item">
              <img
                alt="header-logo"
                className="header-logo"
                src="https://res.cloudinary.com/breakingbad/image/upload/v1626011241/Group_7399_cl6qfz.png"
              />
            </Link>
            {this.renderMediumScreenMenuItems()}
          </div>
          {this.renderSearchAccountAndMenuItems()}
        </nav>
        {this.renderMenuItems()}
      </>
    )
  }
}

export default withRouter(Header)
