import React, { Component } from 'react';
import './SignIn.css';

class SignIn extends Component {

    constructor()
    {
        super();
        this.state={signInEmail:'',
    password:''}
    }
    onEmailchange=(event)=>{
        this.setState({signInEmail:event.target.value});

    }
    onPasswordchange=(event)=>{
        this.setState({password:event.target.value});

    }
    onSubmit=()=>
    {
        //console.log(this.state);
        console.log("submitting signform");
        fetch('http://localhost:4000/signin ', {
        method:'post',
        headers: {'content-Type':'application/json'},
        body:JSON.stringify({email:this.state.signInEmail, password:this.state.password})}
        )
        .then(response => response.json())
        .then(user =>
            {
            if(user.id)
            {
            this.props.loadUser(user)
            this.props.onRouteChange('home')}}
        )
        .catch(err => console.log(err));
        
        
    }
    render() {
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" Htmlfor="email-address">Email</label>
                            <input onChange={this.onEmailchange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address"/>
      </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" Htmlfor="password">Password</label>
                                <input onChange={this.onPasswordchange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password"/>
      </div>
            
    </fieldset>
                                <div className="">
                                    <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit"  onClick={this.onSubmit} value="Sign in"/>
    </div>
                                    <div className="lh-copy mt3">
                                        <p  onClick={()=> this.props.onRouteChange('Register')}  className="f6 link dim black db pointer">Register</p>
                                    </div>
  </div>
</main>
</article>

      )
    }
}

export default SignIn;