import { React } from 'common'
import BasicPage from './basic-page'
import FullImagePage from './full-image-page'

const PageRenderer = ({ context, page, components, strings }) => {
    if (page.parallax_page != null) {
        return <FullImagePage context={context} page={page.parallax_page} components={components} strings={strings}/>
    } else {
        return <BasicPage context={context} page={page.basic_page} components={components} strings={strings}/>
    }
}

export default PageRenderer
