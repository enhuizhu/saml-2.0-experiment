import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [ loading, setLoading ] = useState(true);
  const [ email, setEmail ] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/whoami', {
      withCredentials: true,
    })
      .then(response => response.data)
      .then(response => {
        if (response.user) {
          setEmail(response.user.nameID);
          setLoading(false);
        } else {
          redirectLogin();
        }
      }).catch(() => {
        redirectLogin();
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ ]);

  const redirectLogin = () => {
    // console.log('redirect');
    window.location.href='http://localhost:3001/login';
  };

  if (loading) {
    return <div>loading ....</div>
  }

  return (
    <div className="App">
      <div>hello the world, I am {email}</div>
    </div>
  );
}

export default App;
