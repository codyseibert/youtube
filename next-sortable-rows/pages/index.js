import React, { useState } from 'react';

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
        <tbody>
          {people.map((person) => (
            <tr key={person.id}>
              <td>{person.id}</td>
              <td>{person.name}</td>
              <td>{person.age}</td>
              <td>{person.to}</td>
              <td>{person.from}</td>
              <td>{person.message}</td>
              <td>{person.hobby}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
