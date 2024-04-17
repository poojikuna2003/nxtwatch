import {Component} from 'react'

import {Route, Switch, Redirect} from 'react-router-dom'

import LoginRoute from './components/LoginRoute'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import ThemeAndVideoContext from './Context/ThemeAndVideoContext'
import './App.css'

// Replace your code here

class App extends Component {
  state = {
    isDarkTheme: false,
    savedVideos: [],
    activeTab: 'HOME',
  }

  /* <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={LoginRoute} />
      </Switch> */

  toggleTheme = () => {
    this.setState(prevState => ({
      isDarkTheme: !prevState.isDarkTheme,
    }))
  }

  changeTab = tab =>
    this.setState({
      activeTab: tab,
    })

  render() {
    const {isDarkTheme, savedVideos, activeTab} = this.state

    return (
      <ThemeAndVideoContext.Provider
        value={{
          isDarkTheme,
          toggleTheme: this.toggleTheme,
          activeTab,
          changeTab: this.changeTab,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <ProtectedRoute exact path="/" component={Home} />
        </Switch>
      </ThemeAndVideoContext.Provider>
    )
  }
}

export default App
