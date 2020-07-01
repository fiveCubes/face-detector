import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';

class App extends React.Component
{
  render()
  {
    return(
    <div className="App">
      <Navigation/>
      <Logo/>
  
      {/* <ImageLinkForm/>
      <FaceRecogniton/> */}
    </div>)
  }
}

export default App;
