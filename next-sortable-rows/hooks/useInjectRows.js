import { useRef, useEffect } from 'react';

export const useInjectRows = (rows, getHtml) => {
  const ref = useRef();

  useEffect(() => {
    ref.current.innerHTML = '';
    let html = '';
    console.time('loop');
    for (let row of rows) {
      html += getHtml(row);
    }
    ref.current.innerHTML = html;
    console.timeEnd('loop');
  }, [rows, getHtml]);

  return ref;
};
