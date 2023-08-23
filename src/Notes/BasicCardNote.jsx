import { ArrowBack, ArrowForward } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../context';
import Note from './Note';

const BasicCardNote = ({ id, type, content, index, practice }) => {
  const [frontContent, setFrontContent] = useState(content?.front || '');
  const [backContent, setBackContent] = useState(content?.back || '');
  const [showSelectionBar, setShowSelectionBar] = useState(false);

  const {
    selectedDoc,
    moveNoteDown,
    moveNoteUp,
    updateDocument,
    focusOnPreviousNote,
    focusOnNextNote,
    handleArrowDown,
    handleArrowUp,
    isCaretAtEnd,
    isCaretAtBeginning,
    removeNote,
    duplicateNote,
    insertEmptyNoteOfType,
    isPracticeOpen,
  } = useGlobalContext();
  useEffect(() => {
    const frontInput = document.getElementById('front' + id);

    frontInput.innerText = frontContent;
    const backInput = document.getElementById('back' + id);

    backInput.innerText = backContent;
    if (!practice) {
      updateDocument(selectedDoc.id, id, {
        id: id,
        type: type,
        content: {
          front: frontContent,
          back: backContent,
        },
      });
    }
  }, [frontContent, backContent]);
  return (
    <>
      <div className="basic-note" id="id">
        <div
          id={'front' + id}
          className={
            frontContent ? 'front-of-card' : 'front-of-card empty-front'
          }
          // ref={frontInput}
          contentEditable={!(selectedDoc.finished || isPracticeOpen)}
          onKeyDown={(e) => {
            if (e.key === 'Backspace') {
              if (!e.target.innerText && !backContent) {
                removeNote(selectedDoc.id, id);
                focusOnPreviousNote(id);
              }
            }

            if (
              e.key === 'Enter' ||
              (isCaretAtEnd() && e.key === 'ArrowDown') ||
              (isCaretAtEnd() && e.key === 'ArrowRight')
            ) {
              e.preventDefault();
              setFrontContent(e.target.innerText);

              e.target.nextElementSibling.nextElementSibling.focus();
              return;
            }
            if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
              if (e.altKey) {
                moveNoteUp(selectedDoc.id, id);
              } else if (!e.altKey && !e.shiftKey) {
                handleArrowUp(id);
              }
              return;
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
              <ArrowForward
                className="arrow"
                style={{ marginLeft: '-0.7rem' }}
              />
            </>
          )}
        </div>
        <div
          id={'back' + id}
          className={backContent ? 'back-of-card' : 'back-of-card empty-back'}
          // ref={backInput}
          contentEditable={!(selectedDoc.finished || isPracticeOpen)}
          onKeyDown={(e) => {
            if (e.key === 'Backspace') {
              if (!e.target.innerText && !frontContent) {
                removeNote(selectedDoc.id, id);
                focusOnPreviousNote(id);
              } else if (!e.target.innerText && frontContent) {
                e.target.previousElementSibling.previousElementSibling.focus();
                window
                  .getSelection()
                  .modify('move', 'forward', 'paragraphboundary');
              }
              return;
            }

            if (e.key === 'Enter') {
              e.preventDefault();
              setBackContent(e.target.innerText);
              if (!e.altKey) {
                setShowSelectionBar(true);
              } else if (e.altKey && !e.shiftKey) {
                insertEmptyNoteOfType(selectedDoc.id, index + 1, type);
              } else if (e.altKey && e.shiftKey) {
                duplicateNote(selectedDoc.id, index + 1, id);
              }

              return;
            }
            if (
              isCaretAtBeginning() &&
              (e.key === 'ArrowUp' || e.key === 'ArrowLeft')
            ) {
              e.target.previousElementSibling.previousElementSibling.focus();
              window
                .getSelection()
                .modify('move', 'forward', 'paragraphboundary');
              return;
            }
            if (e.key === 'ArrowUp') {
              if (e.altKey) {
                moveNoteUp(selectedDoc.id, id);
              }

              return;
            }

            if (
              e.key === 'ArrowDown' ||
              (isCaretAtEnd() && e.key === 'ArrowRight')
            ) {
              if (e.altKey) {
                moveNoteDown(selectedDoc.id, id);
              } else if (!e.altKey && !e.shiftKey) handleArrowDown(id);
              return;
            }
            e.target.classList.remove('empty-back');
          }}
          onBlur={(e) => {
            setBackContent(e.target.innerText);
            if (!backContent) {
              e.target.classList.add('empty-back');
            }
            setTimeout(() => {
              setShowSelectionBar(false);
            }, 100);
          }}
          onPaste={(e) => {
            if (e.clipboardData.items[0].type !== 'text/plain') {
              e.preventDefault();
            }
            setBackContent(`${e.target.innerText}`);
          }}
        ></div>
      </div>
      {showSelectionBar && <Note type={'selection-bar'} index={index + 1} />}
    </>
  );
};

export default React.memo(BasicCardNote);
