import React, { useContext, useState } from "react";
import FetchDataContext from "../context/FetchDataContext";
import Spinner from "../components/Spinner";

const Dashboard = () => {
  const [Loader, setLoader] = useState("");
  const { candidateArray, candidateLength, voterLength, giveVote } =
    useContext(FetchDataContext);
  return (
    <div className="container-sm mt-2 p-5">
      <div className="row text-center">
        <div className="col-sm">
          <div className="row">
            <div className="col-sm bg-light p-4">
              <div className="col-xs bg-black rounded p-2 text-white">
                <small>
                  <b>Candidates - {candidateLength.toString()}</b>
                </small>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm">
          <div className="row">
            <div className="col-sm  bg-light p-4">
              <div className="col-xs bg-black rounded p-2 text-white">
                <small>
                  <b>Voters - {voterLength.toString()}</b>
                </small>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm">
          <div className="row">
            <div className="col-sm  bg-light p-4">
              <div className="col-xs bg-black rounded p-2 text-white">
                <small>
                  <b>00:00:00:00</b>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {/*card*/}
        {candidateArray.map((el, i) => (
          <div
            key={i + 1}
            className="col-sm d-flex flex-wrap justify-content-center mt-2 p-2"
          >
            <div className="card" style={{ width: "18rem" }}>
              <img src={el[3]} className="card-img-top" alt="logo" />
              <div className="card-body">
                <h6 className="card-title text-black text-center fs-6">
                  <b>
                    {el[2]} - #{el[0].toString()}
                  </b>
                </h6>
                <h6 className="card-title text-black text-center fs-6">
                  <small className="text-muted">{el[1]}</small>
                </h6>
                <h6 className="card-title text-black text-center fs-6">
                  <small>Address:</small>&nbsp;
                  <small>
                    <b>{el[5].slice(0, 6) + "..." + el[5].slice(38)}</b>
                  </small>
                </h6>
                <h6 className="card-title text-white text-center bg-black fs-6">
                  <small>Total Vote</small>
                </h6>
                <h6 className="card-title text-black text-center fs-6">
                  <small>{el[4].toString()}</small>
                </h6>
                <div className="d-flex justify-content-center">
                  <span
                    onClick={() =>
                      giveVote(
                        { id: el[0].toString(), address: el[5] },
                        setLoader
                      )
                    }
                    className="btn btn-sm btn-black"
                  >
                    {Loader === el[0].toString() ? <Spinner /> : ""} Give Vote
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/*end card*/}
      </div>
    </div>
  );
};

export default Dashboard;
