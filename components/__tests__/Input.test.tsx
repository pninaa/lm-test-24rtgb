// Instructions.test.tsx
import { render, screen } from '@testing-library/react';
import { Input } from '../Input';

describe('Input', () => {
  it('renders the input text component with some tests', () => {
    const {container} = render(<Input placeholder='TestPnina' />);
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
    expect(screen.queryByRole('textbox')).toBeInTheDocument();
    const searchByPlaceholder= screen.getByPlaceholderText("TestPnina");
    expect(searchByPlaceholder).toBeInTheDocument();
 });
});
