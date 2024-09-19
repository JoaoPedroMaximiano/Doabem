export default function Input({inputType="text", placeholder="", ...props}) {
    if (inputType == "text") {
        return <input type="text" placeholder={placeholder} autoComplete="off" {...props} />
    }
}