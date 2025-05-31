
import { useState } from 'react'
import './App.css'
import './global.css'

import axios from "axios"

export function App() {

  const [prompt, setPrompt] = useState('');
  const [resposta, setResposta] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (hS) =>{
    hS.preventDefault();
    setCarregando(true);
    setResposta('');

    try {
      const res = await axios.post('http://localhost:4000/gerar-texto', {prompt});
      setResposta(res.data.resposta);
    } catch (error) {
      setResposta('Deu ruim, erro ao obter resposta da OpenAI')
      console.error(error)
    }
    setCarregando(false);
  }

  return (
    <div className='container'>
      <h1 className='title' >Gerador de texto - Jarbas</h1>

      <form className='form-content' onSubmit={handleSubmit}>
        <textarea 
          className='textResposta'
          placeholder="Como posso ajudar?" 
          value={prompt} 
          onChange={(hS) => setPrompt(hS.target.value)}
         />

         <button 
         className='btn'
          type='submit' 
          disabled={carregando}>
            {carregando ? 'Gerando...' : 'Enviar'}</button>
      </form>
      {resposta && (
        <div className='resposta'>
          <h2>Resposta</h2>
          <p>{resposta}</p>
        </div>
      )}
    </div>
  )
}

