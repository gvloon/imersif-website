import { React, PropTypes, template, makeStyles, config } from 'common'
import { Layout, Markdown, Menu, Footer } from 'components'

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
            paddingTop: '0.7rem',
            paddingBottom: '4rem',
            display: 'flex',
            flexDirection: 'column',
            [theme.breakpoints.up('xs')]: {
                paddingTop: '1.1rem'
            },
            [theme.breakpoints.up('sm')]: {
                paddingTop: '1.5rem'
            },
            [theme.breakpoints.up('md')]: {
                paddingTop: '1.9rem'
            }
        }
    ),
    image: {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        paddingTop: '25%'
    }
}))

const BasicPage = ({ context, page, components, strings }) => {
    const classes = useStyles()
    const image = page.image.length ? config.apiUrl + page.image[0].url : null
    return (
        <Layout title={template(page.title, strings)}>
            <Menu context={context} />
            <div className={classes.container}>
                {
                    image &&
                    <div className={classes.image} style={{ backgroundImage: `url(${image})` }} />
                }
                <div className={classes.content}>
                    <Markdown source={page.content} components={components} strings={strings} />
                </div>
            </div>
            <Footer/>
        </Layout>
    )
}

BasicPage.propTypes = {
    context: PropTypes.object,
    page: PropTypes.object,
    components: PropTypes.object,
    strings: PropTypes.object
}

export default BasicPage
