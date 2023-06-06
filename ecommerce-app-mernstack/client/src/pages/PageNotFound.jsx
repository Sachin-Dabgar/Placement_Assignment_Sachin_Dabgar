import React from "react";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <Layout title={"PageNotFound - Ecommerce App"}>
            <div className="pnf flex min-h-[65vh] flex-col items-center justify-center">
                <h1 className="pnf-title text-[100px] font-[700]">404</h1>
                <h2 className="pnf-heading font-normal text-3xl">
                    Oops! Page Not Found
                </h2>
                <Link
                    className="pnf-btn text-black border-2 border-solid border-black p-[10px] mt-[40px]"
                    to={"/"}
                >
                    Go Back
                </Link>
            </div>
        </Layout>
    );
};

export default PageNotFound;
