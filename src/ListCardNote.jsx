import { ArrowBack, ArrowDownward, ArrowForward } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import PlainNote from './PlainNote';
import { useGlobalContext } from './context';

const ListCardNote = ({ id, type, content }) => {
  const [frontContent, setFrontContent] = useState(content?.front || '');
  const [backContent, setBackContent] = useState(content?.back || []);
  const { selectedDoc } = useGlobalContext();
  useEffect(() => {
    const frontInput = document.getElementById('front' + id);
    frontInput.innerText = frontContent;
    // const backInput = document.getElementById('back' + id);
    // backInput.innerText = backContent;
  }, [frontContent, backContent]);
  return (
    <div className="list-note">
      <div className="list-front-container basic-note">
        <div
          id={'front' + id}
          className={
            frontContent ? 'front-of-card' : 'front-of-card empty-front'
          }
          // ref={frontInput}

          contentEditable={!selectedDoc.finished}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              setFrontContent(e.target.innerText);
              document.getElementById('list-item-0')?.focus();
              return;
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
          <ArrowDownward className="arrow" />
        </div>
      </div>
      <div id={'back' + id} style={{ marginTop: '0.5rem' }}>
        <ul>
          {!content?.back?.length ? (
            <li>
              <PlainNote id={0} type={'list-item'} content="asdf" />
            </li>
          ) : (
            content?.back?.map((item, index) => {
              return (
                <li key={index}>
                  <PlainNote id={index} type={'list-item'} content={item} />
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
