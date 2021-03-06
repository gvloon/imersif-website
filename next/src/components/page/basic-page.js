import { React, PropTypes, PageContext, makeStyles } from 'common'
import { Layout, Menu, Footer, Image, Breadcrumb } from 'components'
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
    },
    blocks: {
        marginTop: '-2rem',
        marginBottom: '-2rem'
    }
}))

const BasicPage = ({ context, image, breadcrumb, children }) => {
    const classes = useStyles()
    return (
        <PageContext.Provider value={context}>
            <Layout>
                <Menu />
                <div className={classes.container}>
                    {
                        image &&
                        <Image className={classes.image} src={image.url} />
                    }
                    <div className={classes.content}>
                        <Breadcrumb links={breadcrumb} />
                        <h1>{context.title}</h1>
                        <div className={classes.blocks}>
                            { children }
                        </div>
                    </div>
                </div>
                <Footer/>
            </Layout>
        </PageContext.Provider>
    )
}

BasicPage.propTypes = {
    context: PropTypes.object,
    title: PropTypes.string,
    image: PropTypes.object,
    children: PropTypes.node
}

export default BasicPage
