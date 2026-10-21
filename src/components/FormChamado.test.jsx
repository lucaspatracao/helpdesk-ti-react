import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import FormChamado from './FormChamado';

describe('FormChamado', () => {
    it('deve renderizar todos os campos', () => {
        render(<FormChamado onChamadoCadastrado={vi.fn()} onMudarPagina={vi.fn()} />);
        expect(screen.getByLabelText(/nome do solicitante/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/setor/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/tipo de problema/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/descrição do problema/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/prioridade/i)).toBeInTheDocument();
    });

    it('deve exibir erro se o nome tiver menos de 3 caracteres', async () => {
        render(<FormChamado onChamadoCadastrado={vi.fn()} onMudarPagina={vi.fn()} />);
        fireEvent.change(screen.getByLabelText(/nome do solicitante/i), {
            target: { value: 'Jo' },
        });
        fireEvent.click(screen.getByRole('button', { name: /abrir chamado/i }));
        await waitFor(() => {
            expect(screen.getByText(/mínimo 3 caracteres/i)).toBeInTheDocument();
        });
    });

    it('deve chamar onChamadoCadastrado após envio bem-sucedido', async () => {
        const mockOnChamadoCadastrado = vi.fn();
        const mockOnMudarPagina = vi.fn();
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ id: 2, ...dadosValidos }),
            })
        );

        render(
            <FormChamado
                onChamadoCadastrado={mockOnChamadoCadastrado}
                onMudarPagina={mockOnMudarPagina}
            />
        );

        // Preencher todos os campos...
        // Clicar em enviar...
        // Verificar se as funções foram chamadas
    });
});