import React, { useContext } from "react";
import FetchDataContext from "../context/FetchDataContext";

const VoterList = () => {
  const { voterArray } = useContext(FetchDataContext);

  return (
    <div className="container-sm">
      <div className="row">
        {/*card*/}
        {voterArray.map((el, i) => (
          <div
            key={i + 1}
            className="col-sm d-flex flex-wrap justify-content-center my-2 p-1"
          >
            <div className="card" style={{ width: "18rem" }}>
              <img src={el[2]} className="card-img-top" alt="logo" />
              <div className="card-body">
                <h6 className="card-title text-black text-center fs-6">
                  <b>
                    {el[1]} - #{el[0].toString()}
                  </b>
                </h6>
                <h6 className="card-title text-black text-center fs-6">
                  <small>Address:</small>&nbsp;
                  <small>
                    <b>{el[3].slice(0, 6) + "..." + el[3].slice(39)}</b>
                  </small>
                </h6>
                <h6 className="card-title text-black text-center fs-6">
                  <small>detail</small>
                </h6>
                <h6 className="card-title text-black text-center fs-6">
                  <small>
                    {el[5] === true ? <b>Voted</b> : <b>Not Voted</b>}
                  </small>
                </h6>
              </div>
            </div>
          </div>
        ))}
        {/*end card*/}
      </div>
    </div>
  );
};

export default VoterList;
