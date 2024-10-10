import FloatButton from "@/Components/FloatButton";
import Layout from "@/Components/Layout";
import { Head, router, usePage } from "@inertiajs/react";
import { CalendarDots, Handshake, MapPinArea, PencilSimple } from "@phosphor-icons/react";

export default function Detalhe() {
    let { auth } = usePage().props
    let { evento } = usePage().props;
    let { entidade } = usePage().props;
    let { local } = usePage().props;
    const dataInicio = new Date(evento.data_inicio);
    const dataFim = new Date(evento.data_fim);
    
    const diaInicio = String(dataInicio.getDate()).padStart(2, '0');
    const mesInicio = String(dataInicio.getMonth() + 1).padStart(2, '0');
    const anoInicio = dataInicio.getFullYear();
    
    const diaFim = String(dataFim.getDate()).padStart(2, '0');
    const mesFim = String(dataFim.getMonth() + 1).padStart(2, '0');
    const anoFim = dataFim.getFullYear();

    const handleLinkClick = () => {
        window.open('https://www.google.com/maps/@'+local.latitude+","+local.longitude+',17z?entry=ttu', '_blank');
    };
    return <Layout>
        <Head>
            <title>{evento.nome}</title>
        </Head>
        <div className="flex flex-col gap-2.5">
            <div className="flex flex-row items-center justify-between">
                <h1 className="font-bold text-x1">{evento.nome}</h1>
                <a href="/" className="underline text-[#06B6D4] w-100">
                    <p className="text-sm">voltar</p>
                </a>
            </div>
            <img src={evento.imagem == null ? "/storage/blank.svg" : evento.imagem} />
            <div className="flex flex-row items-center gap-2.5">
                <Handshake size={32} />
                <h1 className="text-lg">{entidade.razao_social}</h1>
            </div>
            <div className="flex flex-row items-center gap-2.5" onClick={handleLinkClick}>
                <MapPinArea size={32} className="text-[#06B6D4]"/>
                <h1 className="text-lg underline text-[#06B6D4]">Localização</h1>
            </div>
            <div className="flex flex-row items-center gap-2.5">
                <CalendarDots size={32} />
                <h1 className="text-lg">
                    {`${diaInicio}/${mesInicio}/${anoInicio}`} - {`${diaFim}/${mesFim}/${anoFim}`}
                </h1>
            </div>
            <p>{evento.descricao}</p>
            {auth?.user?.id && entidade?.id_usuario && auth.user.id === entidade.id_usuario && (
                <FloatButton 
                    onClick={()=> router.visit('/eventos/editar/'+evento.id)} 
                    icone={<PencilSimple size={32} />}/>
            )}
        </div>
            
    </Layout>
}