import React from "react";

export const WatchlistButton = ({ addMylist, deleteMylist, classes }) => {
  return (
    <div className={`mylist-button ${classes} mt-3`}>
      <button
        className="form-control btn btn-outline-warning"
        onClick={addMylist || deleteMylist}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          {addMylist && <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />}
          {deleteMylist && (
            <path d="M6.61 11.89L3.5 8.78 2.44 9.84 6.61 14l8.95-8.95L14.5 4z" />
          )}
        </svg>{" "}
        My List
      </button>
    </div>
  );
};
