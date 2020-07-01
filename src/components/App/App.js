import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';
import ImageLinkForm from '../ImageLinkForm/ImageLinkForm';
import Rank from '../Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecogniton from '../FaceRecognition/FaceRecognition'

const app = new Clarifai.App({
 apiKey: 'd9429043d8504b68ae79151c11231a83'
});

const particlesOption={
  particles: {
    number:{
      value:100,
      density:{
        enable:true,
        value_are:800
      }
    }
  }
}

class App extends React.Component
{

  constructor()
  {
    super();
    this.state = {
      input:'',
      imageUrl:'',
      box:''
    }
  }

  calculateFaceLocation=(data)=>
  {
    
     const clarifiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
    const img = document.getElementById('face');
    const width=Number(img.width);
    const height = Number(img.height);
    //console.log(width , height);
    return {
      leftCol: clarifiFace.left_col * width,
      topRow : clarifiFace.top_row * height,
      rightCol: width - (clarifiFace.right_col*width),
      bottomRow: height -(clarifiFace.bottom_row * height)  
    }
  }

  displayFacebox=(box)=>
  { 
     this.setState({box:box});
  }

  onInputChange= (event)=>{
    //console.log(event.target.value);
    this.setState({input:event.target.value});
    


  }

  onSubmit = ()=>
  {
    this.setState({imageUrl: this.state.input});
    app.models.predict( 
      Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response=>this.displayFacebox(this.calculateFaceLocation(response)))

    .catch(err=> console.log(err));
    

    //https://images.unsplash.com/photo-1568967729548-e3dbad3d37e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80
      // do something with response
      //this.calculateFaceLocation(response);
      //console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
  
    
    

  }
  render()
  {
    

    return(
    <div className="App">

      <Particles className="particles" params={particlesOption}/>
      <Navigation/>
      <Logo/>
      <Rank/>
      <ImageLinkForm onSubmit = {this.onSubmit} onInputChange={this.onInputChange}/>
      <FaceRecogniton box = {this.state.box} imageSrc={this.state.imageUrl}/>
    </div>)
  }
}

export default App;
