import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';
import ImageLinkForm from '../ImageLinkForm/ImageLinkForm';
import Rank from '../Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecogniton from '../FaceRecognition/FaceRecognition';
import SignIn from '../SignIn/SignIn';
import Register from '../Register/Register';

const app = new Clarifai.App({
 apiKey: '6075d9b52657456989f39e42c017d405',
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
      box:[],
      route:'signin',
      isSignedIn:false,
      user: {
        id:'',
        name:'',
        email:'',
        entries:'',
        joined:''
      }
    }
  }

  
 loadUser=(data)=>
 {
   console.log(data.id);
   this.setState({user:{  
     id:data.id,
     name:data.name,
     email:data.email,
     entries:data.entries,
     joined:data.joined

   }})
   //console.log(this.state);  
 }

  calculateEachFace=(clarifiFace)=>
  {
    const img = document.getElementById('face');
    const width=Number(img.width);
    const height = Number(img.height);

    return {
      leftCol: clarifiFace.left_col * width,
      topRow : clarifiFace.top_row * height,
      rightCol: width - (clarifiFace.right_col*width),
      bottomRow: height -(clarifiFace.bottom_row * height) 
       
    }

  }
  calculateFaceLocation=(data)=>
  {
   
    const regions = data.outputs[0].data.regions;
    //const clarifiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
    let box=[]
    for(let i=0 ; i < regions.length ; i++)
    {
     box.push(this.calculateEachFace(regions[i].region_info.bounding_box));
    }
    return box;

    // const img = document.getElementById('face');
    // const width=Number(img.width);
    // const height = Number(img.height);
    // //console.log(width , height);
    // return {
    //   leftCol: clarifiFace.left_col * width,
    //   topRow : clarifiFace.top_row * height,
    //   rightCol: width - (clarifiFace.right_col*width),
    //   bottomRow: height -(clarifiFace.bottom_row * height)  
    // }
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
    .then(response=>{
      console.log("before fetching");
      fetch("http://localhost:4000/image",
      {
      method:'put',
      headers: {'content-Type':'application/json'},
      body:JSON.stringify({id:this.state.user.id})
    }).then(txt => txt.json()).then(entries => this.setState(Object.assign(this.state.user,{entries:entries})))
      console.log(response)
      this.displayFacebox(this.calculateFaceLocation(response))
    }
      )
    .catch(err=> console.log(err));
    

    //https://images.unsplash.com/photo-1568967729548-e3dbad3d37e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80
      // do something with response
      //this.calculateFaceLocation(response);
      //console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
  
    
    

  }
  onRouteChange=(route)=>
  {
    
    if(route ==='signout')
    {
      this.setState({isSignedIn:false});
    }
    else if(route==='home')
    {
      this.setState({isSignedIn:true});
    }
    this.setState({route:route});
  }
  render()
  {
    

    return(


    <div className="App">

      <Particles className="particles" params={particlesOption}/>
      <Navigation isSignedIn = {this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
      {
       this.state.route === 'home' ? 
       <div>
      <Logo/>
      <Rank name={this.state.user.name} count={this.state.user.entries}/>
      <ImageLinkForm onSubmit = {this.onSubmit} onInputChange={this.onInputChange}/>
      <FaceRecogniton box = {this.state.box} imageSrc={this.state.imageUrl}/>
      </div>
      :
      (this.state.route ==='signin' ? <SignIn loadUser = {this.loadUser} onRouteChange= {this.onRouteChange}></SignIn> : <Register loadUser ={this.loadUser} onRouteChange={this.onRouteChange}></Register>)
       
       
      }
    </div>)
  }
}

export default App;
