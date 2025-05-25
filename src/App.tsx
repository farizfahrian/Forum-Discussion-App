import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { asyncPreloadProcess } from "./states/isPreload/action";
import { asyncUnsetAuthUser } from "./states/authUser/action";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import Loading from "./components/Loading.tsx";
import Navigation from "./components/Navigation.tsx";
import HomePage from "./pages/HomePage.tsx";
import DetailPage from "./pages/DetailPage.tsx";

function App() {
  const { 
    authUser,
    isPreload = false
  } = useSelector((state: any) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess() as any);
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser() as any);
  }

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
    <>
      <Loading />
      <main className="bg-neutral-950">
        <Routes>
          <Route path="/*" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
    </> 
    )
  }

  return (
    <>
      <Loading />
    <div>
      <header>
        <Navigation authUser={authUser} signOut={onSignOut}/>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/threads/:id" element={<DetailPage />} />
        </Routes>
      </main>
    </div>
    </>
  )
}

export default App
