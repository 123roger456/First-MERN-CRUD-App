import React, { useState, useEffect } from "react";
import "./App.css"
import Axios from "axios";

function App() {
  const [foodName, setFoodName] = useState("");
  const [foodOrigin, setFoodOrigin] = useState("");
  const [allFood, setAllFood] = useState([]);
  const [updName, setUpdName] = useState("");
  const addToList = () => {
    Axios.post("http://localhost:5000/insert", {
      name: foodName,
      origin: foodOrigin
    })
  }

  useEffect(() => {
    Axios.get("http://localhost:5000/showAll").then((res) => {
      setAllFood(res.data);
    })
  },[allFood]) 

  const update = (id) => {
    Axios.put("http://localhost:5000/udpate", ({
      id : id,
      newFoodName: updName
    }))
  }

  const deleteFood = (id) => {
    Axios.delete(`http://localhost:5000/delete/${id}`)
  }

  return (
    <div className="App">
      <h1> Food Application </h1>
      <label>Food name</label>
      <input type="text" onChange={(event) => {
        return setFoodName(event.target.value)
      }} value = {foodName}/>
      <label>Origin</label>
      <input type="text" onChange={(event) => {
        return setFoodOrigin(event.target.value)
      }} value = {foodOrigin}/>
      <button onClick={addToList}>Addt to List</button>

      <h1>Food List</h1>
      {allFood.map((food, key) => {
        return(
        <div key={key} style ={{border:"1px solid black", width:"300px", margin:"15px 15px"}}>
        <h1>{food.name}</h1>
        <h2>{food.origin}</h2>
        
        <input type="text" placeholder="change name" onChange={(event) => {(setUpdName(event.target.value))}}/>
        <button onClick={() => update(food._id)}>Update</button>
        <button onClick={() => deleteFood(food._id)}>Delete</button>
        </div>)
      })}
    </div>
  );
}

export default App;
