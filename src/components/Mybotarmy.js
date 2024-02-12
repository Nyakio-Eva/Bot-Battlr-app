import React from "react";
import {useBotState} from "./useBotState";


function MyBotArmy(){

    const { army, addToArmy } = useBotState();

    return(
        <div>
           <h1>My Bot Army </h1>
           <ul>
            {army.map((bot) => (
                <li key={bot.id}>
                   {bot.name} 
                </li>
            ))}
           </ul>
        </div>
    )
}

export default MyBotArmy;