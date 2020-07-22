import { React, makeStyles, config, api, pageApi, PagePropTypes } from 'common'
import { PageRenderer } from 'components'
import { ProConList } from 'components/patterns'

const marginPattern = 2

const useStyles = makeStyles(theme => ({
    patterns: {
        marginTop: '-' + marginPattern + 'rem',
        marginBottom: '-' + marginPattern + 'rem'
    },
    pattern: {
        marginTop: marginPattern + 'rem',
        marginBottom: marginPattern + 'rem',
        display: 'flex',
        flexDirection: 'column'
    },
    top: {
        display: 'flex',
        flexDirection: 'row'
    },
    image: {
        width: '25%',
        paddingTop: '20%',
        backgroundSize: 'cover'
    },
    prosAndCons: {
        marginLeft: '1rem',
        flex: 1
    },
    title: {
        fontWeight: 'bold',
        paddingTop: '0.5rem'
    }
}))

export const Page = ({ page, context, data }) => {
    const { name } = data.patternCategory
    const classes = useStyles()

    context = {
        ...context,
        section: 'patterns'
    }
    const strings = {
        Name: name
    }
    const components = {
        Patterns: () => getPatterns(data.patternCategory.patterns, classes)
    }
    return <PageRenderer context={context} page={page} strings={strings} components={components} />
}

const getPatterns = (patterns, classes) => (
    <div className={classes.patterns}>
        {
            patterns.map((pattern, index) => (
                <div key={index} className={classes.pattern}>
                    <div className={classes.top}>
                        <div className={classes.image} style={{ backgroundImage: 'url("' + config.publicApiUrl + pattern.media.url + '")' }} />
                        <ProConList className={classes.prosAndCons} prosAndCons={pattern.pros_and_cons} />
                    </div>
                    <div className={classes.title}>{pattern.title}</div>
                </div>
            ))
        }
    </div>
)

Page.PropTypes = PagePropTypes

export const getStaticProps = async context => {
    const props = await pageApi('Pattern_Category', context, {
        patternCategory: {
            __aliasFor: 'patternCategoryBySlug',
            __args: { slug: context.params.slug },
            name: true,
            patterns: {
                title: true,
                media: {
                    url: true
                },
                pros_and_cons: {
                    pros: {
                        text: true
                    },
                    cons: {
                        text: true
                    }
                }
            }
        }
    })
    return { props, unstable_revalidate: 1 }
}

export const getStaticPaths = async () => {
    const { patternCategories } = await api({
        patternCategories: {
            slug: true
        }
    })
    const paths = patternCategories.map(({ slug }) => ({
        params: { slug }
    }))
    return { paths, fallback: false }
}

export default Page
