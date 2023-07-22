import MainDesk from "./MainDesk";

import "../App.css"
class Hexagon extends MainDesk {
    render() {
        const {deskGroupKey,positionX,positionY,rotate}=this.props;
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
                    this.handleUpdate(deskGroupKey,position,rotation)
                }}
            >
                <div className="ust">
                    <div className="desk desk1"></div>
                </div>
                <div className="alt">
                    <div className="desk desk2"></div>
                    <div className="desk desk3"></div>
                </div>
                <div style={{
                    position:"absolute",
                    width:5,
                    height:5,
                    backgroundColor:color
                    
                }} ></div>
                <div className="rectangle rectangle1"></div>
                <div className="rectangle rectangle2"></div>
                <div className="rectangle rectangle3"></div>


            </div>
        )
    }
}


export default Hexagon