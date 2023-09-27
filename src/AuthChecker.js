import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase'; // Make sure the path is correct

const AuthChecker = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return null;
};

export default AuthChecker;
