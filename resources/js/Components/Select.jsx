export default function Select({options, ...props}) {
    if (options && options.length > 0) {
        return <select {...props}>
            <option value="">Selecione</option>
            {options.map((item, i) => {
                return <option key={i} value={item.value}>{item.label}</option>
            })}
        </select>;
    }
    return <select {...props}>
        <option value="">Nenhum registro encontrado.</option>
    </select>;
}