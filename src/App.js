import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'

export class App extends Component {
  state = {progress : 10}
  setProgress=(progress)=>{
    this.setState({progress})
  }  

  render() {
    return (
      <Router>
          <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />
        <Navbar/>
      <div>
      <Routes>
      <Route path="/" element={<News setProgress={this.setProgress} key="general" pageSize={6} country="us" category="general" />} />
      <Route path="/business" element={<News setProgress={this.setProgress} key="business" pageSize={6} country="us" category="business" />} />
      <Route path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={6} country="us" category="entertainment" />} />
      <Route path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={6} country="us" category="science" />} />
      <Route path="/health" element={<News setProgress={this.setProgress} key="health" pageSize={6} country="us" category="health" />} />      
      <Route path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize={6} country="us" category="sports" />} />
      <Route path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={6} country="us" category="technology" />} />
      </Routes>
      </div>
      </Router>
    )
  }
}

export default App
