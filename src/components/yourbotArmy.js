import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function YourBotArmy({army, setArmy, onDeleteBot}){
    
    const handleReleaseBot = (bot) => {
       const updatedArmy = army.filter((addedBot) => addedBot.id !== bot.id)
        setArmy(updatedArmy);
    }
    
    return(
        <div>
        
           <h1>Your Bot Army </h1>
            
           <ul>
            {army.map((bot) => (
                <li key={bot.id} >
                    {bot.name}
                    <button onClick={() => handleReleaseBot(bot)}>realease bot</button>
                    <button className="btn btn-danger" onClick={() => onDeleteBot(bot)}>X</button>
                </li>
            ))}
           </ul>
        </div>
        
    )
}

export default YourBotArmy;