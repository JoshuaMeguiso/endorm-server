const Loading = ({ loading }) => {
  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    );
  }
};

export default Loading;
