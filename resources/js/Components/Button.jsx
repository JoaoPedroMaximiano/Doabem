export default function Button({btnType="primary", texto, onClick, ...props}) {
    if (btnType == "primary") {
        return <button className="btn-primary" onClick={onClick} {...props} >{texto}</button>
    }
    if (btnType == "secondary") {
        return <button className="btn-secondary" onClick={onClick} {...props} >{texto}</button>
    }
    if (btnType == "tertiary") {
        return <button className="btn-tertiary" onClick={onClick} {...props} >{texto}</button>
    }
}