import Head from "next/head";
import Link from "next/link";
import Footer from "@/components/footer";
import { useState } from "react";
import {addCampanha, getLastCampaignId} from "../services/Web3Service";

export default function Create(){

    const[campanha, setCampanha] = useState({});
    const[message, setMessage] = useState("");

    function onInputChange(evt){
        setCampanha(prevState => ({...prevState, [evt.target.id]: evt.target.value}));
    }

    function btnSaveClick(){
        setMessage("Salvando, aguarde...");
        addCampanha(campanha)
            .then(tx => getLastCampaignId())
            .then(id => setMessage(`Campanha salva com ID ${id}. Avise seus amigos e passe a eles esse número.`))
            .catch(err => {
                console.error(err);
                setMessage(err.message);
            })
    }

    return (
        <>
            <Head>
                <title>Doe Crypto | Criar Campanha</title>
                <meta charSet= 'utf-8'/>
                <meta name="description" content="Doe fundos para um jovem negro" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className="container">
                <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Doe Crypto</h1>
                <p>Preencha os campos para incluir a sua campanha na plataforma.</p>
                <hr className="mb-4"/>
                <div className="col-6">
                    <div className="form-floating mb-3">
                        <input type="text" id="titulo" className="form-control" value={campanha.titulo} onChange={onInputChange}/>
                        <label for="titulo">Título</label>
                    </div>
                    <div className="form-floating mb-3">
                        <textarea id="descricao" className="form-control" value={campanha.descricao} onChange={onInputChange}/>
                        <label for="descricao">Descrição</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="url" id="videoUrl" className="form-control" value={campanha.videoUrl} onChange={onInputChange}/>
                        <label for="videoUrl">URL do Vídeo</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="url" id="imageUrl" className="form-control" value={campanha.imageUrl} onChange={onInputChange}/>
                        <label for="imageUrl">URL da Imagem</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="number" id="meta" className="form-control" value={campanha.meta} onChange={onInputChange}/>
                        <span className="input-group-text">BNB</span>
                        <label for="meta">Meta da Campanha</label>
                    </div>
                    <div className="col-6 mb-3">
                        <input type="button" className="btn btn-primary col-12 p-3" value="Salvar Campanha" onClick={btnSaveClick} />
                    </div>
                    <div className="col-6 mb-3">
                        <Link href="/" className="btn btn-secundary col-12 p-3">Voltar</Link>
                    </div>
                </div>
                {
                    message
                    ? <div className="alert alert-success p-3 col 6" role="alert">{message}</div>
                    : <></>
                }
                <Footer />
            </div>
        </>
        
    )
}