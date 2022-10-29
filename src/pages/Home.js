import { TodoList } from '../components/TodoList';

// eslint-disable-next-line import/prefer-default-export
export function Home() {
  return (
  // eslint-disable-next-line react/jsx-filename-extension,react/react-in-jsx-scope
    <>
      {/* eslint-disable-next-line react/react-in-jsx-scope */}
      <h1 data-testid="page-title">Home</h1>

      {/* eslint-disable-next-line react/react-in-jsx-scope */}
      <p>
        This is the list.
      </p>
      {/* eslint-disable-next-line react/react-in-jsx-scope */}
      <TodoList />
    </>
  );
}
