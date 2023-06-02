"use client"
import { ReactNode, createContext, useEffect, useReducer, useState } from "react";
import { cartReducer } from "../reducer";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export const cartContext = createContext<any>(null);

interface indexForError {
    [key: string]: string
}

const ContextWrapper = ({ children }: { children: ReactNode }) => {
    let router = useRouter();
    const [userData, setUserData] = useState<any>();
    const [errorViaUserCredential, setErrorViaUserCredential] = useState<indexForError | "">("")
    const [loading, setLoading] = useState(false);
    const iniatizilerOfCart = {
        cart: [],
    }


    const [state, dispatch] = useReducer(cartReducer, iniatizilerOfCart);
    useEffect(() => {
        let cart = localStorage.getItem("cart") as string;
        if (cart === null) {
            localStorage.setItem("cart", JSON.stringify(state.cart));
        } else {
            iniatizilerOfCart.cart = JSON.parse(cart);
        }
    })

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(state.cart))
    }, [state.cart])







    let user = auth.currentUser;

    useEffect(() => {
        onAuthStateChanged(auth, (user: any) => {
            if (user) {
                setUserData({
                    displayName: user.displayName,
                    email: user.email,
                    uuid: user.uid,
                    photoUrl: user.photoURL,
                })
            } else {
                setUserData(null);
            }
        });
    }, [])


    let provider = new GoogleAuthProvider();

    function signUpViaGoogle() {
        setLoading(true)
        return signInWithPopup(auth, provider).then((userData: any) => {
            if (userData) {
                setUserData({
                    displayName: userData.user.displayName,
                    email: userData.user.email,
                    uuid: userData.user.uid,
                    photoUrl: userData.user.photoURL,
                });
                router.push("/")
            }
            setLoading(false)
        })
    }


    function signUpUser(email: string, password: string) {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password).then((res: any) => {
            setLoading(false);
            router.push("/");
        }).catch((res: any) => {
            setErrorViaUserCredential({
                "signUpError": "Error occured via signup with email and password"
            })
        });
        setLoading(false);
    };

    function signInUser(email: string, password: string) {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password).then((res: any) => {
            setLoading(false);
            router.push("/");
        }).catch((res: any) => {
            setErrorViaUserCredential({
                "signInError": "Error occured via signin with email and password"
            })
        });
        setLoading(false);
    }

    function LogOut() {
        setLoading(true);
        signOut(auth);
        setLoading(false);
    }

    return (
        <cartContext.Provider value={{ state, dispatch, userData, signUpUser, signUpViaGoogle, signInUser, LogOut, loading }}>
            {children}
        </cartContext.Provider>
    )
}

export default ContextWrapper