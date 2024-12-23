import FloatButton from "@/Components/FloatButton";
import Layout from "@/Components/Layout";
import Modal from "@/Components/Modal";
import ModalInformacoesEntidade from "@/Components/ModalInformacoesEntidade";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { CalendarDots, Handshake, MapPinArea, PencilSimple } from "@phosphor-icons/react";
import { useState } from "react";

export default function Detalhe() {
    let { auth } = usePage().props
    let { evento } = usePage().props;
    let { entidade } = usePage().props;
    let { local } = usePage().props;
    let [isModalEntidadeDescriptionOpen, setIsModalEntidadeDescriptionOpen] = useState(false);

    let dataInicio = new Date(evento.data_inicio);
    let dataFim = new Date(evento.data_fim);

    let diaInicio = String(dataInicio.getDate()).padStart(2, '0');
    let mesInicio = String(dataInicio.getMonth() + 1).padStart(2, '0');
    let anoInicio = dataInicio.getFullYear();

    let diaFim = String(dataFim.getDate()).padStart(2, '0');
    let mesFim = String(dataFim.getMonth() + 1).padStart(2, '0');
    let anoFim = dataFim.getFullYear();

    let handleLinkClick = () => {
        window.open('https://www.google.com/maps/@'+local.latitude+","+local.longitude+',17z?entry=ttu', '_blank');
    };
    return <Layout>
        <Modal isOpen={isModalEntidadeDescriptionOpen} onClose={() => setIsModalEntidadeDescriptionOpen(false)}>
            <ModalInformacoesEntidade dados={entidade}></ModalInformacoesEntidade>
        </Modal>

        <Head>
            <title>{evento.nome}</title>
        </Head>
        <div className="flex flex-col gap-5 ">
            <div className="flex flex-row items-center justify-between gap-1">
                <h1 className="font-bold text-x1">{evento.nome}</h1>
                <Link href="/listagem#eventos" className="underline text-[#06B6D4]">Voltar</Link>
            </div>
            <div className="flex flex-wrap gap-10">
                <img className="w-full h-auto md:max-w-[600px] md:max-h-[600px] object-contain self-start" src={evento.imagem == null ? "/storage/blank.svg" : evento.imagem} />
                <div className="w-full md:w-auto min-w-[300px] md:max-w-[800px] gap-5 flex flex-col">
                    <div onClick={() => setIsModalEntidadeDescriptionOpen(true)} className="flex flex-row items-center gap-2.5 cursor-pointer">
                        <Handshake className="text-[#06B6D4]" size={32} />
                        <h1 className="text-lg text-[#06B6D4]">{entidade.nome_fantasia}</h1>
                    </div>
                    <div className="flex flex-row items-center gap-2.5 cursor-pointer" onClick={handleLinkClick}>
                        <MapPinArea size={32} className="text-[#06B6D4]"/>
                        <h1 className="text-lg underline text-[#06B6D4]">Localização</h1>
                    </div>
                    <div className="flex flex-row items-center gap-2.5">
                        <CalendarDots size={32} />
                        <h1 className="text-lg">
                            {`${diaInicio}/${mesInicio}/${anoInicio}`} - {`${diaFim}/${mesFim}/${anoFim}`}
                        </h1>
                    </div>
                    <div className="text-justify" dangerouslySetInnerHTML={{ __html: evento.descricao.replace(/\n/g, "<br>")}}/>
                </div>
            </div>
            {auth?.user?.id && entidade?.id_usuario && auth.user.id === entidade.id_usuario && (
                <FloatButton
                    onClick={()=> router.visit('/eventos/editar/'+evento.id)}
                    icone={<PencilSimple size={32} />}/>
            )}
        </div>
    </Layout>
}
