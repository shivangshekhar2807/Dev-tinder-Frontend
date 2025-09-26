import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constant'
import UserConnectionCard from './UserConnectionCard'

const Connections = () => {

    const [connection,setConnection]=useState([])

    useEffect(() => {
        const fetchConnections = async () => {

            try {
                const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
                
                console.log("res.data.data", res.data.data);
                setConnection(res.data.data);
            }
            catch (err) {
                console.log(err)
            }
           
            
        }
        fetchConnections();
    },[])
  return (
    <div className="p-5">
     
      <h1 className="text-3xl font-bold text-center mb-6">My Connections</h1>

     
      {connection.length > 0 ? (
        <UserConnectionCard connectionData={connection} />
      ) : (
        <p className="text-center text-gray-500 text-lg">
          You do not have any connections
        </p>
      )}
    </div>
  );
}

export default Connections