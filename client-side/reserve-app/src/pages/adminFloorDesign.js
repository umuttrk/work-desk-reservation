import createDesk from "../api/desks";
import { getAllDesks } from "../api/desks";
import { deleteDesk } from "../api/desks";

import Hexagon from "../components/Hexagon";
import Rectangle from "../components/Rectangle";
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';



const AdminFloorDesign = () => {

  const { floor } = useParams();

  const [hexagonDesks, setHexagonDesks] = useState([]);
  const [rectangleDesks, setRectangleDesks] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllDesks(floor, localStorage.getItem("mail"), localStorage.getItem("accessToken"));
      const hexagonDeskElements = [];
      const rectangleDeskElements = [];

      result.data.forEach((data) => {
        if (data.desk_size === 2) {
          rectangleDeskElements.push(
            <Rectangle key={data.desk_group_id} deskGroupKey={data.desk_group_id} positionX={data.position_x} positionY={data.position_y} rotate={data.rotation} control={true} onMouseOver={() => { }} onMouseOut={() => { }} desks={[0, 1, 2]} color={["white", "white", "white"]} />
          );
        } else if (data.desk_size === 3) {
          hexagonDeskElements.push(
            <Hexagon key={data.desk_group_id} deskGroupKey={data.desk_group_id} positionX={data.position_x} positionY={data.position_y} rotate={data.rotation} control={true} onMouseOver={() => { }} onMouseOut={() => { }} desks={[0, 1, 2]} color={["white", "white", "white"]} />
          );
        }
      });

      setHexagonDesks(hexagonDeskElements);
      setRectangleDesks(rectangleDeskElements);
    };

    fetchData();
  }, [floor]);

  const handleAddHexagon = async () => {
    const instanceDesk = await createDesk(floor, 100, 3, 100, 0, "owner@mail.com", localStorage.getItem("mail"), localStorage.getItem("accessToken"));
    setHexagonDesks((prevHexagonDesks) => [...prevHexagonDesks,
    <Hexagon key={instanceDesk.data[0].desk_group_id} deskGroupKey={instanceDesk.data[0].desk_group_id}
      control={true} onMouseOver={() => { }} onMouseOut={() => { }} desks={[0, 1, 2]} color={["white", "white", "white"]} />])
  };

  const handleAddRectangle = async () => {
    await createDesk(floor, 100, 2, 100, 0, "owner@mail.com", localStorage.getItem("mail"), localStorage.getItem("accessToken"))
      .then((instanceDesk) => {
        setRectangleDesks((prevRectangleDesks) => [...prevRectangleDesks,
        <Rectangle key={instanceDesk.data[0].desk_group_id} deskGroupKey={instanceDesk.data[0].desk_group_id}
          control={true} onMouseOver={() => { }} onMouseOut={() => { }} desks={[0, 1, 2]} color={["white", "white", "white"]} />])
      })
  };
  const handleRemoveHexagon = async (key) => {
    const newDesks = hexagonDesks.filter((desk) => desk.key !== key);
    await deleteDesk(key, localStorage.getItem("mail"), localStorage.getItem("accessToken"));
    setHexagonDesks(newDesks);
  };
  const handleRemoveRectangle = async (key) => {
    const newDesks = rectangleDesks.filter((desk) => desk.key !== key);
    await deleteDesk(key, localStorage.getItem("mail"), localStorage.getItem("accessToken"));
    setRectangleDesks(newDesks);
  };

  return (
    <div>
      {
        hexagonDesks.map((desk) => (
          <div
            key={desk.key}
            onMouseUp={(e) => {
              if (e.button === 1) {
                console.log(desk)
                handleRemoveHexagon(desk.key);
              }
            }}>
            {desk}
          </div>
        ))
      }
      {
        rectangleDesks.map((desk) => (
          <div
            key={desk.key}

            onMouseUp={(e) => {
              if (e.button === 1) {
                console.log(desk)
                handleRemoveRectangle(desk.key);
              }
            }}>
            {desk}
          </div>
        ))
      }

      <button onClick={handleAddHexagon}>add hexagon</button>
      <button onClick={handleAddRectangle}>add rectangle</button>

    </div>
  );
};


export default AdminFloorDesign;
