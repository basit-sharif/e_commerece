"use client"
import { ReactNode, createContext, useEffect, useReducer, useState } from "react";
import { cartReducer } from "../reducer";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const cartContext = createContext<any>(null);

const ContextWrapper = ({ children }: { children: ReactNode }) => {
    const [userData, setUserData] = useState<any>();
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
                })
            } else {
                setUserData(null);
            }
        });
    }, [])

    function signUpUser(email: string, password: string) {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    function signInUser(email: string, password: string) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function LogOut() {
        signOut(auth);
    }

    return (
        <cartContext.Provider value={{ state, dispatch, signUpUser }}>
            {children}
        </cartContext.Provider>
    )
}

export default ContextWrapper