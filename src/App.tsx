import AuthenticatedApp from "authenticatedApp";
import { ErrorBoundary } from "components/errorBoundary";
import { FullPageErrorFallback } from "components/lib";
import { useAuth } from "context/authContext";
import UnauthenticatedApp from "unauthenticatedApp";
import "./App.css";

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
