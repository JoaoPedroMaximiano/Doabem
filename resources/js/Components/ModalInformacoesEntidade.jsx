import { Envelope, Phone, UserCircle } from "@phosphor-icons/react";

export default function ModalInformacoesEntidade({dados}) {
    return <div className="flex flex-col gap-5">
            <h1 className="text-xl">Informações da entidade</h1>
            <div className="gap-2.5 flex flex-col">
                <div className="flex flex-row items-center gap-2.5">
                    <UserCircle size={32} />
                    <p>{dados.nome_fantasia}</p>
                </div>
                <div className="flex flex-row items-center gap-2.5">
                    <Phone size={32} />
                    <p>{dados.usuario.celular}</p>
                </div>
                <div className="flex flex-row items-center gap-2.5">
                    <Envelope size={32} />
                    <p>{dados.usuario.email}</p>
                </div>
            </div>
        </div>

}
