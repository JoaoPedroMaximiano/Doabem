export default function ToggleSwitch({className, ...props}) {
    return <label className={"switch " + (className ? className : '')}>
        <input {...props} type="checkbox"/>
        <span className="slider round"></span>
    </label>
}
