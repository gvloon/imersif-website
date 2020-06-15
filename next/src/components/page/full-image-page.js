import { React, PropTypes, template, config, makeStyles } from 'common'
import { Layout, Markdown, Menu, Footer } from 'components'

import { color, container, contentPadding } from 'jss/index'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        marginTop: '50px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: color.white
    },
    container: {
        ...container(theme)
    },
    content: {
        ...contentPadding(theme),
        width: '70%',
        [theme.breakpoints.up('xs')]: {
            width: '60%'
        },
        [theme.breakpoints.up('sm')]: {
            width: '50%'
        }
    }
}))

const ParallaxPage = ({ context, page, components, strings }) => {
    const classes = useStyles()
    const image = page.parallax_image ? config.publicApiUrl + page.parallax_image[0].url : null
    return (
        <Layout title={template(page.title, strings)}>
            <Menu color="transparent" context={context} />
            <div className={classes.root} style={{ backgroundImage: `url(${image})` }}>
                <div className={classes.container}>
                    <div className={classes.content}>
                        <Markdown source={page.parallax_content} components={components} strings={strings} />
                    </div>
                </div>
            </div>
            <Footer color="gray" />
        </Layout>
    )
}

ParallaxPage.propTypes = {
    context: PropTypes.object,
    page: PropTypes.object,
    components: PropTypes.object,
    strings: PropTypes.object
}

export default ParallaxPage
