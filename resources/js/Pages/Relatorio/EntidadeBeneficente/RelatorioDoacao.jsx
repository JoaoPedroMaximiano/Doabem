import Button from "@/Components/Button";
import FloatButton from "@/Components/FloatButton";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import Layout from "@/Components/Layout";
import RelatorioDoacoesCard from "@/Components/RelatorioDoacoesCard";
import { usePage } from "@inertiajs/react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useState } from "react";

export default function ListagemDoacao() {
    let { doacoes } = usePage().props;
    const [dados, setDados] = useState({
        nome: '',
        cpf: '',
        dataInicio: '',
        dataFim: '',
    });
    const [doacoesFiltradas, setDoacoesFiltradas] = useState(doacoes);

    let [expandirFiltro, setExpandirFiltro] = useState(true);

    const showFiltro = () => {
        setExpandirFiltro(prev => !prev);
    }

    const handleFiltro = () => {
        const { nome, cpf, dataInicio, dataFim } = dados;

        const doacoesFiltradas = Object.entries(doacoes).reduce((acc, [data, { itens }]) => {
          const itensFiltrados = itens.filter(item => {
            const dataItem = new Date(item.data);
            const isNomeMatch = item.descricao.toLowerCase().includes(nome.toLowerCase());
            const isCpfMatch = item.cpf.includes(cpf);
            const isDataInicioMatch = dataInicio ? dataItem >= new Date(dataInicio) : true;
            const isDataFimMatch = dataFim ? dataItem <= new Date(dataFim) : true;

            return isNomeMatch && isCpfMatch && isDataInicioMatch && isDataFimMatch;
          });

          if (itensFiltrados.length > 0) {
            acc[data] = { itens: itensFiltrados };
          }
          return acc;
        }, {});

        setDoacoesFiltradas(doacoesFiltradas);
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
                        <Input
                        placeholder="Digite descrição da doação"
                        value={dados.nome}
                        onChange={e => setDados(p => ({ ...p, nome: e.target.value }))}
                        />
                    </Label>

                    <Label texto="CPF do doador">
                        <Input
                        placeholder="Digite o cpf do doador"
                        value={dados.cpf}
                        onChange={e => setDados(p => ({ ...p, cpf: e.target.value }))}
                        />
                    </Label>

                    <Label texto="Data inicio">
                        <input
                        className="w-full"
                        type="date"
                        value={dados.dataInicio}
                        onChange={e => setDados(p => ({ ...p, dataInicio: e.target.value }))}
                        />
                    </Label>

                    <Label texto="Data fim">
                        <input
                        className="w-full"
                        type="date"
                        value={dados.dataFim}
                        onChange={e => setDados(p => ({ ...p, dataFim: e.target.value }))}
                        />
                    </Label>

                    <Button texto="Filtrar" onClick={handleFiltro} />
                </div>
            </div>
            <div>
                {Object.entries(doacoesFiltradas).map(([data, doacao], index) => (
                    <RelatorioDoacoesCard
                        key={index}
                        data={data}
                        itens={doacao.itens}
                    />
                ))}
            </div>
            <FloatButton onClick={showFiltro} icone={<MagnifyingGlass size={32} />}/>
        </div>
    </Layout>

}
