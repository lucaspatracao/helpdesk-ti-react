import { Table, Badge, Spinner, Alert } from 'react-bootstrap';

function ListaChamados({ chamados, loading, erro }) {
    const corPrioridade = (prioridade) => {
        switch (prioridade) {
            case 'Alta': return 'danger';
            case 'Média': return 'warning';
            case 'Baixa': return 'success';
            default: return 'secondary';
        }
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" role="status" />
                <p className="mt-2">Carregando chamados...</p>
            </div>
        );
    }

    if (erro) {
        return <Alert variant="danger">{erro}</Alert>;
    }

    if (chamados.length === 0) {
        return <Alert variant="info">Nenhum chamado aberto ainda.</Alert>;
    }

    return (
        <>
            <h2 className="mb-4">Chamados Abertos</h2>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Solicitante</th>
                        <th>Setor</th>
                        <th>Tipo</th>
                        <th>Descrição</th>
                        <th>Prioridade</th>
                    </tr>
                </thead>
                <tbody>
                    {chamados.map((chamado) => (
                        <tr key={chamado.id}>
                            <td>{chamado.id}</td>
                            <td>{chamado.solicitante}</td>
                            <td>{chamado.setor}</td>
                            <td>{chamado.tipo}</td>
                            <td>{chamado.descricao}</td>
                            <td>
                                <Badge bg={corPrioridade(chamado.prioridade)}>
                                    {chamado.prioridade}
                                </Badge>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default ListaChamados; 