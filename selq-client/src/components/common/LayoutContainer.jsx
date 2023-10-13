export default function LayoutContainer({ children }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        fontFamily: 'BMHANNAPro',
      }}
    >
      {children}
    </div>
  );
}
