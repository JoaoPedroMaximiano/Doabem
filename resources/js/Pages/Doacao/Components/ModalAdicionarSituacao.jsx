import Button from "@/Components/Button";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import Select from "@/Components/Select";
import { useState } from "react";
import Swal from "sweetalert2";

export default function ModalAdicionarSituacao({setDados}) {
    let [selectValue, setSelectValue] = useState('');
    let [date, setDate] = useState('');

    let options = [
        {value: 'recebida', label: 'Recebida'},
        {value: 'preparacao', label: 'Em preparação'},
        {value: 'transito', label: 'Em trânsito'},
        {value: 'entregue', label: 'Entregue'},
        {value: 'cancelada', label: 'Cancelada'},
    ];

    let handleAddStatus = () => {
        if (!selectValue || !date) {
            return;
        }

        let novoStatus = {
            id: Date.now(),
            status: options.find(option => option.value === selectValue)?.label,
            data_atualizacao: date,
        };

        setDados(prevDados => ({
            ...prevDados,
            situacoes: [...prevDados.situacoes, novoStatus]
        }));

        Swal.fire({
            title: 'Sucesso',
            icon: "success",
            html: `<ul>situação adionada com sucesso</ul>`,
        });
    }

    let handleSelectChange = (e) => {
        setSelectValue(e.target.value);
    };

    return <div className="flex flex-col gap-5">
        <h2>Adicionar situação</h2>
        <div className="flex flex-col gap-2.5">
            <Label texto="Nome do destino final">
                <Select value={selectValue} onChange={handleSelectChange} options={options} />
            </Label>
            <Label texto="Data de recebimento">
                <Input inputType="datetime-local" placeholder="Digite a data da situação" value={date} onChange={(e) => setDate(e.target.value)} />
            </Label>
        </div>
        <Button texto="Adicionar situação" onClick={handleAddStatus}/>
    </div>
}
