import "../App.css"

import MainDesk from "./MainDesk";
import { PiOfficeChairBold } from "react-icons/pi";
class Rectangle extends MainDesk {
    render() {
        const {deskKey}=this.props;
        const { position, color, dragging, rotation } = this.state;
        return (
            <div className="container"
                style={{
                    position: "absolute",
                    left: position.x,
                    top: position.y,
                    cursor: dragging ? "grabbing" : "grab",
                    transform: `rotate(${rotation}deg)`,
                }}
                draggable
                onDragStart={this.handleDragStart}
                onDragEnd={this.handleDragEnd}
                onWheel={this.handleRotate}
                 onDoubleClick={(event)=>{
                    this.handleUpdate(deskKey,position,rotation)
                }}
            
            >
                <div className="ustrect">
                    <div className="pc1"></div>
                </div>
                <div className="altrect">
                    <div className="pc2"></div>
                </div>
                <div style={{
                    position:"absolute",
                    width:5,
                    height:5,
                    backgroundColor:color
                    
                }} ></div>



            </div>
        )
    }
}


export default Rectangle