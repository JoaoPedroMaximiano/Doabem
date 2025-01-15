export default function ModalImagem({ dados }) {
    if (!dados || !dados.imagem) {
        return <p>Imagem não disponível.</p>;
    }

    return (
        <div className="modal-content text-center">
            <h2>Imagem da doação</h2>
            <img src={dados.imagem} alt="Imagem da doação indisponível" className="modal-image p-2" />
        </div>
    );
}
