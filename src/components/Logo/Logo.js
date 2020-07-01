import React,{Component} from 'react';
import './Logo.css';
import Tilt from 'react-tilt';
import brain from './brain.png';

class Logo extends Component{
    render()
    {
        return (<div className="ma4 mto">
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
 <div className="Tilt-inner pa3"> <img style={{paddingTop:'5px'}}src={brain} alt="brain"/></div>
</Tilt>
        </div>
       )
    }
}

export default Logo;