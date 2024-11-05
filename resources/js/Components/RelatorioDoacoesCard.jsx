import { useState } from 'react';
import { CaretDown, PencilSimple } from "@phosphor-icons/react";

function RelatorioDoacoesCard({ data, itens }) {
    const [expandirRelatorio, setExpandirRelatorio] = useState(false);

    const showRelatorio = () => {
        setExpandirRelatorio(!expandirRelatorio);
    };

    // Extrair mês e ano da data
    const dataParts = data.split('/');
    const mes = new Date(0, parseInt(dataParts[1], 10) - 1).toLocaleString('pt-BR', { month: 'long' });
    const ano = dataParts[2];

    return (
        <div className="card-relatorio-out bg-white mb-2">
            <div className="flex flex-row items-center justify-between h-10" onClick={showRelatorio}>
                <p>Doações ({itens.length} qtd.)</p>
                <div className="flex flex-row items-center justify-between">
                    <p>{`${mes.charAt(0).toUpperCase() + mes.slice(1)} de ${ano}`}</p>
                    <CaretDown size={24} />
                </div>
            </div>
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expandirRelatorio ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                {itens.map((doacao, index) => (
                    <div key={index} className="mb-2 card-relatorio-in flex flex-row items-center justify-between h-15 bg-[#F0F0F0]">
                        <div className="pl-2">
                            <p><u>{doacao.descricao}</u></p>
                            <p><u>{doacao.doador}</u></p>
                        </div>
                        <div className="flex flex-col items-end pr-2">
                            <p><u>{doacao.quantidade} qtd.</u></p>
                            <PencilSimple size={24} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RelatorioDoacoesCard;
