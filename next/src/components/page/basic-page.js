import { React, PropTypes, makeStyles } from 'common'
import { Layout, Menu, Footer, Image } from 'components'

import { color, container, contentPadding, merge } from 'jss/index'

const useStyles = makeStyles(theme => ({
    container: merge(
        container(theme),
        {
            paddingTop: '50px',
            backgroundColor: color.white,
            overflow: 'auto',
            flex: 1
        }
    ),
    content: merge(
        contentPadding(theme),
        {
            backgroundColor: color.white,
            paddingTop: '1rem',
            paddingBottom: '4rem',
            display: 'flex',
            flexDirection: 'column',
            [theme.breakpoints.up('xs')]: {
                paddingTop: '1.3rem'
            },
            [theme.breakpoints.up('sm')]: {
                paddingTop: '1.6rem'
            },
            [theme.breakpoints.up('md')]: {
                paddingTop: '1.9rem'
            }
        }
    ),
    image: {
        width: '100%',
        paddingTop: '25%'
    }
}))

const BasicPage = ({ context, title, image, children }) => {
    const classes = useStyles()
    return (
        <Layout title={title}>
            <Menu context={context} />
            <div className={classes.container}>
                <Image className={classes.image} image={image} />
                <div className={classes.content}>
                    { children }
                </div>
            </div>
            <Footer/>
        </Layout>
    )
}

BasicPage.propTypes = {
    context: PropTypes.object,
    title: PropTypes.string,
    image: PropTypes.object,
    children: PropTypes.node
}

export default BasicPage
