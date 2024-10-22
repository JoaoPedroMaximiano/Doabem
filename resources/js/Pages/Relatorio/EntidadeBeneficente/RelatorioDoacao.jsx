import Button from "@/Components/Button";
import FloatButton from "@/Components/FloatButton";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import Layout from "@/Components/Layout";
import { CaretDown, MagnifyingGlass, PencilSimple } from "@phosphor-icons/react";
import { useState } from "react";

export default function ListagemDoacao() {
    let [dados, setDados] = useState();
    let [expandirFiltro, setExpandirFiltro] = useState(true);
    let [expandirRelatorio, setExpandirRelatorio] = useState(false);

    const showFiltro = () => {
        setExpandirFiltro(prev => !prev);
    }

    const showRelatorio = () => {
        setExpandirRelatorio(prev => !prev);
    };

    return <Layout titulo={'Relatório de doação'}>
        <div className="flex flex-col gap-5">
            <div className="flex flex-row items-center justify-between">
                <h1 className="font-bold text-x1">{'Relatório de doações'}</h1>
                <a href="/" className="underline text-[#06B6D4] w-100">
                    <p className="text-sm">voltar</p>
                </a>
            </div>
            
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expandirFiltro ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="flex flex-col gap-2.5">
                    <Label texto="Descrição da doação">
                        <Input placeholder="Digite descrição da doação" value={dados} onChange={e => setDados(p => ({ ...p, nome: e.target.value }))} />
                    </Label>
                    <Label texto="CPF do doador">
                        <Input placeholder="Digite o cpf do doador" value={dados} onChange={e => setDados(p => ({ ...p, cpf: e.target.value }))} />
                    </Label>
                    <Label texto="Data inicio">
                        <input className="w-full"
                            type="date"
                            value={dados}
                            onChange={e => setDados(p => ({ ...p, dataInicio: e.target.value }))} />
                    </Label>

                    <Label texto="Data fim">
                        <input className="w-full"
                            type="date"
                            value={dados}
                            onChange={e => setDados(p => ({ ...p, dataFim: e.target.value }))} />
                    </Label>

                    <Button texto="Filtrar" onClick={() => {}} />
                </div>
            </div>
            <div className="card-relatorio-out bg-white">
                <div className="flex flex-row items-center justify-between h-10" onClick={showRelatorio}>
                    <p>Doações (5 qtd.)</p>
                    <div className="flex flex-row items-center justify-between">
                        <p>Janeiro de 2024</p>
                        <CaretDown size={24} />
                    </div>
                </div>
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expandirRelatorio ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="mb-2 card-relatorio-in flex flex-row items-center justify-between h-15 bg-[#F0F0F0]">
                        <div className="pl-2">
                            <p><u>Casaco</u></p>
                            <p><u>Antônio Carlos</u></p>
                        </div>
                        <div className="flex flex-col items-end pr-2">
                            <p><u>1 qtd.</u></p>
                            <PencilSimple size={24} />
                        </div>
                    </div>
                    <div className="mb-2 card-relatorio-in flex flex-row items-center justify-between h-15 bg-[#F0F0F0]">
                        <div className="pl-2">
                            <p><u>Casaco</u></p>
                            <p><u>Antônio Carlos</u></p>
                        </div>
                        <div className="flex flex-col items-end pr-2">
                            <p><u>1 qtd.</u></p>
                            <PencilSimple size={24} />
                        </div>
                    </div>
                </div>
            </div>
            <FloatButton onClick={showFiltro} icone={<MagnifyingGlass size={32} />}/>
        </div>
    </Layout>

}