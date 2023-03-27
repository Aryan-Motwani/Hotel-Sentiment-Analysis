import React, { useEffect } from "react";
import { app } from "./firebase";

const db = app.firestore();

function Storagee() {
  const [fileUrl, setFileUrl] = React.useState(null);
  const [users, setUsers] = React.useState([]);

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
    setTimeout(() => {
      onSubmit()
    },500)
  };

  const onSubmit = async () => {
    // e.preventDefault();
    // const username = e.target.username.value;
    // if (!username || !fileUrl) {
    //   return;
    // }
    db.collection("images").doc("username").set({
      name: "username",
      avatar: fileUrl,
    });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = await db.collection("images").get();
      setUsers(
        usersCollection.docs.map((doc) => {
          return doc.data();
        })
      );
    };
    fetchUsers();
    let rows = [];
        for(let i = 0; i < rows.length; i++){
            rows.pop();
        }
    db.collection("images")
            .get()
            .then((snapshot) => {
            if(snapshot.docs.length>0){
                snapshot.docs.forEach((doc) => {
                rows.push(doc.data());
            });
            console.log(rows);
        }})
  }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="file" onChange={onFileChange} />
        <input type="text" name="username" placeholder="NAME" />
        <button>Submit</button>
      </form>
      <ul>
        {users.map((user) => {
          console.log(user);
          return (
            <li key={user.name}>
              <img width="100" height="100" src={user.avatar} alt={user.name} />
              <p>{user.name}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Storagee;