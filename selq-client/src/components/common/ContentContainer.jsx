import { RouterProvider } from 'react-router-dom';

export default function ContentContainer({ router }) {
  return (
    <div
      style={{
        width: '100%',
        padding: '10px',
        minHeight: 'calc(100vh - 150px)',
        margin: 'auto',
      }}
    >
      <RouterProvider router={router} />
    </div>
  );
}
