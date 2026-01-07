import { useState } from 'react';

function App() {
  const shapes = ["circle", "square", "triangle", "hexagon", "star"];
  const [RolledShapes, SetRolledShapes] = useState("");
  const [Winner,SetWinner] = useState("winner: ");

  function rollandcount(){
    //creates array of random shapes
    const randomShapes = [];
    for (let i = 0; i < 5; i++){
      const randomShape = shapes[Math.floor(Math.random()*shapes.length)];
      randomShapes.push(randomShape);
    }
    SetRolledShapes(randomShapes);

    //counting maximum
    const counter = {};
    for(const shape of randomShapes){
      if(shape in counter){
        counter[shape] ++;
      }else{
        counter[shape] = 1;
      }
    }

    //llooping throuhg counter
    let currentMax = 0;
    let maxShape = "";
    for(const shape in counter){
      if(counter[shape] > currentMax){
        currentMax = counter[shape];
        maxShape = shape;
      }
    }
    SetWinner(maxShape);
  }
  return(
    <div>
      <p>Rolled Shapes: {RolledShapes}</p>
      <p>Winner: {Winner}</p>
      <button onClick={rollandcount}>
        click me!
      </button>
    </div>
  )
}


export default App;