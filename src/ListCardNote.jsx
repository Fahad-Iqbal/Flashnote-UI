import { ArrowBack, ArrowDownward, ArrowForward } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import PlainNote from './PlainNote';
import { useGlobalContext } from './context';

const ListCardNote = ({ id, type, content }) => {
  const [frontContent, setFrontContent] = useState(content?.front || '');
  const [backContent, setBackContent] = useState(content?.back || []);
  const { selectedDoc, moveNoteUp, moveNoteDown } = useGlobalContext();
  useEffect(() => {
    const frontInput = document.getElementById(id);
    frontInput.innerText = frontContent;
    console.log(backContent);
  }, [frontContent, backContent]);

  const handleMoveUp = (index) => {
    if (index > 0) {
      const current = backContent[index];
      const previous = backContent[index - 1];
      const newList = [...backContent];
      newList[index] = previous;
      newList[index - 1] = current;
      setBackContent(newList);
    }
  };
  const handleMoveDown = (index) => {
    if (index < backContent.length - 1) {
      const current = backContent[index];
      const next = backContent[index + 1];
      const newList = [...backContent];
      newList[index] = next;
      newList[index + 1] = current;
      setBackContent(newList);
    }
  };
  return (
    <div className="list-note">
      <div className="list-front-container basic-note">
        <div
          id={id}
          className={
            frontContent ? 'front-of-card' : 'front-of-card empty-front'
          }
          // ref={frontInput}

          contentEditable={!selectedDoc.finished}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              setFrontContent(e.target.innerText);
              document.getElementById(`${id}0`)?.focus();
              return;
            }
            e.target.classList.remove('empty-front');
            if (e.key === 'ArrowUp') {
              if (e.altKey) {
                moveNoteUp(selectedDoc.id, id);
              }
            }
            if (e.key === 'ArrowDown') {
              if (e.altKey) moveNoteDown(selectedDoc.id, id);
            }
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
          <ArrowDownward className="arrow" />
        </div>
      </div>
      <div id={'back' + id} style={{ marginTop: '0.5rem' }}>
        <ul>
          {!backContent.length ? (
            <li>
              <PlainNote
                id={`${id}0`}
                index={0}
                type={'list-item'}
                content=""
              />
            </li>
          ) : (
            backContent.map((item, index) => {
              return (
                <li key={index}>
                  <PlainNote
                    id={`${id}${index}`}
                    index={index}
                    type={'list-item'}
                    content={item}
                    handleMoveUp={handleMoveUp}
                    handleMoveDown={handleMoveDown}
                  />
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
};

export default ListCardNote;
