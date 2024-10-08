export default function ProgressBar(qtd_necessaria = 0, qtd_falta = 0){
    return  <div className="border-test grid justify-items-center items-center ">
                <h2 className="text-lg text-white">{qtd_falta +'/'+ qtd_necessaria}</h2>
            </div>
}