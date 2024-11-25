import ReactInputMask from "react-input-mask";

export default function Input({inputType="text", placeholder="", mask, ...props}) {
    if (inputType === "text" && mask) {
        return (
            <ReactInputMask
                mask={mask}
                placeholder={placeholder}
                autoComplete="off"
                type="text"
                {...props}
            />
        );
    }
    if (inputType == "text") {
        return <input type="text" placeholder={placeholder} autoComplete="off" {...props} />
    }
    if (inputType == "number") {
        return <input type="number" placeholder={placeholder} autoComplete="off" {...props} />
    }
    if (inputType == "password") {
        return <input type="password" placeholder={placeholder} autoComplete="off" {...props} />
    }
    if (inputType == "file") {
        return <input type="file" {...props}></input>
    }
    if (inputType == "date") {
        return <input type="date" {...props}></input>
    }
    if (inputType == "datetime-local") {
        return <input type="datetime-local" {...props}></input>
    }
}