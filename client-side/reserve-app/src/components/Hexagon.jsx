import MainDesk from "./MainDesk";
import { PiOfficeChairBold } from "react-icons/pi";

import "../App.css"
class Hexagon extends MainDesk {
    render() {
        const { deskGroupKey, control, desks } = this.props;
        const { position, color, dragging, rotation } = this.state;
        return (

            <div className="container"
                style={{

                    position: "absolute",
                    left: position.x,
                    top: position.y,
                    //cursor: dragging ? "grabbing" : "grab",
                    transform: `rotate(${rotation}deg)`,
                }}
                draggable
                onDragStart={(event) => {
                    if (control)
                        this.handleDragStart(event)
                    else
                        return null;

                }}
                onDragEnd={
                    (event) => {
                        if (control)
                            this.handleDragEnd(event)
                        else
                            return null;
                    }

                }
                onWheel={
                    (event) => {
                        if (control)
                            this.handleRotate(event)
                        else
                            return null;
                    }
                }
                onDoubleClick={(event) => {
                    if (control)
                        this.handleUpdate(deskGroupKey, position, rotation)
                    else
                        return null;
                }}
            >
                <div className="ust">
                    <div
                        style={
                            {
                                cursor: !control ? "pointer" : "context-menu",

                            }
                        } className="desk desk1" onClick={() => {
                            if(!control)
                                this.handleSelectDesk(desks[0].desk_id)
                        }}><PiOfficeChairBold style={{position:"absolute",top:-15}}></PiOfficeChairBold></div>
                </div>
                <div className="alt">
                    <div
                        style={
                            {
                                cursor: !control ? "pointer" : "context-menu",

                            }
                        } className="desk desk2" onClick={() => {
                            if(!control)
                                this.handleSelectDesk(desks[1].desk_id)
                        }}><PiOfficeChairBold style={{position:"absolute",top:-15}}></PiOfficeChairBold></div>
                    <div
                        style={
                            {
                                cursor: !control ? "pointer" : "context-menu",

                            }
                        } className="desk desk3" onClick={() => {
                            if(!control)
                                this.handleSelectDesk(desks[2].desk_id)
                        }}><PiOfficeChairBold style={{position:"absolute",top:-15}}></PiOfficeChairBold></div>
                </div>
                <div style={{
                    position: "absolute",
                    width: 5,
                    height: 5,
                    backgroundColor: color,
                    display: control ? "block" : "none"

                }} ></div>
                <div className="rectangle rectangle1"></div>
                <div className="rectangle rectangle2"></div>
                <div className="rectangle rectangle3"></div>


            </div>
        )
    }
}


export default Hexagon