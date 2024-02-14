import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import YourBotArmy from "./yourbotArmy";
import Pagination from "./pagination";


function BotCollection(){

    const [bots, setBots] = useState([]);
    const [selectedBot, setSelectedBot]= useState(null);
    const [army, setArmy] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    
  

    
    useEffect(() => {
        fetchBotsData();

    },[]);

    const fetchBotsData = async () => {
        try{
            const response = await fetch("https://json-server-vercel-gray.vercel.app/bots");
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
            const response = await fetch(`https://json-server-vercel-gray.vercel.app/bots/${bot.id}`, {
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
    
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = bots.slice(indexOfFirstPost, indexOfLastPost);
  


    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8">
                    <h1 className="text-primary mb-3">Bot Collection</h1>
                    <ul className="list-group mb-4">
                        {currentPosts.map((bot) => (
                            <li className="d-flex justify-content-between align-items-center" key={bot.id} onClick={() => handleAddToYourBotArmy(bot)}>
                                {bot.name}
                                <button onClick={(e) => { e.stopPropagation(); handleViewProfile(bot); }}>view profile</button>
                            </li>
                        ))}
                    </ul>
                    <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={bots.length}
                        paginate={paginate}
                    />
                    <YourBotArmy 
                    army={army} 
                    setArmy={setArmy} 
                    onDeleteBot={(bot) => deleteBot(bot, handleDeleteBot)} />
                </div>
                <div className="col-md-4">
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
                    
                    
                </div>
            </div>
        </div>
    );
    
    
}

export default BotCollection;