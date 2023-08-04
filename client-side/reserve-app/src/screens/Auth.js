import React, { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  let navigate = useNavigate();

  useEffect(()=>{
    setTimeout(()=>{
      if(localStorage.getItem("accessToken")){
        navigate("/home");
      }else{
        navigate("/login");
      }
    }, 750);
  }, []);

  return (
    <div >
      <div>
        <div >
          <header>
            <h1>Authentication is in progress...</h1>
          </header>
        </div>
      </div>
    </div>
  );
}
