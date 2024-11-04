export default function Radio({texto, name, value, checked, onChange, ...props}) {
    return <label className="flex gap-2.5 items-center" {...props}>
        <input type="radio" name={name} value={value} checked={checked} onChange={onChange} />
        <p>{texto}</p>
    </label>;
}