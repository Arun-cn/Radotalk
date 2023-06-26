import { useState,useContext,createContext,useEffect }  from "react"

const MessageContext = createContext();

const MessageProvider = ({children})=>{
    const [message,setMessage]= useState({
        userid:[{
            message:"message",
            senderid:"senderid",
            time:'234234',
            seen:'false',
            converstionid:7546756
        }]
    })

    
    
     useEffect(()=>{
        // const msg = [345344]=[12313,324]
        
        //eslint-disable-next-line
     },[]);

    return (
        <MessageContext.Provider value={[message, setMessage]}>
        {children}
        </MessageContext.Provider>
    )
   
}

// custom hook
const useMessage =() => useContext(MessageContext);
export {useMessage,MessageProvider}