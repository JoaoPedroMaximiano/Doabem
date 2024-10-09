import Layout from "@/Components/Layout";
import Button from "@/Components/Button";
import Label from "@/Components/Label";
import Input from "@/Components/Input";
import TextArea from "@/Components/TextArea";
import { useState } from "react";
import { router } from "@inertiajs/react";
import Map from "@/Components/Map";
import axios from "axios";
import Swal from "sweetalert2";

export default function Cadastro() {
    let [dados, setDados] = useState({
        nome: '',
        descricao: '',
        dataInicio: '',
        dataFim: '',
        imagem: null,
        link: '',
        cep: '',
        latitude: '',
        longitude: '',
        cidade: '',
        estado: '',
        uf: '',
    });

    let handleSalvar = () => {
        let formData = new FormData();

        Object.keys(dados).forEach(key => {
            formData.append(key, dados[key]);
        });

        axios.post('/evento/cadastrar/salvar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(response => {
            console.log(response);
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

    return <Layout titulo="Cadastrar evento beneficente">
        <div className="flex flex-col gap-5">
            <h1>Cadastrar evento beneficente</h1>

            <div className="flex flex-col gap-2.5">
                <Label texto="Nome da evento">
                    <Input placeholder="Digite o nome da evento" value={dados.nome} onChange={e => setDados(p => ({...p, nome: e.target.value}))} />
                </Label>

                <Label texto="Descrição">
                    <TextArea placeholder="Digite a descricação" value={dados.descricao} onChange={e => setDados(p => ({...p, descricao: e.target.value}))} />
                </Label>

                <Label text="Data inicio">
                    <input type="date" 
                        value={dados.dataInicio}
                        onChange={e => setDados(p => ({...p, dataInicio: e.target.value}))}
                    />
                </Label>

                <Label text="Data final">
                    <input type="date" 
                        value={dados.dataInicio}
                        onChange={e => setDados(p => ({...p, datafim: e.target.value}))}
                    />
                </Label>

                <Label texto="Imagem">
                    <Input
                        inputType="file"
                        value={dados.link}
                        onChange={
                            e => setDados(p => ({
                                ...p,
                                imagem: e.target.files[0],
                                link: e.target.value
                            }))
                        }
                    />
                </Label>

                <Map setDados={setDados} />
            </div>

            <div className="flex flex-col gap-2.5">
                <Button texto="Salvar" onClick={handleSalvar} />
                <Button texto="Cancelar" btnType="secondary" onClick={() => router.visit('/')} />
            </div>
        </div>
    </Layout>
}