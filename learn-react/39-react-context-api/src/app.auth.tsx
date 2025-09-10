import { createContext, useCallback, useContext, useState } from 'react';
import { LearnSection } from './components';

type User = {
  email: string;
  name: string;
  accessToken: string;
} | null;

interface AuthContextValue {
  user: User;
  logIn?: () => void;
  logOut?: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
});

AuthContext.displayName = 'AuthContext';

export default function App() {
  const [authUser, setAuthUser] = useState<User>(null);

  const logIn = useCallback(() => {
    setAuthUser({
      email: 'user@example.com',
      name: '테스터',
      accessToken: crypto.randomUUID(),
    });
  }, []);

  const logOut = useCallback(() => {
    setAuthUser(null);
  }, []);

  const authValue: AuthContextValue = { user: authUser, logIn, logOut };

  return (
    <AuthContext.Provider value={authValue}>
      <LearnSection
        title="리액트 컨텍스트를 사용해 데이터 공유"
        showTitle
        className="text-indigo-800 p-10 scale-100"
      >
        <GrandParent />
      </LearnSection>
    </AuthContext.Provider>
  );
}

function GrandParent() {
  return (
    <div className="flex gap-10 justify-center items-center p-20 border-8 border-indigo-600 text-indigo-600">
      <h2 className="text-inherit">Grand Parent</h2>
      <Navigation />
      <Parent />
    </div>
  );
}

function Navigation() {
  const { logIn, user, logOut } = useContext(AuthContext);

  return (
    <nav>
      <ul className="list-none pl-0">
        <li>
          {!user ? (
            <a
              href="/login"
              className="no-underline button"
              onClick={e => {
                e.preventDefault();
                logIn?.();
              }}
            >
              로그인
            </a>
          ) : (
            <a
              href="/logout"
              className="no-underline button"
              onClick={e => {
                e.preventDefault();
                logOut?.();
              }}
            >
              로그아웃
            </a>
          )}
        </li>
      </ul>
    </nav>
  );
}

function Parent() {
  return (
    <div className="flex gap-10 justify-center items-center p-20 border-8 border-indigo-600 text-indigo-600">
      <h2 className="text-inherit">Parent</h2>
      <Child />
    </div>
  );
}

function Child() {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex flex-col gap-10 justify-center items-center p-20 border-8 border-indigo-600 text-indigo-600">
      <h2 className="text-inherit">Child</h2>
      {user ? (
        <p>
          {user.name} | {user.email} | {user.accessToken}
        </p>
      ) : (
        <p>로그인이 필요합니다.</p>
      )}
    </div>
  );
}
