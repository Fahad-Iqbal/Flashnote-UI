import { fireEvent, render, screen, act } from '@testing-library/react';
import jest from '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Create from './Create';
import AppContext, { useGlobalContext } from './context.jsx';
import { vi } from 'vitest';

describe('Create', () => {
  // mocking the useGlobalContext hook and the two functions it returns in the Create.jsx component
  vi.mock('./context.jsx');
  const setIsCreateOpen = vi.fn();
  const createNewDocument = vi.fn();
  useGlobalContext.mockReturnValue({ setIsCreateOpen, createNewDocument });

  it('should display title of modal', () => {
    render(<Create />);

    expect(screen.getByText('Create New Document')).toBeInTheDocument();
  });
  it('should display an input text box with "Document Title" as placeholder', () => {
    render(<Create />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Document Title')).toBeInTheDocument();
  });

  it('should display two buttons on the screen', () => {
    render(<Create />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(2);
    expect(buttons[0].classList.contains('close-button')).toBeTruthy;
    expect(buttons[1].classList.contains('create')).toBeTruthy;
  });

  it('should not create a new document when text input is empty and user submits form', async () => {
    const result = render(<Create />);
    const form = result.container.querySelector('form');
    await act(async () => {
      fireEvent.submit(form);
    });

    expect(setIsCreateOpen).not.toBeCalled();
    expect(createNewDocument).not.toBeCalled();
  });

  it('should create a new document when text input is not empty and user submits the form', async () => {
    const setIsCreateOpen = vi.fn();
    const createNewDocument = vi.fn();
    useGlobalContext.mockReturnValue({ setIsCreateOpen, createNewDocument });

    const createModal = render(<Create />);
    const textbox = screen.getByRole('textbox');
    const form = createModal.container.querySelector('form');
    await act(async () => {
      await userEvent.type(textbox, 'Test Title');
    });

    fireEvent.submit(form);

    expect(createNewDocument).toHaveBeenCalledWith('Test Title');
    expect(setIsCreateOpen).toHaveBeenCalledWith(false);
  });
});
