import React, { useState } from 'react';

import Dropzone from './Component/Dropzone';
import api from './services/api';
import './styles/App.css';

interface InputOutput {
  input: string[],
  output: string[]
}
function App() {

  const [file, setFile] = useState<File>();
  const [input, setInput] = useState<string[]>([]);
  const [output, setOutput] = useState<string[]>([]);

  async function postFileToApi() {
    if(input.length === 0 && output.length === 0 && file){
      const data = new FormData();
      data.append('file', file);

      try {

        const response = await api.post('execute', data);

        if(response.status === 200) {
          alert("Upload do arquivo concluído, clique em 'Converter'");
        }

      } catch {

        alert('Arquivo inválido, apenas arquivos .txt são aceitos')

      }
    }
  }
  function convertFile() {
    if(input.length === 0 && output.length === 0 && file) {
      api.get('execute').then(response=>{
        const data: InputOutput = response.data;
        setInput(data.input);
        setOutput(data.output);
      });
    }
  }
  function reloadPage() {
    window.location.reload();
  }
  return (
    <div className="App">
      <div className="container">
        <header>
          <div className="left-block">
            <h1>Conversor de notas escolares</h1>
            <br/>
            <p>1- Clique ou arraste o arquivo na dropzone.</p>
            <p>2- Clique em Upload para fazer o upload do arquivo.</p>
            <p>3- Clique em Converter para realizar a conversão do arquivo.</p>
            <p>4- Clique em Atualizar para adicionar outro arquivo.</p>
          </div>
          <div className="right-block">
            <Dropzone onFileUploaded={setFile}/>
            <div className="form-field">
                <button onClick={postFileToApi}>Upload</button>
                <button id="converter" onClick={convertFile}>Converter</button>
                <button onClick={reloadPage}>Atualizar</button>
            </div>
          </div>
        </header>
        <main>
          <div className="input">
            <h2>Entrada</h2>
            <div className="text-box">
              {input.map((line: string)=>(
                  <p key={input.indexOf(line)}>{line}</p>
                ))
              }
            </div>
          </div>
          <div className="output">
            <h2>Saída</h2>
            <div className="text-box">
              {output.map((line: string)=>(
                <p key={output.indexOf(line)}>{line}</p>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
export default App;
