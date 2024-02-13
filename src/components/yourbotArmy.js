import React from "react";

function YourBotArmy({army, setArmy}){
    
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
                </li>
            ))}
           </ul>
        </div>
        
    )
}

export default YourBotArmy;