import "../App.css"

import MainDesk from "./MainDesk";
import { PiOfficeChairBold } from "react-icons/pi";
class Rectangle extends MainDesk {
    render() {
        const { deskGroupKey, control ,desks} = this.props;
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
                <div className="ustrect">
                    <div
                         style={
                            {
                                cursor: !control ? "pointer" : "context-menu",
                            }
                        }
                        className="pc pc1"
                        onClick={() => {
                            if(!control)
                                this.handleSelectDesk(desks[0].desk_id)
                        }}>
                            <PiOfficeChairBold style={{position:"absolute",top:-10,transform:"rotate(180deg)"}}></PiOfficeChairBold>
                        </div>
                </div>
                <div className="altrect">
                    <div
                        style={
                            {
                                cursor: !control ? "pointer" : "context-menu",
                            }
                        }
                        className="pc pc2"
                        onClick={() => {
                            if(!control)
                                this.handleSelectDesk(desks[1].desk_id)
                        }}><PiOfficeChairBold style={{position:"absolute",bottom:-10}}></PiOfficeChairBold></div>
                </div>
                <div style={{
                    position: "absolute",
                    width: 10,
                    height: 10,
                    backgroundColor: color,
                    display: control ? "block" : "none"

                }} ></div>



            </div>
        )
    }
}


export default Rectangle