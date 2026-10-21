import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const ESTADO_INICIAL = {
    solicitante: '',
    setor: '',
    tipo: '',
    descricao: '',
    prioridade: '',
};

function FormChamado({ onChamadoCadastrado, onMudarPagina }) {
    const [chamado, setChamado] = useState(ESTADO_INICIAL);
    const [enviando, setEnviando] = useState(false);
    const [erro, setErro] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setChamado((prev) => ({ ...prev, [name]: value }));
    };

    const validar = () => {
        if (chamado.solicitante.trim().length < 3) {
            setErro('O nome do solicitante deve ter no mínimo 3 caracteres.');
            return false;
        }
        if (!chamado.setor) {
            setErro('Selecione um setor.');
            return false;
        }
        if (!chamado.tipo) {
            setErro('Selecione o tipo de problema.');
            return false;
        }
        if (chamado.descricao.trim().length < 10) {
            setErro('A descrição deve ter no mínimo 10 caracteres.');
            return false;
        }
        if (!chamado.prioridade) {
            setErro('Selecione a prioridade.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro('');

        if (!validar()) return;

        setEnviando(true);
        try {
            const response = await fetch('http://localhost:3000/chamados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(chamado),
            });

            if (!response.ok) throw new Error('Erro ao cadastrar chamado');

            const novoChamado = await response.json();
            onChamadoCadastrado(novoChamado);
            setChamado(ESTADO_INICIAL);
            onMudarPagina('lista');
        } catch (error) {
            setErro('Falha ao enviar o chamado. Tente novamente.');
            console.error(error);
        } finally {
            setEnviando(false);
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
                <h2 className="mb-4">Abrir Chamado</h2>
                {erro && <Alert variant="danger">{erro}</Alert>}
                <Form onSubmit={handleSubmit} noValidate>
                    <Form.Group className="mb-3" controlId="solicitante">
                        <Form.Label>Nome do Solicitante</Form.Label>
                        <Form.Control
                            type="text"
                            name="solicitante"
                            value={chamado.solicitante}
                            onChange={handleChange}
                            placeholder="Digite seu nome completo"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="setor">
                        <Form.Label>Setor</Form.Label>
                        <Form.Select
                            name="setor"
                            value={chamado.setor}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecione o setor</option>
                            <option value="TI">TI</option>
                            <option value="RH">RH</option>
                            <option value="Financeiro">Financeiro</option>
                            <option value="Operações">Operações</option>
                            <option value="Comercial">Comercial</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="tipo">
                        <Form.Label>Tipo de Problema</Form.Label>
                        <Form.Select
                            name="tipo"
                            value={chamado.tipo}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecione o tipo</option>
                            <option value="Hardware">Hardware</option>
                            <option value="Software">Software</option>
                            <option value="Rede">Rede</option>
                            <option value="Acesso">Acesso</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="descricao">
                        <Form.Label>Descrição do Problema</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="descricao"
                            value={chamado.descricao}
                            onChange={handleChange}
                            placeholder="Descreva detalhadamente o problema (mínimo 10 caracteres)"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="prioridade">
                        <Form.Label>Prioridade</Form.Label>
                        <Form.Select
                            name="prioridade"
                            value={chamado.prioridade}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecione a prioridade</option>
                            <option value="Baixa">Baixa</option>
                            <option value="Média">Média</option>
                            <option value="Alta">Alta</option>
                        </Form.Select>
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        disabled={enviando}
                        className="w-100"
                    >
                        {enviando ? 'Enviando...' : 'Abrir Chamado'}
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default FormChamado;