import React from 'react'

const ThemeAndVideoContext = React.createContext({
  isDarkTheme: false,
  savedVideos: [],
  activeTab: 'Home',
  toggleTheme: () => {},
  addVideos: () => {},
  changeTab: () => {},
})

export default ThemeAndVideoContext
