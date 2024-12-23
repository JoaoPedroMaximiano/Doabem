import Button from "@/Components/Button";
import { Link } from "@inertiajs/react";

export default function Card({card, tipo}) {
    return <Link className={"flex flex-col sm:flex-row gap-2 sm:gap-1.5 min-h-[200px] sm:h-[220px] w-full border border-gray-400 " +(card.status === "ativo" ? "bg-white" : "bg-gray-200")} href={`/${tipo}/${card.id}`}>
        <img src={card.imagem == null ? "/storage/blank.svg" : card.imagem} alt={"Imagem de " + card.nome} className={ "w-full sm:w-[200px] min-h-[200px] object-cover " + (card.status === "ativo" ? "opacity-100" : "opacity-80")} />
        <div className="flex flex-col p-3 gap-2 flex-1">
            <div className="gap-2 flex flex-col h-full">
                <div className="flex justify-between gap-5">
                    <h3 className="line-clamp-1 w-full break-words font-bold text-base sm:text-xl" title={card.nome}>{card.nome}</h3>
                    <h3 className="whitespace-nowrap text-sm sm:text-base">
                    {card?.distancia ? card.distancia + " km" : ""}
                    </h3>
                </div>
                <div>
                    <p className="text-xs font-semibold text-justify"> {new Date(card.data_cadastro).toLocaleDateString("pt-BR", { day: "numeric", month: "short", year: "numeric",})}</p>
                </div>
                <div className="flex-1 overflow-hidden">
                    <div className="text-xs text-justify line-clamp-5 sm:line-clamp-7" dangerouslySetInnerHTML={{ __html: card.descricao.replace(/\n/g, "<br>") }}/>
                </div>
            </div>
            <div className="flex justify-end">
                <Button btnType={"cardList"} texto={"Ver mais"} moreClass={"text-xs w-full sm:w-20"}/>
            </div>
        </div>
    </Link>
}
