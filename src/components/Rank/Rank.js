import React,{Component} from 'react';
import './Rank.css';

class Rank extends Component{
    render()
    {
        return (
        <div>
        <div className='white f3 userdetails'> {this.props.name +" Your current count is " + this.props.count}</div>
        <div>This app will detect faces in your picture , Copy and paste a image link to test</div>
        </div>
        )
       
    }
}

export default Rank;    