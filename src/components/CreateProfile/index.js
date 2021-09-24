import ReactDom from 'react-dom'

import {v4 as uniqueId} from 'uuid'

import {Component} from 'react'

import ProfilesContext from '../../Context/ProfilesContext'

import './index.css'

class CreateProfile extends Component {
  state = {userInput: ''}

  onAddedProfile = () => {
    this.setState({userInput: ''})
  }

  onChangeUserInput = event => {
    this.setState({userInput: event.target.value})
  }

  onCancelPortal = () => {
    const {OnCloseProfile} = this.props

    OnCloseProfile()
  }

  onCreateProfile = () => {
    const {OnCloseProfile} = this.props

    OnCloseProfile()
  }

  render() {
    const {userInput} = this.state
    const {imageUrl, OnCloseProfile} = this.props

    return (
      <ProfilesContext.Consumer>
        {value => {
          const {addProfile} = value

          const onCreateProfile = () => {
            const userProfileDetails = {
              id: uniqueId(),
              imageUrl,
              name: userInput,
            }

            addProfile(userProfileDetails)

            OnCloseProfile()

            this.onAddedProfile()
          }

          return ReactDom.createPortal(
            <div className="create-profile-portal-container">
              <div className="create-profile-portal">
                <div className="portal-center-container">
                  <h1 className="create-profile-heading">Add Profile</h1>
                  <p className="create-profile-paragraph">
                    Add a profile for another person watching Movies
                  </p>
                </div>
                <hr className="profile-line-element" />
                <div className="profile-avatar-container">
                  <img alt="profile" className="profile-image" src={imageUrl} />
                  <input
                    type="text"
                    placeholder="Name"
                    className="profile-name-input"
                    onChange={this.onChangeUserInput}
                    value={userInput}
                  />
                </div>
                <hr className="profile-line-element" />
                <div className="profile-submit-cancel-container">
                  <button
                    type="button"
                    className="save-profile-button"
                    onClick={onCreateProfile}
                  >
                    Continue
                  </button>
                  <button
                    type="button"
                    className="cancel-portal-button"
                    onClick={this.onCancelPortal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>,
            document.getElementById('portal'),
          )
        }}
      </ProfilesContext.Consumer>
    )
  }
}

export default CreateProfile
