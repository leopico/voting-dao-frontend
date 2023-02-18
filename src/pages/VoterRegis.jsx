import React, { useCallback, useContext, useState } from "react";
import Image from "../images/upload1.png";
import Logo from "../images/logo.jpg";
import FetchDataContext from "../context/FetchDataContext";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const VoterRegis = () => {
  //context
  const { uploadToIPFSVoter, createVoter, organizerAddress } =
    useContext(FetchDataContext);

  //react-router-dom
  const navigate = useNavigate();

  //hooks
  const [Loader, setLoader] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({
    name: "",
    address: "",
    position: "",
  });

  //VOTER IMAGE DROP
  const onDrop = useCallback(
    async (acceptedFile) => {
      const url = await uploadToIPFSVoter(acceptedFile[0]);
      setFileUrl(url);
    },
    [uploadToIPFSVoter]
  );

  //for drag and drop
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });

  return (
    <div className="container-fluid">
      <div className="row align-items-start m-1">
        {/*rendering form*/}
        <div className="col-lg-3 mb-1">
          <div className="container">
            <div className="row">
              <div className="col-10 offset-1 bg-light rounded">
                <div className="container-fluid">
                  <div className="row">
                    {fileUrl ? (
                      <div className="col-sm d-flex flex-wrap justify-content-center my-2 p-2">
                        <div className="card" style={{ width: "18rem" }}>
                          <img
                            src={fileUrl}
                            className="card-img-top"
                            alt="logo"
                          />
                          <div className="card-body">
                            <h6 className="card-title text-black text-center fs-6">
                              <b>
                                Name: <span>&nbsp; {formInput.name}</span>
                              </b>
                            </h6>
                            <h6 className="card-title text-black text-center fs-6">
                              <small>
                                Add:
                                <span>
                                  &nbsp;
                                  {formInput.address.slice(0, 5) +
                                    "..." +
                                    formInput.address.slice(38)}
                                </span>
                              </small>
                            </h6>
                            <h6 className="card-title text-black text-center fs-6">
                              <small>
                                pos: <span>&nbsp;{formInput.position}</span>
                              </small>
                            </h6>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="col-12 text-black">
                        <h6>
                          <small>Create Voter for voting</small>
                        </h6>
                        <p className="bg-warning p-1 rounded">
                          <small>
                            Blockchain voting organization, provide ethereum
                            blockchain eco system.
                          </small>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*end rendering form*/}
        {/*start form*/}
        <div className="col-lg-6 mb-1">
          <div className="container text-black">
            <div className="row">
              <div className="col-12 bg-light rounded p-1">
                <h6>Create New Voter</h6>
                <div className="row">
                  <div className="col-10 offset-1 mb-2">
                    <form>
                      {/*image*/}
                      <div
                        {...getRootProps()}
                        className="border border-warning rounded-5"
                      >
                        <input
                          {...getInputProps()}
                          className="form-control"
                          required
                        />
                        <p className="text-center">
                          <small>Upload File: JPG,PNG,GIF,WEBM, Max:10MB</small>
                        </p>
                        <img
                          src={fileUrl ? fileUrl : Image}
                          alt="file upload"
                          className="w-25 h-25 center"
                        />
                        <p className="text-center mt-1">
                          <small>Drag & Drop File...</small>
                        </p>
                      </div>
                      {/*end image*/}
                      <div className="mb-3">
                        <label className="form-label text-black">Name</label>
                        <input
                          onChange={(e) =>
                            setFormInput({ ...formInput, name: e.target.value })
                          }
                          type="text"
                          className="form-control"
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label text-black">Address</label>
                        <input
                          onChange={(e) =>
                            setFormInput({
                              ...formInput,
                              address: e.target.value,
                            })
                          }
                          type="text"
                          className="form-control"
                          placeholder="Enter your wallet address"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label text-black">
                          Position:{" "}
                          <small className="text-muted">
                            max: 40 char length
                          </small>
                        </label>
                        <input
                          maxLength="40"
                          onChange={(e) =>
                            setFormInput({
                              ...formInput,
                              position: e.target.value,
                            })
                          }
                          type="text"
                          className="form-control"
                          placeholder="Enter your position"
                          required
                        />
                      </div>
                      <span
                        type="submit"
                        onClick={() =>
                          createVoter(formInput, fileUrl, navigate, setLoader)
                        }
                        className="btn-sm btn btn-outline-warning float-end"
                      >
                        {Loader && <Spinner />} create voter
                      </span>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*end form*/}
        {/*for organizer*/}
        <div className="col-lg-3 mb-1">
          <div className="container">
            <div className="row">
              <div className="col-10 offset-1 rounded">
                <div className="container-fluid">
                  <div className="row">
                    {/*card for candidate*/}
                    <div className="col-sm d-flex flex-wrap justify-content-center">
                      <div className="card" style={{ width: "18rem" }}>
                        <img src={Logo} className="card-img-top" alt="logo" />
                        <div className="card-body">
                          <h6 className="card-title text-black fs-6">
                            <b>
                              <small>Notice for users</small>
                            </b>
                          </h6>
                          <h6 className="card-title text-black fs-6">
                            <small>
                              <b>Organizer:</b>
                            </small>
                            &nbsp;
                            <small>
                              {organizerAddress.slice(0, 5) +
                                "..." +
                                organizerAddress.slice(38)}
                            </small>
                            <p className="mt-2 bg-warning rounded-3 p-1">
                              <small>
                                Only organizer of the voting contract can create
                                voter and candidate for voting election.
                              </small>
                            </p>
                          </h6>
                        </div>
                      </div>
                    </div>
                    {/*end card for candidate*/}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*end for organizer*/}
      </div>
    </div>
  );
};

export default VoterRegis;
