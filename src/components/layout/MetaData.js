import React from 'react'
import { Helmet } from 'react-helmet'

const MetaData = ({ title }) => {
    return (
        <Helmet>
            <title>{`${title} - The ECo App `}</title>
        </Helmet>
    )
}

export default MetaData