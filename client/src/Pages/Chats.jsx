import  { useEffect } from 'react'
import { fetchChats } from '../APIs/chats';
function Chats() {

    const getChats = async () => {
      try {
        const {data} = await fetchChats();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(()=>{
        getChats();
    },[])

  return (
    <div>Chats</div>
  )
}

export default Chats