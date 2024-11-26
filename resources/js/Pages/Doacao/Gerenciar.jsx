import Button from "@/Components/Button";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import Layout from "@/Components/Layout";
import Modal from "@/Components/Modal";
import Select from "@/Components/Select";
import { router, usePage } from "@inertiajs/react";
import { PlusCircle, Trash } from "@phosphor-icons/react";
import { useState } from "react";
import ModalAdicionarSituacao from "./Components/ModalAdicionarSituacao";
import ModalCadastrarDestinoFinal from "./Components/ModalCadastrarDestinoFinal";

export default function Gerenciar() {
    let { doacao, destinosFinais, situacoes } = usePage().props;

    let [isModalFinalDestinationOpen, setIsModalFinalDestinationOpen] = useState(false);
    let [isModalAddStatusOpen, setIsModalAddStatusOpen] = useState(false);
    let [selectValue, setSelectValue] = useState('');
    let [dados, setDados] = useState({
        descricao: doacao.descricao,
        qtd: doacao.qtd,
        dataRecebimento: doacao.data_recebimento,
        idDestinoFinal: doacao.id_destino_final,
        situacoes: situacoes,
    });

    let formatDate = (dateString) => {
        let date = new Date(dateString);
        
        let day = String(date.getDate()).padStart(2, '0');
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let year = date.getFullYear();
        
        let hours = String(date.getHours()).padStart(2, '0');
        let minutes = String(date.getMinutes()).padStart(2, '0');
        
        return `${day}/${month}/${year} - ${hours}:${minutes}`;
      };

    let handleChange = (e) => {
        let { name, value } = e.target;
        setDados(prevDados => ({
            ...prevDados,
            [name]: value
        }));
    };

    let handleSelectChange = (e) => {
        setSelectValue(e.target.value);
    };

    let removeStatus = (id) => {
        setDados(prevDados => ({
            ...prevDados,
            situacoes: prevDados.situacoes.filter(item => item.id !== id)
        }));
    };

    let handleSalvar = () => {

    }

    return <Layout titulo="Gerencimanto de doação">
        <div className="flex flex-col gap-5">
            <h1>Gerenciamento de doação</h1>
            <Modal isOpen={isModalFinalDestinationOpen} onClose={() => setIsModalFinalDestinationOpen(false)}>
                <ModalCadastrarDestinoFinal />
            </Modal>
            <Modal isOpen={isModalAddStatusOpen} onClose={() => setIsModalAddStatusOpen(false)}>
                <ModalAdicionarSituacao setDados={setDados} />
            </Modal>

            <div className="flex flex-col gap-2.5">
                <Label texto="Descrição">
                    <Input placeholder="Digite a descrição da doação" name="descricao" value={dados.descricao} onChange={handleChange} />
                </Label>
                <Label texto="Quantidade">
                    <Input inputType="number" placeholder="Digite a quantidade de itens doados" name="qtd" value={dados.qtd} onChange={handleChange} />
                </Label>
                <Label texto="Data de recebimento">
                    <Input inputType="datetime-local" placeholder="Digite a data de recebimento" name="dataRecebimento" value={dados.dataRecebimento} onChange={handleChange} />
                </Label>
                <Label texto="Destino final">
                    <div className="flex gap-2.5">
                        <Select value={selectValue} onChange={handleSelectChange} options={destinosFinais} />
                        <PlusCircle className="cursor-pointer" size={42} onClick={() => setIsModalFinalDestinationOpen(true)} />
                    </div>
                </Label>
            </div>

            <div className="flex flex-col gap-2.5">
                <h2>Situação do monitoramento</h2>
                <div className="rounded-md bg-white divide-y-2">
                    {dados.situacoes.map((item, i) => {
                        return <div className="p-2.5 flex justify-between" key={i}>
                            <p>{item.status}</p>
                            <div className="flex items-center gap-2.5">
                                <p>{formatDate(item.data_atualizacao)}</p>
                                <Trash size={20} className="cursor-pointer" onClick={() => removeStatus(item.id)} />
                            </div>
                        </div>
                    })}
                    <div
                        className="p-2.5 underline text-[#06B6D4] text-center"
                        onClick={() => setIsModalAddStatusOpen(true)}
                    >
                        Adicionar situação
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2.5">
                <Button texto="Salvar" onClick={ handleSalvar } />
                <Button texto="Cancelar" btnType="secondary" onClick={() => router.visit('/')} />
            </div>
        </div>
    </Layout>
}