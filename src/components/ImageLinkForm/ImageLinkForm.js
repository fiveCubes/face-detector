import React,{Component} from 'react';
import './ImageLinkForm.css';

class ImageLinkForm extends Component{

    render()
    {
        //console.log(this.props);
        return (
            <div>
                <p className='f3'>
                    {'This magic Brain will detect faces in your pictures'}
                </p>
                <div className='center'>
                    <div className="center form pa4 br3 shadow-3">
                    <input className='f4 pa2 w-70 center' onChange={this.props.onInputChange} type="text"></input>
                    <button onClick = {this.props.onSubmit} className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'>detect</button>
                    </div>
                </div>
            </div>
       )    
    }
}

export default ImageLinkForm;