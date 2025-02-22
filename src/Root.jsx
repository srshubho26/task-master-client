import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import useAxiosWithCredentials from "./hooks/useAxiosWithCredentials";
import { useState, useEffect } from "react";
import auth from "./firebase/firebase.config";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";

const googleAuth = new GoogleAuthProvider();

const Root = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosWithCredentials = useAxiosWithCredentials(setLoading);
    const [dark, setDark] = useState(JSON.parse(localStorage.getItem('dark')) || false);

    useEffect(() => {
        setLoading(true);
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            if (currentUser) {
                const { uid, email, displayName } = currentUser;
                axiosWithCredentials.post("/jwt", { uid, email, displayName })
                    .then(() => {
                        setUser(currentUser);
                        setLoading(false);
                    })
            } else {
                setLoading(false);
            }
        });

        return unsubscribe;
    }, [axiosWithCredentials]);

    useEffect(() => {
        document.body.classList[dark ? 'add' : 'remove']('dark');
    }, [dark])

    // Google Signin
    const googleSignin = () => signInWithPopup(auth, googleAuth);


    // Logout function
    const logOut = async () => {
        setLoading(true);
        await axiosWithCredentials.post("/logout");
        setUser(null);
        return signOut(auth);
    }

    return (<>
        {loading ? <span>Loading...</span> : <>{user ? <Home logout={logOut} /> : <Login signIn={googleSignin} />}</>}
    </>);
};

export default Root;