import { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import axios from "axios"
function Feed() {

    const FeedData = async () => {
        try {
            const res = await axios.get(BASE_URL + '/feed', {
            withCredentials:true
            })
            console.log(res.data)
        }
        catch (err) {
            console.log(err.message)
        }
    }


    useEffect(() => {
        FeedData(); 
     },[])

    return <h1>feed</h1>
    
}
export default Feed;