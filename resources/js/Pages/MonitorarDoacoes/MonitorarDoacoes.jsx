import Input from "@/Components/Input";
import Layout from "@/Components/Layout";
import { Link } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

export default function MonitorarDoacoes() {
    let [listaDoacoes, setListaDoacoes] = useState([]); 

    let handleEnter = (e) => {
        if (e.key === 'Enter') {
            let cpf = e.target.value;

            axios.post('/monitorar-doacoes/get-lista-doacoes', {cpf: cpf})
                .then(response => {
                    setListaDoacoes(response.data.doacoes);
                })
                .catch(error => {
                    if (error.response && error.response.status === 422) {
                        const errors = error.response.data.errors;
                        let errorMessages = '';

                        Object.keys(errors).forEach((field) => {
                            errors[field].forEach((message) => {
                                errorMessages += `<li>${message}</li>`;
                            });
                        });

                        Swal.fire({
                            title: 'Erros de Validação',
                            icon: 'error',
                            html: `<ul>${errorMessages}</ul>`,
                        });
                    } else {
                        Swal.fire({
                            title: 'Erro inesperado',
                            text: 'Ocorreu um erro, tente novamente mais tarde.',
                            icon: 'error',
                        });
                    }
                });
        }
    }

    return <Layout titulo="Monitorar doações">
        <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <h1>Monitorar doações</h1>
                <Link href="/" className="underline text-[#06B6D4]">Voltar</Link>
            </div>

            <Input placeholder={"Digite o CPF para buscar doações"} mask={"999.999.999-99"} name="CPF" onKeyDown={handleEnter} />
            
            <ListaDoacoes lista={listaDoacoes} />
        </div>
    </Layout>
}

function ListaDoacoes({lista}) {
    if (lista.length < 1) {
        return <></>;
    }

    return <div className="flex flex-col gap-5">
        {Object.values(lista).map((doacao, i) => {
            return <CardDoacao doacao={doacao} key={i} />
        })}
    </div>;
}

function CardDoacao({doacao}) {
    return <div className="bg-white rounded-md divide-y-2">
        <p className="p-2.5">{doacao.id} - {doacao.descricao} ({doacao.qtd} qtd.)</p>
        {doacao.itens.map(item => {
            return <div className="flex justify-between p-2.5">
                <p>{item.status}</p>
                <p>{item.data_atualizacao}</p>
            </div>
        })}
    </div>;
}