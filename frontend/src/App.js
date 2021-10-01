import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@material-ui/core/styles';
import Theme from './Theme';
import Router from './Router/Router';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={Theme}>
        <Router />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
