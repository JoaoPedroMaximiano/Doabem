import { Eye, EyeSlash } from "@phosphor-icons/react";
import Button from "@/Components/Button";
import Input from "@/Components/Input";
import Layout from "@/Components/Layout";
import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function GerenciarConta(){
    let { usuario } = usePage().props;
    let [isPasswordVisible, setIsPasswordVisible] = useState(false);
    let [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    let [dados, setDados] = useState({
        login: '',
        email: '',
        celular: '',
        razaoSocial: '',
        nomeFantasia: '',
        cnpj: '',
        senha: '',
        senha_confirmation: ''
    });

    useEffect(() => {
        if (usuario) {
            setDados({
                login: usuario.login || '',
                email: usuario.email || '',
                celular: usuario.celular || '',
                razaoSocial: usuario.razao_social || '',
                nomeFantasia: usuario.nome_fantasia || '',
                cnpj: usuario.cnpj || '',
                senha: '',
                senha_confirmation: ''
            });
        }
    }, [usuario]);

    function confimarAtualizar(){
        Swal.fire({
            title: '<h1>Você tem certeza que quer alterar seus dados?</h1>',
            showDenyButton: true,
            confirmButtonText: "Salvar",
            denyButtonText: `Cancelar`
          }).then((result) => {
            if (result.isConfirmed){
                atualizarDadosUsuario();
            }
          });
    }

    function atualizarDadosUsuario() {
        axios.put('/gerenciar-conta/alterar', dados)
            .then(() => {
                Swal.fire({
                    title: 'Sucesso',
                    icon: "success",
                    html: `<ul>Alteração realizada com sucesso</ul>`,
                });
                router.visit('/gerenciar-conta')
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

    return <Layout titulo="Gerenciar conta">
        <div className="flex flex-col gap-5">
            <h1>Gerenciar conta</h1>
            <div className="flex flex-col gap-2.5">
                <label>
                    <p>Login</p>
                    <Input
                        placeholder="Digite seu login"
                        name="login"
                        value={dados.login}
                        onChange={({ target: { value } }) => setDados(prevDados => ({ ...prevDados, login: value }))}
                    />
                </label>

                <label>
                    <p>E-mail</p>
                    <Input
                        placeholder="Digite seu e-mail"
                        name="email"
                        value={dados.email}
                        onChange={({ target: { value } }) => setDados(prevDados => ({ ...prevDados, email: value }))}
                    />
                </label>

                <label>
                    <p>Celular</p>
                    <Input
                        placeholder="Digite seu celular"
                        name="celular"
                        value={dados.celular}
                        onChange={({ target: { value } }) => setDados(prevDados => ({ ...prevDados, celular: value }))}
                    />
                </label>

                <label>
                    <p>Razão social</p>
                    <Input
                        placeholder="Digite sua razão social"
                        name="razaoSocial"
                        value={dados.razaoSocial}
                        onChange={({ target: { value } }) => setDados(prevDados => ({ ...prevDados, razaoSocial: value }))}
                    />
                </label>

                <label>
                    <p>Nome fantasia</p>
                    <Input
                        placeholder="Digite seu nome fantasia"
                        name="nomeFantasia"
                        value={dados.nomeFantasia}
                        onChange={({ target: { value } }) => setDados(prevDados => ({ ...prevDados, nomeFantasia: value }))}
                    />
                </label>

                <label>
                    <p>CNPJ</p>
                    <Input
                        mask="99.999.999/9999-99"
                        placeholder="Digite seu CNPJ"
                        name="cnpj"
                        value={dados.cnpj}
                        onChange={({ target: { value } }) => setDados(prevDados => ({ ...prevDados, cnpj: value }))}
                    />
                </label>

                <label>
                    <p>Nova senha</p>
                    <div className="relative">
                        <Input
                            inputType={ isPasswordVisible ? "text" : "password" }
                            placeholder="Digite sua senha"
                            className="!pr-10"
                            value={dados.senha}
                            onChange={({ target: { value } }) => setDados(prevDados => ({ ...prevDados, senha: value }))}
                        />
                        <Eye
                            size={32}
                            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                            className={"absolute top-1.5 right-2 " + (isPasswordVisible ? "hidden" : "block")}
                        />
                        <EyeSlash
                            size={32}
                            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                            className={"absolute top-1.5 right-2 " + (!isPasswordVisible ? "hidden" : "block")}
                        />
                    </div>
                </label>

                <label>
                    <p>Confirmar senha</p>
                    <div className="relative">
                        <Input
                            inputType={ isConfirmPasswordVisible ? "text" : "password" }
                            placeholder="Confirmar senha"
                            className="!pr-10"
                            value={dados.senha_confirmation}
                            onChange={({ target: { value } }) => setDados(prevDados => ({ ...prevDados, senha_confirmation: value }))}
                        />
                        <Eye
                            size={32}
                            onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                            className={"absolute top-1.5 right-2 " + (isConfirmPasswordVisible ? "hidden" : "block")}
                        />
                        <EyeSlash
                            size={32}
                            onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                            className={"absolute top-1.5 right-2 " + (!isConfirmPasswordVisible ? "hidden" : "block")}
                        />
                    </div>
                </label>
            </div>
            <div className="flex flex-col gap-2.5">
                <Button texto="Salvar alterações" onClick={confimarAtualizar}/>
                <Button texto="Cancelar" btnType="secondary" onClick={() => router.visit('/')}/>
            </div>
        </div>
    </Layout>;
}
