import {Component} from 'react'

import {ImPlus} from 'react-icons/im'

import './index.css'

import ProfilesContext from '../../Context/ProfilesContext'
import Header from '../Header'
import CreateProfile from '../CreateProfile'

const listOfProfiles = [
  {
    imageUrl:
      'https://res.cloudinary.com/breakingbad/image/upload/v1628737440/Group_7494_htpyq7.png',
  },
  {
    imageUrl:
      'https://res.cloudinary.com/breakingbad/image/upload/v1628737456/Group_7496_pmdljh.png',
  },
  {
    imageUrl:
      'https://res.cloudinary.com/breakingbad/image/upload/v1628737471/Group_7497_1_trgtor.png',
  },
  {
    imageUrl:
      'https://res.cloudinary.com/breakingbad/image/upload/v1628737486/Group_7498_dgt4ud.png',
  },
  {
    imageUrl:
      'https://res.cloudinary.com/breakingbad/image/upload/v1628737500/Group_7499_nd1tmc.png',
  },
  {
    imageUrl:
      'https://res.cloudinary.com/breakingbad/image/upload/v1628737500/Group_7499_nd1tmc.png',
  },
]

class Profiles extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showUpdateProfiles: false,
      createProfile: false,
      updateProfile: false,
    }
  }

  onClickProfileItem = profile => {
    const {history} = this.props

    history.push('/')

    localStorage.setItem('activeProfile', JSON.stringify(profile))
  }

  updateProfile = () => {
    this.setState({updateProfile: true})
  }

  onAddedProfile = () => {
    this.setState({createProfile: false})
  }

  onCreateProfile = () => {
    this.setState({createProfile: true})
  }

  OnCloseProfile = () => {
    this.setState({createProfile: false})
  }

  onUpdateProfiles = () => {
    this.setState({showUpdateProfiles: true})
  }

  onSaveProfiles = () => {
    this.setState({showUpdateProfiles: false})
  }

  render() {
    const {showUpdateProfiles, createProfile, updateProfile} = this.state

    return (
      <ProfilesContext.Consumer>
        {value => {
          const {profilesList} = value

          const lengthOfProfilesList = profilesList.length

          const conditionOfUpdateProfiles = profilesList.length > 0

          const conditionOfCreateProfiles = profilesList.length < 5

          const renderProfilesList = () => (
            <>
              {profilesList.map(eachProfile => (
                <li
                  key={eachProfile.id}
                  className="profile-list-item"
                  onClick={() => {
                    this.onClickProfileItem(eachProfile)
                  }}
                >
                  <img
                    alt={`profile${eachProfile.id}`}
                    className="add-profile-image"
                    src={eachProfile.imageUrl}
                  />
                  <p className="add-profile-name">{eachProfile.name}</p>
                </li>
              ))}
            </>
          )

          const renderLoginAndCreateProfiles = () => (
            <ul className="create-login-profiles-list">
              {conditionOfUpdateProfiles && renderProfilesList()}
              {conditionOfCreateProfiles && (
                <li
                  className="add-profile-list-item"
                  onClick={this.onCreateProfile}
                >
                  <button type="button" className="add-profile-button">
                    <ImPlus className="add-profile-icon" />
                  </button>
                  <p className="add-profile-paragraph">Add Profile</p>
                </li>
              )}
            </ul>
          )

          const renderUpdateProfiles = () => (
            <>
              {conditionOfUpdateProfiles && (
                <ul className="update-profiles-list">
                  {profilesList.map(eachProfile => (
                    <li
                      key={eachProfile.id}
                      className="update-profile-list-item"
                      onClick={this.updateProfile}
                    >
                      <div className="profile-image-container">
                        <img
                          alt={`profile${eachProfile.id}`}
                          className="update-profile-image"
                          src={eachProfile.imageUrl}
                        />
                        <div className="image-overlay image-overlay-blur">
                          <img
                            alt="edit-img"
                            className="edit-image"
                            src="https://res.cloudinary.com/breakingbad/image/upload/v1628790220/Group_7490_zuqred.png"
                          />
                        </div>
                      </div>
                      <p className="update-profile-name">{eachProfile.name}</p>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )

          return (
            <div className="profiles-page-container">
              <Header
                searchIcon={false}
                showMenuItems={false}
                avatarIcon={false}
              />
              <div className="profiles-container">
                <h1 className="profiles-heading">Who's Watching?</h1>
                {showUpdateProfiles
                  ? renderUpdateProfiles()
                  : renderLoginAndCreateProfiles()}
                {showUpdateProfiles ? (
                  <button
                    onClick={this.onSaveProfiles}
                    type="button"
                    className="update-profiles-button"
                  >
                    DONE
                  </button>
                ) : (
                  <button
                    onClick={this.onUpdateProfiles}
                    type="button"
                    className="manage-profiles-button"
                  >
                    MANAGE PROFILES
                  </button>
                )}
              </div>
              {createProfile && (
                <CreateProfile
                  OnCloseProfile={this.OnCloseProfile}
                  imageUrl={listOfProfiles[lengthOfProfilesList].imageUrl}
                />
              )}
            </div>
          )
        }}
      </ProfilesContext.Consumer>
    )
  }
}

export default Profiles
