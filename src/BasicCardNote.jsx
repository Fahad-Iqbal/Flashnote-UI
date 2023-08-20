import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useGlobalContext } from './context';

const BasicCardNote = ({ id, type, content }) => {
  const [frontContent, setFrontContent] = useState(content?.front || '');
  const [backContent, setBackContent] = useState(content?.back || '');
  const { selectedDoc, moveNoteDown, moveNoteUp, updateDocument } =
    useGlobalContext();
  useEffect(() => {
    const frontInput = document.getElementById('front' + id);

    frontInput.innerText = frontContent;
    const backInput = document.getElementById('back' + id);

    backInput.innerText = backContent;

    updateDocument(selectedDoc.id, id, {
      id: id,
      type: type,
      content: {
        front: frontContent,
        back: backContent,
      },
    });
  }, [frontContent, backContent]);
  return (
    <div className="basic-note">
      <div
        id={'front' + id}
        className={frontContent ? 'front-of-card' : 'front-of-card empty-front'}
        // ref={frontInput}
        contentEditable={!selectedDoc.finished}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            setFrontContent(e.target.innerText);

            e.target.nextElementSibling.nextElementSibling.focus();
            return;
          }
          if (e.key === 'ArrowUp') {
            if (e.altKey) {
              moveNoteUp(selectedDoc.id, id);
            }
          }
          if (e.key === 'ArrowDown') {
            if (e.altKey) moveNoteDown(selectedDoc.id, id);
          }
          e.target.classList.remove('empty-front');
        }}
        onBlur={(e) => {
          setFrontContent(e.target.innerText);
          if (!frontContent) {
            e.target.classList.add('empty-front');
          }
        }}
        onPaste={(e) => {
          if (e.clipboardData.items[0].type !== 'text/plain') {
            e.preventDefault();
          }
          setFrontContent(`${e.target.innerText}`);
        }}
      ></div>
      <div className="icon">
        {type === 'basic' ? (
          <ArrowForward className="arrow" />
        ) : (
          <>
            <ArrowBack className="arrow" style={{ marginRight: '-0.7rem' }} />
            <ArrowForward className="arrow" style={{ marginLeft: '-0.7rem' }} />
          </>
        )}
      </div>
      <div
        id={'back' + id}
        className={backContent ? 'back-of-card' : 'back-of-card empty-back'}
        // ref={backInput}
        contentEditable={!selectedDoc.finished}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            setBackContent(e.target.innerText);
            return;
          }
          if (e.key === 'ArrowUp') {
            if (e.altKey) {
              moveNoteUp(selectedDoc.id, id);
            }
          }
          if (e.key === 'ArrowDown') {
            if (e.altKey) moveNoteDown(selectedDoc.id, id);
          }
          e.target.classList.remove('empty-back');
        }}
        onBlurCapture={(e) => {
          setBackContent(e.target.innerText);
        }}
        onBlur={(e) => {
          setBackContent(e.target.innerText);
          if (!backContent) {
            e.target.classList.add('empty-back');
          }
        }}
        onPaste={(e) => {
          if (e.clipboardData.items[0].type !== 'text/plain') {
            e.preventDefault();
          }
          setBackContent(`${e.target.innerText}`);
        }}
      ></div>
    </div>
  );
};

export default BasicCardNote;
