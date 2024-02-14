import { Provider } from 'react-redux';

import { AppRouter } from './router';
import { store } from './store';
import { ContextProvider } from './contexts/ContextProvider';

export const App = () => {
  return (
    <Provider store={store}>
      <ContextProvider>
        < AppRouter />
      </ContextProvider>
    </Provider>

  )
}
