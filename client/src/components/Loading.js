const Loading = ({ loading, className = "loader-container" }) => {
  if (loading) {
    return (
      <div className={className}>
        <div className="spinner"></div>
      </div>
    );
  }
};

export default Loading;
