import { render, screen } from '@testing-library/react';
import EmptyState from './EmptyState';

test('affiche le titre et le message fournis', () => {
    render(<EmptyState title="Liste vide" message="Ajoutez des produits" />);

    expect(screen.getByRole('heading', { name: 'Liste vide' })).toBeInTheDocument();
    expect(screen.getByText('Ajoutez des produits')).toBeInTheDocument();
});

test('rend l\'icône quand elle est passée en prop', () => {
    render(<EmptyState icon={<span data-testid="icone" />} message="x" />);

    expect(screen.getByTestId('icone')).toBeInTheDocument();
});

test('n\'affiche pas de titre quand aucun n\'est fourni', () => {
    render(<EmptyState message="x" />);

    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
});
