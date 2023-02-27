import { useCallback, Fragment, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import menus from "@/router";
import { Loading, Redirect } from "@/components";
import "./style.scss";

function Main() {
  const renderRoutes = useCallback(
    (menu: any) =>
      menu.map(({ path, children, index, title, ...item }: any) => {
        return (
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
        );
      }),
    []
  );

  return (
    <main id="main">
      <Routes>
        {renderRoutes(menus)}
        <Route path="/" element={<Redirect to="/home" />} />
        <Route path="*" element={<Redirect to="/404" />} />
      </Routes>
    </main>
  );
}

export default Main;
