import Button from "@/Components/Button";
import FloatButton from "@/Components/FloatButton";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import Layout from "@/Components/Layout";
import RelatorioDoacoesCard from "@/Components/RelatorioDoacoesCard";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useState } from "react";

export default function ListagemDoacao() {
    let [dados, setDados] = useState();
    let [expandirFiltro, setExpandirFiltro] = useState(true);

    const showFiltro = () => {
        setExpandirFiltro(prev => !prev);
    }

    const doacoes = [
        {
            data: "12/01/2024",
            itens: [
                { descricao: 'Casaco', doador: 'Antônio Carlos', quantidade: 1 },
                { descricao: 'Tênis', doador: 'Carlos José', quantidade: 2 }
            ]
        },
        {
            data: "12/02/2024",
            itens: [
                { descricao: 'Alimentos', doador: 'João Souza', quantidade: 5 }
            ]
        }
    ];

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
            <div>
                {doacoes.map((doacao, index) => (
                    <RelatorioDoacoesCard key={index} data={doacao.data} itens={doacao.itens} />
                ))}
            </div>
            <FloatButton onClick={showFiltro} icone={<MagnifyingGlass size={32} />}/>
        </div>
    </Layout>

}
