import Color from './color'

export const button = {
    minHeight: 'auto',
    minWidth: 'auto',
    color: Color.white,
    border: 'none',
    borderRadius: '3px',
    position: 'relative',
    padding: '12px 30px',
    fontSize: '12px',
    fontWeight: '400',
    textTransform: 'uppercase',
    letterSpacing: '0',
    willChange: 'box-shadow, transform',
    transition:
        'box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    lineHeight: '1.42857143',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
    touchAction: 'manipulation',
    cursor: 'pointer',
    '&:hover': {
        color: Color.white,
        backgroundColor: 'rgba(255, 255, 255, 0.1);'
    },
    '& .fab,& .fas,& .far,& .fal,& .material-icons': {
        position: 'relative',
        display: 'inline-block',
        top: '0',
        marginTop: '-1em',
        marginBottom: '-1em',
        fontSize: '1.1rem',
        marginRight: '4px',
        verticalAlign: 'middle'
    },
    '& svg': {
        position: 'relative',
        display: 'inline-block',
        top: '0',
        width: '18px',
        height: '18px',
        marginRight: '4px',
        verticalAlign: 'middle'
    }
}

export const blackButton = {
    ...button,
    color: Color.black,
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.3);'
    }
}
