// Instructions.test.tsx
import { render, screen } from '@testing-library/react';
import { Checkbox } from '../Checkbox';

describe('Checkbox', () => {
  it('renders the checkbox component with some tests', () => {
    const {container} = render(<Checkbox />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
 });
});
