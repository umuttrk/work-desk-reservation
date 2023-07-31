import React, { Component } from "react";
import { updateDesk } from "../api/desks";
import { handlePopUp } from "../screens/DeskReservationPage"

class MainDesk extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dragging: false,
            offset: { x: 0, y: 0 },
            position: { x: props.positionX || 100, y: props.positionY || 100 },
            rotation: props.rotate || 0,
            colorIndicator: "black"
        }
    }
    handleDivClick = (divId) => {
        this.props.onDivClick(divId);
    };

    handleDragStart = (event) => {
        this.setState({
            dragging: true,
            offset: {
                x: event.clientX - this.state.position.x,
                y: event.clientY - this.state.position.y,
            }
        })

        //event.dataTransfer.setData("text/plain", "");
    };
    handleUpdate = async (deskGroupKey, position, rotation) => {
        console.log(deskGroupKey)
        const result = await updateDesk(deskGroupKey, position.x, position.y, rotation);
        if (result.message==="success") {
            this.setState({
                colorIndicator: "green",
                dragging: true
            }) 
        }else{
            this.setState({
                color: "red",
            }) 
        }
       
    }
    handleDragEnd = (event) => {
        this.setState({
            colorIndicator: "orange",
            dragging: false,
            position: { x: event.clientX - this.state.offset.x, y: event.clientY - this.state.offset.y }
        })
    };

    handleRotate = (event) => {
        console.log(event.deltaY)
        const { rotation } = this.state;
        const newRotation = rotation + event.deltaY / 25;
        this.setState({
            colorIndicator: "orange",
            rotation: newRotation
        })
    };
    handleSelectDesk = (desk_id) => {
        this.handleDivClick(desk_id)
    }
    render() {
        // const { position, color  } = this.props;
        const { dragging, rotation, position, colorIndicator } = this.state;
        return (
            <div
                style={{
                    position: "absolute",
                    left: position.x,
                    top: position.y,
                    // width: 100,
                    // height: 100,
                    border: "1px solid black",
                    overflow: "auto",
                    //border: "1px solid " + color,
                    cursor: dragging ? "grabbing" : "grab",
                    transform: `rotate(${rotation}deg)`, // Dönüş açısı burada uygulanır
                }}
            //draggable="true"
            //onDragStart={this.handleDragStart}
            //onDragEnd={this.handleDragEnd}
            //onWheel={this.handleRotate}

            >

            </div>)

    }


}

export default MainDesk;