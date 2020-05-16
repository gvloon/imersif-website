import React from 'react'

export default ({children, title}) => (
    <html lang="en">
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="utf-8" />
            <title>{title}</title>
        </head>
        <body>
            {children}
        </body>
    </html>
)
