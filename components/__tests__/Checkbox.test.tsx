// Instructions.test.tsx
import { render, screen } from '@testing-library/react';
import { Checkbox } from '../Checkbox';

describe('InstructiCheckboxons', () => {
  it('renders the Instructions component with all categories and general instructions', () => {
    const {container} = render(<Checkbox />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).not.toBeInTheDocument();
 });
});
