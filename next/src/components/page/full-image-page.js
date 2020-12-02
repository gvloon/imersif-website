import { React, PropTypes, PageContext, makeStyles } from 'common'
import { Layout, Menu, Footer, Image } from 'components'

import { color, container, contentPadding } from 'jss/index'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        marginTop: '50px',
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

const FullImagePage = ({ context, title, image, children }) => {
    const classes = useStyles()
    return (
        <PageContext.Provider value={context}>
            <Layout>
                <Menu color="transparent"/>
                {
                    image &&
                    <Image className={classes.root} src={image.url}>
                        <div className={classes.container}>
                            <div className={classes.content}>
                                { children }
                            </div>
                        </div>
                    </Image>
                }
                <Footer color="gray" />
            </Layout>
        </PageContext.Provider>
    )
}

FullImagePage.propTypes = {
    pageContext: PropTypes.object,
    title: PropTypes.string,
    image: PropTypes.object
}

export default FullImagePage
