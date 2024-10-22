export default function Label({texto="", children, className="", ...props}) {
    return <label className={"flex flex-col gap-1 "+className} {...props}>
        <p>{texto}</p>
        {children}
    </label>
}