import { useState } from "react";


const useBotState = ()=> {
    const [bots, setBots] = useState([]);
    const [army, setArmy] = useState([]);

    const addToArmy = (bot) => {
        setArmy([...army, bot])
    }

    return {bots, army, addToArmy};
}


export default useBotState;