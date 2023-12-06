import { Loading, Redirect } from '@/components';
import router from '@/router';
import { Fragment, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

function Main() {
  const renderRoutes = (menu: any) =>
    menu.map(({ path, children, index, title, ...item }: any) => (
      <Fragment key={path}>
        {index && (
          <Route
            index={true}
            element={
              <Suspense fallback={<Loading />}>
                <item.component twoRouter={children} />
              </Suspense>
            }
          />
        )}
        <Route
          path={path}
          key={path}
          element={
            <Suspense fallback={<Loading />}>
              <item.component twoRouter={children} />
            </Suspense>
          }
        >
          {children && renderRoutes(children)}
        </Route>
      </Fragment>
    ));

  return (
    <main id='main'>
      <Routes>
        {renderRoutes(router)}
        <Route path='/' element={<Redirect to={globalConfig.homePage} />} />
        <Route path='*' element={<Redirect to='/404' />} />
      </Routes>
    </main>
  );
}

export default Main;
