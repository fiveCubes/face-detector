import React,{Component} from 'react';
import './FaceRecognition.css';

class FaceRecognition extends Component{
    render()
    {  
    
        const box= this.props.box;
        const faces = box.map((point,i) => 
            {
                return <div key={i} className="bounding-box" style={{top:point.topRow, right:point.rightCol, bottom:point.bottomRow ,left: point.leftCol}}></div>
            }
            )
        console.log("FaceRecog")
        console.log(box)
        return (
            <div className="center ma">
            <div className="absolute mt2">
                <img id="face" src={this.props.imageSrc} alt="faceimage" width='500px' height='auto'></img>
                {faces}
                {/* <div className="bounding-box" style={{top:box.topRow, right:box.rightCol, bottom:box.bottomRow ,left: box.leftCol}}>     */}
                {/* </div> */}
            </div>

            </div>
       )
    }
}

export default FaceRecognition
;