import React from 'react'

const ProfilesContext = React.createContext({
  profilesList: [],
  addProfile: () => {},
  updateProfile: () => {},
  onLoginProfiles: () => {},
})

export default ProfilesContext
