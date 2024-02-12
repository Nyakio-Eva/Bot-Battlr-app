import { useState } from "react";


export const useBotState = ()=> {
    const [bots, setBots] = useState([]);
    const [army, setArmy] = useState([]);

    const addToArmy = (bot) => {
        setArmy([...army, bot])
    }

    return {bots, army, setBots, addToArmy};
}


