import React, { useCallback, useEffect, useState } from 'react';
import type { Email } from '@email-admin/shared-types';

import styles from './index.module.css';

export function Index() {
  const [search, setSearch] = useState('');
  const [emails, setEmails] = useState<Email[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3333/search?q=${encodeURI(search)}`)
      .then((resp) => resp.json())
      .then((data) => setEmails(data));
  }, [search]);

  const onSetSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    []
  );

  return (
    <div className={styles.page}>
      <p>
        Search by Username:
        <input
          type="text"
          value={search}
          placeholder="Enter Username"
          onChange={onSetSearch}
          style={{ border: '2px solid red' }}
        />
      </p>
      <ul>
        {emails.map(({ id, username, quota }) => (
          <li key={id}>
            Username: {username} Quota: {quota}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Index;
