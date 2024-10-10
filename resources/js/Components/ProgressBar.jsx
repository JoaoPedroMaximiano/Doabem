export default function ProgressBar({qtd_necessaria=0, qtd_falta=0}){
    let porcentagem = ((qtd_necessaria - qtd_falta) / qtd_necessaria) * 100;
    return (
        <div 
            className="progressBar grid justify-items-center items-center"
            style={{ background: `linear-gradient(to left, #e0e0e0 ${porcentagem}%, #06B6D4 ${porcentagem}%)` }} 
        >
            <h2 className="text-lg text-white">{qtd_falta + '/' + qtd_necessaria}</h2>
        </div>
    );
}
