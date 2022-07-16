import React from 'react'
import { BrowserRouter as Router ,Route} from 'react-router-dom'
import Home from './components/Home/Home'
import SignUp from './components/SignUp/SignUp'
const App = () => {
  return (
      <Router>
        <Route path="/" render={() => <Home isLogin={false} />} exact/>
        <Route path="/signup" render={(props) => <SignUp/>}/>
        <Route path="/pasautologin/:username/:code" render={(props) => <Home {...props} isLogin={true}/>}/>
      </Router>
  )
}

export default App
