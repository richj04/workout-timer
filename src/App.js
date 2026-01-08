import { useState } from 'react';

function App() {
  // ========== STATE (DATA) ==========
  const [GoldTotal, SetGoldTotal] = useState(0);
  let goldMultiplier = 1;
  const shapes = ["circle", "triangle", "square", "pentagon", "star"];
  const [RolledShapes, SetRolledShapes] = useState("Roll Some Shapes!");
  const BasicLootboxPrice = 100;
  const AdvancedLootboxPrice = 1000;
  
  
  // ========== FUNCTIONS (ACTIONS) ==========
  //calculates workoutlength and converts to gold
  function workoutToGold(workoutLength){
    const randomMultiplier = Math.random() * (1.3 - .7) + .7;
    const gold = Math.round(2 * Math.pow(workoutLength, randomMultiplier) * randomMultiplier * goldMultiplier * 2);

    SetGoldTotal(GoldTotal + gold);
  }

  //Rolls 5 shapes based on a luck modifier
  function rollShapes(luck){

    const newShapes = [];
    //This algorithm sets up the random chances
    for (let i = 0; i < 5; i++){
      const shapeChance = {
        circle: 25,
        triangle: 25,
        square: 25,
        pentagon: 15,
        star: 10
      };

      if (i != 0){
        let previousShape = newShapes[i-1];
        shapeChance[previousShape] *= luck;
      }

      const shapeRange = {};
      let Total = 0;
      for (let shape in shapeChance){
        Total += shapeChance[shape]
        shapeRange[shape] = Total;
      }

      //This will now choose the shape based on the random range
      const randomInt = Math.floor(Math.random() * Total);
      for (let shape in shapeRange){
        if(shapeRange[shape] >= randomInt){
          newShapes.push(shape);
          break
        }
      }
      
    }
    SetRolledShapes(newShapes);
  }

  
  // ========== DISPLAY (JSX) ==========
  return (
    <div style={{ padding: '20px' }}>
      <h1>🏋️ GachaFitness</h1>
      
      <h2>Gold System! Total Gold: {GoldTotal}</h2>
      <button onClick = {() => workoutToGold(15)}>
        Click me 15 min workout length
      </button>
      <p>{RolledShapes}</p>
      <button onClick = {() => rollShapes(10)}>
        ROLL THE SHAPES
      </button>

   
    </div>
  );
}

export default App;
