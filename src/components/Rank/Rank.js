import React,{Component} from 'react';
import './Rank.css';

class Rank extends Component{
    render()
    {
        return (
        <div>
        <div className='white f3 userdetails'> {this.props.name +" Your current count is " }<p className='f2 yellow'>{this.props.count}</p></div>
        </div>
        )
       
    }
}

export default Rank;    