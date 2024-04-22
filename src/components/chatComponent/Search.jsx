import React, { useContext, useState,useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { ChatContext } from "../../ChatContext";
import { db } from "../../../firebase";
import { UserContext } from "../../UserContext";
import { FiSearch, FiUser } from "react-icons/fi";
const Search = () => {
  const [username, setUsername] = useState("");
  const [users ,setUsers] =useState([])
  const [searchResults, setSearchResults] = useState([]);
  const [err, setErr] = useState(false);

  const user  = useContext(UserContext);
  const { dispatch } = useContext(ChatContext);
//console.log(user);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const q = query(collection(db, "users"));
        const querySnapshot = await getDocs(q);
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push({ ...doc.data(), id: doc.id });
        });
        setUsers(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  useEffect(()=>{
    if (username === "") {
        setSearchResults([]);
        setErr(false);
        return;
      }
  },[username])
//console.log(users);
  const handleSearch = (e) => {
    
    e.preventDefault();
    const searchTerm = username.toLowerCase();
   
    const filteredUsers = users.filter((user) => {
      return (
        user.name.toLowerCase().includes(searchTerm) 
      );
    });
    setSearchResults(filteredUsers);
   
    setErr(filteredUsers.length === 0);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

//console.log(searchResults);
  const handleSelect = async (selectedUser) => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      user.id > selectedUser.id
        ?user.id + selectedUser.id
        : selectedUser.id + user.id;
        console.log(combinedId)
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        await setDoc(doc(db, `/users/${user.id}/userChats`, user.id),{
          "userInfo": {
              id: selectedUser.id,
              displayName: selectedUser.name,
              photoURL: selectedUser.profilePicture? selectedUser.profilePicture:"",
              date: serverTimestamp(),
              combinedId,
            },
          
          });
          console.log("done");
        await setDoc(doc(db, `/users/${selectedUser.id}/userChats`, selectedUser.id),{
          "userInfo": {
              id: user.id,
              displayName: user.name,
              photoURL:user.profilePicture ? user.profilePicture: "",
              date: serverTimestamp(),
              combinedId,
            },
           
          });
          console.log("done");
          dispatch({ type: "CHANGE_USER", payload: selectedUser });
     }
      else{
        await updateDoc(doc(db, `/users/${selectedUser.id}/userChats`, selectedUser.id), {
            "userInfo": {
              id: user.id,
              displayName: user.name,
              photoURL:user.profilePicture ? user.profilePicture: "",
              date: serverTimestamp(),
              combinedId,
            },
           
          });
          await updateDoc(doc(db, `/users/${user.id}/userChats`, user.id), {
              "userInfo": {
                id: selectedUser.id,
                displayName: selectedUser.name,
                photoURL: selectedUser.profilePicture? selectedUser.profilePicture:"",
                date: serverTimestamp(),
                combinedId,
              },
            
            });
            dispatch({ type: "CHANGE_USER", payload: selectedUser});
      }
    } catch (err) {
        console.log(err);
    }

   
    setUsername("")
  };
  
  return (
    <div className="search">
     <form
        className="flex items-center justify-between px-2 border-[2px] rounded-md w-[90%] my-5 mx-auto"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          className="w-[80%] py-3 px-4 outline-none"
          placeholder="Find a user"
          onChange={(e) => {
            setUsername(e.target.value);
            handleSearch(e);
          }}
          value={username}
          onKeyDown={handleKey}
        />
        <button type="submit" className="cursor-pointer">
          <FiSearch />
        </button>
      </form>
      {err && <span>User not found!</span>}
      {searchResults.map((result) => (
        <div
        className="flex items-center  py-5 px-5 gap-2 cursor-pointer hover:text-white hover:bg-red-600"
          key={result.id} // Assuming each user has a unique ID
          onClick={() => handleSelect(result)}
        >
          {result.profilePicture ? (
            <img
              className="w-[50px] rounded-full h-[50px]"
              src={result.profilePicture}
              alt=""
            />
          ) : (
            <FiUser   className="w-[50px] rounded-full h-[50px]"/>
          )}
          <div className="userChatInfo">
            <span>{result.name}</span><br/>
          </div>
        </div>
      ))}
      <hr/>
    </div>
  );
};

export default Search;