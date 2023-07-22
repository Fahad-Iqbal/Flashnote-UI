const Document = ({ document }) => {
  return (
    <div
      className="document"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: '0',
        height: '93vh',
        overflow: 'auto',
      }}
    >
      <p
        style={{
          fontSize: '5rem',
          textAlign: 'center',
          marginBottom: '10rem',
        }}
      >
        {document ? document.title : 'Please select or create a new document'}
      </p>
    </div>
  );
};

export default Document;
