import Button from "@/Components/Button";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

export default function ModalCadastrarDestinoFinal() {
    let [nome, setNome] = useState({});

    function cadastrar() {
        axios.post('/destino-final/cadastrar/salvar', { nome: nome })
        .then( () => {
            Swal.fire({
                title: 'Sucesso',
                icon: "success",
                html: `<ul>Cadastro realizado com sucesso</ul>`,
            });
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

    return <div className="flex flex-col gap-2.5">
        <h2>Cadastrar destino final</h2>
        <div className="flex flex-col gap-2.5">
            <Label texto="Nome do destino final">
                <Input placeholder="Digite o nome do destino final" name="nome" onChange={({ target: { value } }) => setNome(value)}/>
            </Label>
        </div>
        <div className="flex flex-col gap-2.5">
            <Button texto="Cadastrar destino final" onClick={cadastrar}/>
        </div>
    </div>
}