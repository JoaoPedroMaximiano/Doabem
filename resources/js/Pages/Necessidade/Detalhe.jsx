import Layout from "@/Components/Layout";
import ProgressBar from "@/Components/ProgressBar";
import { Head, usePage } from "@inertiajs/react";
import { Handshake, MapPinArea } from "@phosphor-icons/react";

export default function Detalhe() {
    let { necessidade } = usePage().props;
    let { entidade } = usePage().props;
    let { local } = usePage().props;
    console.log(necessidade);
    console.log(entidade);
    console.log(local);

    const handleLinkClick = (event) => {
        window.open('https://www.google.com/maps/@'+local.latitude+","+local.longitude, '_blank');
    };
    return <Layout>
        <Head>
            <title>{necessidade.nome}</title>
        </Head>
        <div className="flex flex-col gap-2.5">
            <div className="flex flex-row items-center justify-between">
                <h1 className="font-bold text-x1">{necessidade.nome}</h1>
                <a href="/entidade-beneficente/cadastrar" className="underline text-[#06B6D4] w-100">
                    <p className="text-sm">voltar</p>
                </a>
            </div>
            <img src={necessidade.imagem == null ? "/storage/blank.svg" : necessidade.imagem} />
            <div className="flex flex-row gap-2.5">
                <Handshake size={32} />
                <h1 className="text-x1">{entidade.razao_social}</h1>
            </div>
            <div className="flex flex-row gap-2.5" onClick={handleLinkClick}>
                <MapPinArea size={32} className="text-[#06B6D4]"/>
                <h1 className="text-x1 underline text-[#06B6D4]">Localização</h1>
            </div>
            <ProgressBar qtd_necessaria={45} qtd_falta={30}/>
            <p>{necessidade.descricao}</p>
        </div>
            
    </Layout>
}