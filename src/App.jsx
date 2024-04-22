import { Provider } from 'react-redux';

import { AppRouter } from './router';
import { store } from './store';
import { ContextProvider } from './contexts/ContextProvider';
import { MapProvider, PlacesProvider } from './contexts';

export const App = () => {
  return (
    <Provider store={store}>
      <ContextProvider>
        <PlacesProvider>
          <MapProvider>
            < AppRouter />
          </MapProvider>
        </PlacesProvider>
      </ContextProvider>
    </Provider>

  )
}
