import Layout from "@/Components/Layout";
import ProgressBar from "@/Components/ProgressBar";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { PencilSimple, Handshake, MapPinArea } from "@phosphor-icons/react";
import FloatButton from "@/Components/FloatButton";
import Modal from "@/Components/Modal";
import { useState } from "react";
import ModalInformacoesEntidade from "@/Components/ModalInformacoesEntidade";

export default function Detalhe() {
    let { auth } = usePage().props
    let { necessidade } = usePage().props;
    let { entidade } = usePage().props;
    let { local } = usePage().props;
    let [isModalEntidadeDescriptionOpen, setIsModalEntidadeDescriptionOpen] = useState(false);

    let handleLinkClick = () => {
        window.open('https://www.google.com/maps/@'+local.latitude+","+local.longitude+',17z?entry=ttu', '_blank');
    };

    return <Layout>
        <Modal isOpen={isModalEntidadeDescriptionOpen} onClose={() => setIsModalEntidadeDescriptionOpen(false)}>
            <ModalInformacoesEntidade dados={entidade}></ModalInformacoesEntidade>
        </Modal>

        <Head>
            <title>{necessidade.nome}</title>
        </Head>
        <div className="flex flex-col gap-5">
            <div className="flex flex-row items-center justify-between gap-1">
                <h1 className="font-bold text-x1">{necessidade.nome}</h1>
                <Link href="/listagem" className="underline text-[#06B6D4]">Voltar</Link>
            </div>
            <div className="flex flex-wrap gap-10">
                <img className="w-full h-auto md:max-w-[600px] md:max-h-[600px] object-contain" src={necessidade.imagem == null ? "/storage/blank.svg" : necessidade.imagem} />
                <div className="w-full md:w-auto min-w-[300px] md:max-w-[800px] gap-5 flex flex-col">
                    <div onClick={() => setIsModalEntidadeDescriptionOpen(true)} className="flex flex-row items-center gap-2.5 cursor-pointer">
                        <Handshake size={32} />
                        <h1 className="text-lg">{entidade.nome_fantasia}</h1>
                    </div>
                    <div className="flex flex-row items-center gap-2.5 cursor-pointer" onClick={handleLinkClick}>
                        <MapPinArea size={32} className="text-[#06B6D4]"/>
                        <h1 className="text-lg underline text-[#06B6D4]">Localização</h1>
                    </div>
                    <ProgressBar qtd_necessaria={necessidade.qtd_necessaria} qtd_falta={necessidade.qtd_doacoes}/>
                    <p className="text-justify">{necessidade.descricao}</p>
                </div>
            </div>
            {auth?.user?.id && entidade?.id_usuario && auth.user.id === entidade.id_usuario && (
                <FloatButton
                    onClick={() => router.visit('/necessidades/editar/' + necessidade.id)}
                    icone={<PencilSimple size={32} />}
                />
            )}
        </div>
    </Layout>
}
