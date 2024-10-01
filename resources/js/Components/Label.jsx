export default function Label({texto="", children}) {
    return <label className="flex flex-col gap-2.5">
        <p>{texto}</p>
        {children}
    </label>
}