export default function Input({inputType="text", placeholder="", ...props}) {
    if (inputType == "text") {
        return <input type="text" placeholder={placeholder} autoComplete="off" {...props} />
    }
    if (inputType == "password") {
        return <input type="password" placeholder={placeholder} autoComplete="off" {...props} />
    }
    if (inputType == "image") {
        return <input type="file"></input>
    }
}