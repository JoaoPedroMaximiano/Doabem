import { useState } from 'react';
import { CaretDown, PencilSimple } from "@phosphor-icons/react";
import { router } from '@inertiajs/react';

export default function DoacoesCard({ data, itens }) {
    let [expandirRelatorio, setExpandirRelatorio] = useState(false);
    let showRelatorio = () => {
        setExpandirRelatorio(!expandirRelatorio);
    };

    let dataParts = data.split('-');
    let mes = new Date(parseInt(dataParts[1], 10), parseInt(dataParts[0], 10) - 1).toLocaleString('pt-BR', { month: 'long' });
    let ano = dataParts[1];

    return (
        <div className="card-relatorio-out bg-white mb-2">
            <div className="flex flex-row items-center justify-between h-10 cursor-pointer" onClick={showRelatorio}>
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
                        <p className="underline md:hidden">
                            {doacao.descricao.substring(0, 20)}
                            {doacao.descricao.length > 20 ? '...' : ''}
                        </p>
                        <p className="underline hidden md:block">{doacao.descricao}</p>

                        <p className="underline md:hidden">
                            {doacao.nome.substring(0, 20)}
                            {doacao.nome.length > 20 ? '...' : ''}
                        </p>
                        <p className="underline hidden md:block">{doacao.nome}</p>
                        </div>
                        <div className="flex flex-col items-end pr-2 w-20">
                            <p><u>{doacao.quantidade} qtd.</u></p>
                            <PencilSimple className='cursor-pointer' size={24} onClick={() => router.visit('/doacao/gerenciar/' + doacao.id_doacao)} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
