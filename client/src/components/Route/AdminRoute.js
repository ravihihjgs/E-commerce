import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../spinner";

export default function AdminRoute() {
    const [loading, setLoading] = useState(true);
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            try {
                if (!auth?.token) {
                    setOk(false);
                    setLoading(false);
                    return;
                }
                
                const res = await axios.get("/api/v1/auth/admin-auth");
                if (res.data.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                }
            } catch (error) {
                console.error("Error checking admin authentication:", error);
                setOk(false);
            }
            setLoading(false);
        };
        authCheck();
    }, [auth?.token]);


   return ok ? <Outlet /> :  <Spinner path=""/>

}
