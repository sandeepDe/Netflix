import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import {Component} from 'react'

import './App.css'

import ProfilesContext from './Context/ProfilesContext'

import LoginForm from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Profiles from './components/Profiles'
import Home from './components/Home'
import Movies from './components/Movie'
import HomeSearch from './components/HomeSearch'
import Popular from './components/Popular'
import Account from './components/Account'
import NotFound from './components/NotFound'



class App extends Component {
  constructor(props) {
    super(props)

    const userDetails = localStorage.getItem('userDetails')

    let pattern = ''

    if (userDetails !== null) {
      const parsedUserDetails = JSON.parse(userDetails)

      const {username, password} = parsedUserDetails

      const passwordPattern = '*'.repeat(password.length)

      pattern = username + passwordPattern
    }

    const profilesList = localStorage.getItem(`${pattern}`)

    if (profilesList === null) {
      localStorage.setItem(`${pattern}`, JSON.stringify([]))
    } else {
      localStorage.setItem(`${pattern}`, `${profilesList}`)
    }

    this.state = {profilesList: JSON.parse(profilesList)}
  }

  componentDidMount() {
    const userDetails = localStorage.getItem('userDetails')

    let pattern = ''

    if (userDetails !== null) {
      const parsedUserDetails = JSON.parse(userDetails)

      const {username, password} = parsedUserDetails

      const passwordPattern = '*'.repeat(password.length)

      pattern = username + passwordPattern
    }
    const profilesList = localStorage.getItem(`${pattern}`)

    if (profilesList === null) {
      localStorage.setItem(`${pattern}`, JSON.stringify([]))
    } else {
      localStorage.setItem(`${pattern}`, `${profilesList}`)
    }

    this.setState({profilesList: JSON.parse(profilesList)})
  }

  addProfile = profileDetails => {
    this.setState(prevState => ({
      profilesList: [...prevState.profilesList, profileDetails],
    }))
  }

  updateProfileList = () => {}

  render() {
    const {profilesList} = this.state

    const userDetails = localStorage.getItem('userDetails')

    let pattern = ''

    if (userDetails !== null) {
      const parsedUserDetails = JSON.parse(userDetails)

      const {username, password} = parsedUserDetails

      const passwordPattern = '*'.repeat(password.length)

      pattern = username + passwordPattern
    }

    localStorage.setItem(`${pattern}`, JSON.stringify(profilesList))

    return (
      <BrowserRouter>
        <ProfilesContext.Provider
          value={{
            profilesList,
            addProfile: this.addProfile,
            updateProfile: this.updateProfileList,
            onLoginProfiles: this.onLoginProfiles,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/profiles" component={Profiles} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/movies/:id" component={Movies} />
            <ProtectedRoute exact path="/home/search" component={HomeSearch} />
            <ProtectedRoute exact path="/popular/:id" component={Popular} />
            <ProtectedRoute exact path="/account" component={Account} />
            <ProtectedRoute exact path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </ProfilesContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
