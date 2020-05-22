import React from 'react'

export default ({id}) => (
    <iframe width="1280" height="720" src={`https://www.youtube.com/embed/${id}`} frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
)
