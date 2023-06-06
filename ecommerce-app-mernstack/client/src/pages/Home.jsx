import React from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/auth";

const Home = () => {
    const [auth, setAuth] = useAuth();
    console.log(auth);

    return (
        <Layout title={"Home - Ecommerce App"}>
            <h1>home</h1>
            <pre>{JSON.stringify(auth, null, 4)}</pre>
        </Layout>
    );
};

export default Home;
