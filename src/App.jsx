import { Route, Routes } from "react-router-dom";

import Body from "./components/body";


import Error404 from "./Error404";

import Login from "./components/login";
import Feed from "./components/feed";
import Profile from "./components/profile";
import Connections from "./components/Connections";
import RequestRecieved from "./components/RequestRecieved";
import Premium from "./components/Premium";
import Chat from "./components/Chat";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Body></Body>}>
          <Route path="/" element={<Feed></Feed>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/profile" element={<Profile></Profile>}></Route>
          <Route path="/connections" element={<Connections></Connections>}></Route>
          
          <Route path="/request/recieved" element={<RequestRecieved></RequestRecieved>}></Route>
          <Route path="/premium" element={<Premium></Premium>}></Route>
          <Route path="/chat/:chatId" element={<Chat></Chat>}></Route>
        </Route>
        <Route path="*" element={<Error404></Error404>} />
      </Routes>
    </>
  );
}

export default App;
