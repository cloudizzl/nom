import "../styles/global.css"

const Scrollbar = ({ children }) => {
        return (
            <div className="scroll-container">
                {children}
            </div>
        )
    }

export default Scrollbar;