import React from 'react'
import BasicPage from './basic-page'
import ParallaxPage from './parallax-page'

export const Page = ({basic_page, parallax_page, components, strings}) => {
    if (parallax_page != null) {
        return <ParallaxPage page={parallax_page} components={components} strings={strings}/>
    } else {
        return <BasicPage page={basic_page} components={components} strings={strings}/>
    }
}

export const getPages = (type) => ({
    basic_page: {
        __aliasFor: 'pageByType',
        __args: {type},
        title: true,
        content: true
    },
    parallax_page: {
        __aliasFor: 'parallaxPageByType',
        __args: {type},
        title: true,
        content: true,
        parallax_content: true,
        parallax_image: {
            url: true
        }
    }
})




