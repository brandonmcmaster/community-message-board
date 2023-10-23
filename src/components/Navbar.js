import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signOut } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirestore, query, collection, getDocs } from "firebase/firestore";





const Navbar = () => {
  const [user] = useAuthState(auth);
  const history = useNavigate();
  const [onlineUsers, setOnlineUsers] = useState(0);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const db = getFirestore();
        const q = query(collection(db, "users"));
        const querySnapshot = await getDocs(q);
        setOnlineUsers(querySnapshot.size);
      };

      fetchData();
    }
  }, [user]);

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        history.push("/login");
      })
      .catch((error) => {
        console.error("Sign Out Error", error);
      });
  };

  return (
    <nav className="bg-black text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Under The Radar
        </Link>
        <div>
          {user ? (
            <>
              <Link to="/" className="mr-4 text-white">
                Home
              </Link>
              <Link to="/dashboard" className="mr-4 text-white">
                Dashboard
              </Link>
              <Link to="/message-board" className="mr-4 text-white">
                Message Board
              </Link>
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="rounded-full w-10 h-10 mr-4"
              />
              <button onClick={handleSignout} className="text-white mr-4">
                Sign out
              </button>
            </>
          ) : (
            <Link to="/login" className="text-white">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
