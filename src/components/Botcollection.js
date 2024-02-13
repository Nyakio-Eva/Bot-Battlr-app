import React, {useEffect, useState} from "react";
import YourBotArmy from "./yourbotArmy";
import Pagination from "./pagination";


function BotCollection(){

    const [bots, setBots] = useState([]);
    const [selectedBot, setSelectedBot]= useState(null);
    const [army, setArmy] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = bots.slice(indexOfFirstPost, indexOfLastPost);
  
  

    
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

    const deleteBot = async (bot, onDeleteBot) => {
        try{
            const response = await fetch(` http://localhost:3000/bots/${bot.id}`, {
                method: "DELETE",
            });

            if(!response.ok){
                throw new Error("failed to delete bot");
            }
            onDeleteBot(bot.id);

        }catch(error){
            console.error('Error deleting bot:', error);
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

    const handleDeleteBot = (deletedBot) => {
        const updatedBots =  bots.filter((bot)=> bot.id !== deletedBot)
        setBots(updatedBots)
    }
    
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return(
        <div className="container mt-5">
          <h1 className="text-primary mb-3">Bot Collection</h1>
          <ul className="list-group mb-4">
            {bots.map((bot) =>(
                <li key={bot.id} onClick={() => handleAddToYourBotArmy(bot)} >
                    {bot.name} {currentPosts}
                    
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
            <YourBotArmy army={army} setArmy={setArmy} onDeleteBot={(bot) => deleteBot(bot, handleDeleteBot)}/>
            <Pagination 
               postsPerPage={postsPerPage}
               totalPosts ={bots.length}
               paginate={paginate}
               
            />
        </div>
    )
}

export default BotCollection;