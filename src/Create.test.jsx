import { fireEvent, render, screen, act } from '@testing-library/react';
import jest from '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Create from './Create';
import AppContext from './context.jsx';
import { BrowserRouter } from 'react-router-dom';

describe('Create', () => {
  it('should display title of modal', () => {
    render(
      <AppContext>
        <Create />
      </AppContext>
    );

    expect(screen.getByText('Create New Document')).toBeInTheDocument();
  });
  it('should display an input text box with "Document Title" as placeholder', () => {
    render(
      <AppContext>
        <Create />
      </AppContext>
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Document Title')).toBeInTheDocument();
  });

  it('should display two buttons on the screen', () => {
    render(
      <AppContext>
        <Create />
      </AppContext>
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(2);
    expect(buttons[0].classList.contains('close-button')).toBeTruthy;
    expect(buttons[1].classList.contains('create')).toBeTruthy;
  });

  // it.only('should not create a new document when text input is empty and user submits form', async () => {
  //   const setIsCreateOpen = vi.fn();
  //   const createNewDocument = vi.fn();
  //   const result = render(
  //     <AppContext>
  //       <Create />
  //     </AppContext>
  //   );
  //   const form = result.container.querySelector('form');

  //   fireEvent.submit(form);

  //   expect(setIsCreateOpen).not.toBeCalled();
  //   expect(createNewDocument).not.toBeCalled();
  // });

  // it('should create a new document when text input is not empty and user presses Enter key', async () => {
  //   const setIsCreateOpen = vi.fn();
  //   const createNewDocument = vi.fn();
  //   const createModal = render(
  //     <AppContext>
  //       <Create />
  //     </AppContext>
  //   );
  //   const textbox = screen.getByRole('textbox');
  //   const form = createModal.container.querySelector('form');
  //   await act(async () => {
  //     await userEvent.type(textbox, 'Test Title');
  //   });
  //   setTimeout(() => {
  //     fireEvent.submit(form);
  //   }, 2000);

  //   expect(createNewDocument).not.toHaveBeenCalledWith('Test Title');
  //   expect(setIsCreateOpen).toBeCalled();
  // });
});
