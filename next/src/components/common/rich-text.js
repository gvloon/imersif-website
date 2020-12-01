import { React, PropTypes, makeStyles } from 'common'

const useStyles = makeStyles({
})

const RichText = props => {
    const { value, className } = props
    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{ __html: value}}
        />
    )
}

export default RichText
