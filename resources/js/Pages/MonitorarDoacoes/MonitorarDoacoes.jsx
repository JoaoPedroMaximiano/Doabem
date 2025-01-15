import Input from "@/Components/Input";
import Layout from "@/Components/Layout";
import { Link } from "@inertiajs/react";
import { Image } from "@phosphor-icons/react";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import ModalImagem from "./Components/ModalImagem";
import Modal from "@/Components/Modal";

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
                <Link href="/listagem" className="underline text-[#06B6D4]">Voltar</Link>
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
    let [isModalImageOpen, setIsModalImageOpen] = useState(false);
    return <div className="bg-white rounded-md divide-y-2">
        <Modal isOpen={isModalImageOpen} onClose={() => setIsModalImageOpen(false)}>
            <ModalImagem dados={doacao}></ModalImagem>
        </Modal>

        <div className="flex justify-between items-center p-2.5">
            <p>{doacao.id} - {doacao.descricao} ({doacao.qtd} qtd.)</p>
            {doacao.imagem && <Image onClick={() => setIsModalImageOpen(true)} className="text-[#06B6D4] cursor-pointer ml-auto" size={32} />}
        </div>

        {doacao.itens.map((item, index) => {
            return <div className="flex justify-between p-2.5" key={index}>
                <p>{item.status}</p>
                <p>{item.data_atualizacao}</p>
            </div>
        })}
    </div>;
}


