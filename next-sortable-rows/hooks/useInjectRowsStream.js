import { useRef, useEffect } from 'react';
import { chunk } from 'lodash';

const TIMEOUT_TIME = 200;
const BATCH_SIZE = 200;

export const useInjectRowsStream = (rows, getHtml) => {
  const ref = useRef();

  useEffect(() => {
    ref.current.innerHTML = '';
    let forceStop = false;
    let appendChain = Promise.resolve();

    const [firstChunk, ...chunks] = chunk(rows, BATCH_SIZE);

    const appendChunk = (chnk) => {
      if (forceStop) return;
      let html = '';
      for (let row of chnk) {
        html += getHtml(row);
      }
      ref.current.innerHTML += html;
    };

    appendChunk(firstChunk);

    for (let chnk of chunks) {
      appendChain = appendChain.then(() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            appendChunk(chnk);
            resolve();
          }, TIMEOUT_TIME);
        });
      });
    }

    return () => {
      forceStop = true;
    };
  }, [rows, getHtml]);

  return ref;
};
