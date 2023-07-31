import "../App.css"

import MainDesk from "./MainDesk";
import { PiOfficeChairBold } from "react-icons/pi";
class Rectangle extends MainDesk {
    render() {
        const { deskGroupKey, control, desks, onMouseOver, onMouseOut, color } = this.props;
        const { position, dragging, rotation,colorIndicator } = this.state;
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
                        onMouseOver={(event) => {
                            if (!control)
                                onMouseOver(event.pageX, event.pageY, desks[0].desk_id)
                            //handleMouseOver()
                        }}
                        onMouseOut={() => {
                            onMouseOut()
                        }}
                        style={
                            {
                                cursor: !control ? "pointer" : "context-menu",
                                backgroundColor:color[0]
                            }
                        }
                        className="pc pc1"
                        onClick={() => {
                            if (!control)
                                this.handleSelectDesk(desks[0].desk_id)
                        }}><span style={{ position: "absolute", color: "black" }}>{desks[0].desk_id}</span>
                        <PiOfficeChairBold style={{ position: "absolute", top: -15, transform: "rotate(180deg)" }}></PiOfficeChairBold>
                    </div>
                </div>
                <div className="altrect">
                    <div
                        onMouseOver={(event) => {
                            if (!control)
                                onMouseOver(event.pageX, event.pageY, desks[1].desk_id)
                            //handleMouseOver()
                        }}
                        onMouseOut={() => {
                            onMouseOut()
                        }}
                        style={
                            {
                                cursor: !control ? "pointer" : "context-menu",
                                backgroundColor: color[1]
                            }
                        }
                        className="pc pc2"
                        onClick={() => {
                            if (!control)
                                this.handleSelectDesk(desks[1].desk_id)
                        }}>
                        <span
                            style={{ position: "absolute", color: "black" }}>
                            {desks[1].desk_id}
                        </span>
                        <PiOfficeChairBold style={{ position: "absolute", bottom: -15 }}></PiOfficeChairBold>
                    </div>

                </div>
                <div style={{
                    position: "absolute",
                    width: 10,
                    height: 10,
                    backgroundColor: colorIndicator,
                    display: control ? "block" : "none"

                }} ></div>



            </div>
        )
    }
}


export default Rectangle