import Layout from "@/Components/Layout";
import { Link } from "@inertiajs/react";

export default function LandingPage() {
    return <Layout titulo={'Início'}>
        <div className="flex flex-col mb-5 divide-y-2 gap-5">
            <Card side={'left'} title={'Transforme vidas com sua doação'} desc={"Descubra como sua doação faz a diferença! Contribua para melhorar a qualidade de vida de famílias carentes, moradores de rua e instituições que acolhem pessoas em situação de vulnerabilidade. Cada peça doada significa mais conforto, esperança e dignidade para quem mais precisa."} image={'/storage/humanitarian-help-amico.svg'} />
            <Card side={'right'} title={'Doar nunca foi tão fácil'} desc={"Nosso sistema conecta você diretamente a causas que precisam de sua ajuda. Escolha o tipo de item a doar, veja os locais ou eventos disponíveis e entregue sua contribuição com simplicidade. Garantimos que tudo será distribuído com transparência e segurança para quem realmente necessita."} image={'/storage/charity-pana.svg'} />
            <Card side={'left'} title={'Transparência e impacto garantidos'} desc={"Acreditamos na confiança como base da solidariedade. Por isso, disponibilizamos relatórios de impacto e atualizações para que você acompanhe o destino de suas doações. Junte-se a nós e faça parte de um movimento que transforma vidas, com responsabilidade e ética."} image={'/storage/charity-amico.svg'} link={'/doador/cadastrar'} />
        </div>

        <a href="https://storyset.com/people">Ilustrações por Storyset</a>
    </Layout>
}

export function Card({side, title, desc, image, link}) {
    return <div className={`flex justify-center items-center gap-5 flex-col ${side == 'left' ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
        <img className="w-full md:w-1/2" src={image} alt={`Imagem de ${title}`} />
        <div className={`w-full md:w-1/3 flex flex-col gap-4 ${side == 'left' ? 'md:text-left' : 'md:text-right'}`}>
            <h2 className="text-2xl md:text-5xl">{title}</h2>
            <p className="indent-8 text-lg md:text-xl">{desc}</p>

            {link && <Link href={link} className="bg-[#06B6D4] text-white text-xl px-5 py-2 rounded-md w-fit">Ser doador</Link>}
        </div>
    </div>
}
