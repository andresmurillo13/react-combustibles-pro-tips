
import { Suspense, useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { useAuthStore } from "../hooks"
import { Loader } from "./components/Loader"
import { routesPrev, routesNext } from "./routes"
import { BrowserRouter } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { useStateContext } from '../contexts/ContextProvider';
import { Sidebar, Navbar, ThemeSettings } from '../components';
import '../App.css';

export const AppRouter = () => {

  const { status, checkAuthToken } = useAuthStore();
  const { currentColor, setThemeSettings, activeMenu, themeSettings, currentMode } = useStateContext();

  useEffect(() => {
    checkAuthToken();
  }, [])


  if (status === 'checking') {
    return (
      <Loader />
    )
  }

  return (
    <>
      <div className={currentMode === 'Dark' ? 'dark' : ''}>
        <Suspense fallback={<Loader />}>

          <BrowserRouter>
            <div className="flex relative dark:bg-main-dark-bg">
              <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
               
                  <button
                    type="button"
                    onClick={() => setThemeSettings(true)}
                    style={{ background: currentColor, borderRadius: '50%' }}
                    className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                  >
                    <FiSettings />
                  </button>

               
              </div>
              {activeMenu && status === 'authenticated' ?  (
                <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                  <Sidebar />
                </div>
              ) : (
                <div className="w-0 dark:bg-secondary-dark-bg">
                  <Sidebar />
                </div>
              )}
              <div
                className={
                  activeMenu
                    ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                    : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
                }
              >
                {
                  status === 'authenticated' ? (
                    <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                      <Navbar />
                    </div>
                  ) : (
                    <div></div>
                  )
                }

                <div>
                  {themeSettings && (<ThemeSettings />)}
                  <Routes>
                    {
                      (status === 'not-authenticated')
                        ? (
                          <>
                            {
                              routesPrev.map(({ path, component: Component }) => (
                                <Route
                                  key={path}
                                  path={path}
                                  element={<Component />}
                                />

                              ))
                            }
                            <Route path="/*" element={<Navigate to={routesPrev[0].to} replace />} />
                          </>
                        )
                        : (
                          <>
                            {
                              routesNext.map(({ path, component: Component }) => (
                                <Route
                                  key={path}
                                  path={path}
                                  element={<Component />}
                                />

                              ))
                            }
                            <Route path="/*" element={<Navigate to={routesNext[0].to} replace />} />
                          </>
                        )
                    }
                  </Routes>
                </div>
              </div>
            </div>
          </BrowserRouter>
        </Suspense>
      </div>
    </>
  )
}
