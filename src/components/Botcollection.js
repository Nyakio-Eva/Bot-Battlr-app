import React, {useEffect, useState} from "react";
import YourBotArmy from "./yourbotArmy";


function BotCollection(){

    const [bots, setBots] = useState([]);
    const [selectedBot, setSelectedBot]= useState(null);
    const [army, setArmy] = useState([]);

    
    useEffect(() => {
        fetchBotsData();

    },[]);

    const fetchBotsData = async () => {
        try{
            const response = await fetch("http://localhost:3000/bots");
               if(!response.ok){
               throw new Error("Error fetching bots data")
            }
            const data = await response.json();
            setBots(data)
            

        }catch(error){
            console.error('Error fetching bots:', error)
        }
        
    }

    const handleViewProfile = (bot) => {
        setSelectedBot(bot);
    }

    const handleCloseProfile = () => {
        setSelectedBot(null);
    }

    const handleAddToYourBotArmy = (bot) => {
       if(!army.find((armyBot)=> armyBot.id === bot.id)){
           setArmy([...army, bot])
       }
      
    }


    return(
        <div>
          <h1>Bot Collection</h1>
          <ul>
            {bots.map((bot) =>(
                <li key={bot.id} onClick={() => handleAddToYourBotArmy(bot)} >
                    {bot.name}
                    
                    <button onClick={() => handleViewProfile(bot)}>view profile</button>
                     
                   
                </li>
            ))}
          </ul>
          {selectedBot && (
                <div>
                    <img src={selectedBot.avatar_url} alt={selectedBot.name} />
                    <h4>{selectedBot.name}</h4>
                    <p>Health: {selectedBot.health}</p>
                    <p>Damage: {selectedBot.damage}</p>
                    <p>Armor: {selectedBot.armor}</p>
                    <p>Class: {selectedBot.bot_class}</p>
                    <p>Catchphrase: {selectedBot.catchphrase}</p>
                    <p>Created at: {selectedBot.created_at}</p>
                    <p>Updated at: {selectedBot.updated_at}</p>
                    <button onClick={handleCloseProfile}>Close Profile</button>
                </div>
            )}
            <YourBotArmy army={army} setArmy={setArmy} />
        </div>
    )
}

export default BotCollection;