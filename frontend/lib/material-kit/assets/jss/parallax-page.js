import { container } from "assets/jss/nextjs-material-kit.js"

export default {
    section: {
    },
    image: {
        zIndex: "12",
        color: "#FFFFFF",
        ...container
    },
    container: {
        ...container,
        paddingTop: '20px',
        paddingBottom: '40px'
    },
    main: {
        background: "#FFFFFF",
        position: "relative",
        zIndex: "3"
    },
    mainRaised: {
        margin: "-60px 30px 0px",
        borderRadius: "6px",
        boxShadow:
            "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
    }
}
