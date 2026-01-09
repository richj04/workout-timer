import { useState } from 'react';
import { legendary, epic, rare, common } from './data/layerDesigns';

function App() {
  // ========== STATE (DATA) ==========
  const [GoldTotal, SetGoldTotal] = useState(0);
  let goldMultiplier = 1;
  const shapes = ["circle ", "triangle ", "square ", "pentagon ", "star "];
  const [RolledShapes, SetRolledShapes] = useState("Roll Some Shapes!");
  
  const BasicLootboxPrice = 100;
  const AdvancedLootboxPrice = 1000;
  const defaultBadge = {
      shape: "circle",
      layers: 1
    };
  
  const [DisplayBadge, setDisplayBadge] = useState([]);

  //values for layer rarity
  const rarityRangeBasic = {
    common: 60,
    rare: 90, 
    epic: 99,
    legendary: 100
  };

  const rarityRangeAdvanced = {
    common: 10,
    rare: 60,
    epic: 90,
    legendary: 100
  };
  
 
  // ========== FUNCTIONS (ACTIONS) ==========
  //calculates workoutlength and converts to gold
  function workoutToGold(workoutLength){
    const randomMultiplier = Math.random() * (1.3 - .7) + .7;
    const gold = Math.round(2 * Math.pow(workoutLength, randomMultiplier) * randomMultiplier * goldMultiplier * 2);

    SetGoldTotal(GoldTotal + gold);
  }

  //Rolls 5 shapes based on a luck modifier
  function rollShapes(luck, chestType){

    const newShapes = [];
    const counter = {};
    //This algorithm sets up the random chances
    for (let i = 0; i < 5; i++){
      const shapeChance = {
        circle : 25,
        triangle : 25,
        square : 25,
        pentagon : 15,
        star : 10
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
          if (shape in counter){
            counter[shape] += 1;
          }
          else{
            counter[shape] = 1;
          }
          break
        }
      }
      
    }
    SetRolledShapes(newShapes);

    //Find Final Badge Layout
    let max = 0;
    let finalShape = "";
    let ringCount = 0;
    for (let shape in counter){
      if (counter[shape] > max){
        finalShape = shape;
        ringCount = counter[shape];
        max = counter[shape];
      }
    }

    //Second set of roll of layer rarities
    let layerDesigns = [];
    for (let i = 0; i < ringCount; i++){
      let randomInt = Math.floor(Math.random() * 100);

      if(chestType === "basic"){
        for(let range in rarityRangeBasic){
          if(rarityRangeBasic[range] >= randomInt){
            layerDesigns.push(range);
            break
          }
        }
      }else if(chestType === "advanced"){
        for(let range in rarityRangeAdvanced){
          if(rarityRangeAdvanced[range] >= randomInt){
            layerDesigns.push(range);
            break
          }
        }
      }

    }

    const newBadge = {
      shape: finalShape,
      layers: ringCount,
      layerDesign: layerDesigns
    };

    setDisplayBadge([...DisplayBadge, newBadge]);

    
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
      <button onClick = {() => rollShapes(0.5, "basic")}>
        BASIC LOOTBOX
      </button>
      <button onClick = {() => rollShapes(12, "advanced")}>
        GOD LOOTBOX
      </button>

      <p>All your badges: </p>
      {DisplayBadge.map((badge, index) => (
        <div key={index}>
          <h3>Badge #{index + 1}</h3>
          <p>Shape: {badge.shape}</p>
          <p>Rings: {badge.layers}</p>
          {badge.layerDesign.map((layerRarity, layerIndex) => (
            <p key={index}>Layer Rarity {layerIndex +1}: {layerRarity}</p>
          ))}
        </div>
      ))}

   
    </div>
  );
}

export default App;
