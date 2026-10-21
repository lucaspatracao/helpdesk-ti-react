import { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import FormChamado from './components/FormChamado';
import ListaChamados from './components/ListaChamados';

function App() {
  const [paginaAtiva, setPaginaAtiva] = useState('form');
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const buscarChamados = async () => {
      try {
        const response = await fetch('http://localhost:3000/chamados');
        if (!response.ok) throw new Error('Erro na requisição');
        const data = await response.json();
        setChamados(data);
      } catch (error) {
        setErro('Não foi possível carregar os chamados.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    buscarChamados();
  }, []);

  const handleChamadoCadastrado = (novoChamado) => {
    setChamados((prev) => [...prev, novoChamado]);
  };

  return (
    <>
      <NavBar paginaAtiva={paginaAtiva} onMudarPagina={setPaginaAtiva} />
      <div className="container mt-4">
        {paginaAtiva === 'form' && (
          <FormChamado
            onChamadoCadastrado={handleChamadoCadastrado}
            onMudarPagina={setPaginaAtiva}
          />
        )}
        {paginaAtiva === 'lista' && (
          <ListaChamados
            chamados={chamados}
            loading={loading}
            erro={erro}
          />
        )}
      </div>
    </>
  );
}

export default App;