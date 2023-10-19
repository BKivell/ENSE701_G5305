// components/navbar.test.tsx
import { render } from '@testing-library/react';
import Navbar from '../components/navbar';


describe('Navbar', () => {
    it('should render successfully', () => {
        render(<Navbar />);

        const { baseElement } = render(<Navbar />);
        expect(baseElement).toBeInTheDocument();
    });
  });