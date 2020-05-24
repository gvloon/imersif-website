import React from 'react'
import Head from "next/head";

export default ({children, title}) => (
    <div>
        <Head>
            <title>{title}</title>
        </Head>
        {children}
    </div>
)
