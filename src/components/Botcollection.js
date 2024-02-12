import React, {useEffect, useState} from "react";



function BotCollection(){

    const [bots, setBots]= useState([]);

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
            console.log(data)
            console.log(bots);

        }catch(error){
            console.error('Error fetching bots:', error)
        }
        
    }




    return(
        <div>
          <h1>Bot Collection</h1>
          <ul>
            {bots.map((bot) =>(
                <li key={bot.id}>{bot.name}</li>
            ))}
          </ul>
        </div>
    )
}

export default BotCollection;