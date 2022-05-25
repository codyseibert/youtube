import React, { useState } from 'react';
import { useInjectRowsStream } from '../hooks/useInjectRowsStream';

let items = [];
for (let i = 0; i < 3000; i++) {
  items.push({
    id: i,
    name: 'bob',
    date: new Date(),
    age: 25,
    to: 'sally',
    from: 'rick',
    message: 'hello world, what is up',
    hobby: 'painting',
  });
}

function Home() {
  const [people, setPeople] = useState(items);

  const reverse = () => {
    setPeople([...people.reverse()]);
  };

  const ref = useInjectRowsStream(
    people,
    (row) => `
      <tr>
        <td>${row.id}</td>
        <td>${row.name}</td>
        <td>${row.age}</td>
        <td>${row.to}</td>
        <td>${row.from}</td>
        <td>${row.message}</td>
        <td>${row.hobby}</td>
      </tr>`
  );

  return (
    <div className="container">
      <div>total: {people.length}</div>
      <table className="table">
        <thead>
          <tr>
            <th>id</th>
            <th onClick={reverse}>Name</th>
            <th>Age</th>
            <th>To</th>
            <th>From</th>
            <th>Message</th>
            <th>Hobby</th>
          </tr>
        </thead>
        <tbody ref={ref}></tbody>
      </table>
    </div>
  );
}

export default Home;
