import { App as lpd } from '@capacitor/app';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import App from '../App';

const useBackButton = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleBackButton = () => {
      // Check if there's history to go back to
      if (window.history.length > 1) {
        navigate(-1); // Go back in history
        return { shouldUnsubscribe: false }; // Keep listening for back button
      } else {
        // If no history, show exit confirmation
        const shouldExit = window.confirm('Do you want to exit the app?');
        if (shouldExit) {
            lpd.exitApp();
        }
        return { shouldUnsubscribe: false }; // Keep listening for back button
      }
    };

    // Register back button handler
    lpd.addListener('backButton', handleBackButton);

    // Cleanup listener when component unmounts
    return () => {
        lpd.removeAllListeners();
    };
  }, [navigate]);
};

// Example usage in App.jsx or a layout component
const AppWrapper = () => {
  useBackButton(); // Initialize the back button handler

  return (
    <div>
      {/* Your app content */}
    
    </div>
  );
};

export default AppWrapper;