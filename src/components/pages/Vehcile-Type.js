 <div className="col-md-6 col-sm-6">
                                                  <div className="form-group">
                                                    <label>
                                                      VIN<span style={{ color: 'red' }}>*</span>
                                                    </label>
                                                    <Field
                                                      type="text"
                                                       
                                                      name={`vehicles[${index}].license`}
                                                      value={vehicle.license}
                                                      placeholder="Enter the license number"
                                                      className={`form-control ${touched.vehicles?.[index]?.license && errors.vehicles?.[index]?.license ? "is-invalid" : ""}`}
                                                      onChange={(e) => handleLicenseData(index, e.target.value, vehicleTypeId)}
                                                      
                                                    />
                                                    <ErrorMessage
                                                      name={`vehicles[${index}].license`}
                                                      component="div"
                                                      className="invalid-feedback"
                                                    />
                                                  </div>
                                                </div>

                                                <div className="col-md-2">
                                                  <div className="form-group">
                                                    <label>Year<span>*</span></label>
                                                    <Field
                                                      type="text"
                                                      name={`vehicles[${index}].year`}
                                                      value={vehicle.year}
                                                      className={`form-control ${touched.vehicles?.[index]?.year && errors.vehicles?.[index]?.year ? "is-invalid" : ""}`}
                                                      onChange={(e) => setVehicleData(prev => ({ ...prev, year: e.target.value }))}
                                                    />
                                                  </div>
                                                </div>

                                                <div className="col-md-2">
                                                  <div className="form-group">
                                                    <label>Make<span>*</span></label>
                                                    <Field
                                                      type="text"
                                                      name={`vehicles[${index}].make`}
                                                      value={vehicle.make}
                                                      className={`form-control ${touched.vehicles?.[index]?.make && errors.vehicles?.[index]?.make ? "is-invalid" : ""}`}
                                                      onChange={(e) => setMake(e.target.value)}
                                                    />
                                                  </div>
                                                </div>

                                                <div className="col-md-2">
                                                  <div className="form-group">
                                                    <label>Model<span>*</span></label>
                                                    <Field
                                                      type="text"
                                                      name={`vehicles[${index}].model`}
                                                      value={vehicle.model}
                                                      className={`form-control ${touched.vehicles?.[index]?.model && errors.vehicles?.[index]?.model ? "is-invalid" : ""}`}
                                                      onChange={(e) => setModel(e.target.value)}
                                                    />
                                                  </div>
                                                </div>

                                                <div className="col-md-3">
                                                  <div className="form-group">
                                                    <label>Color<span>*</span></label>
                                                    <Field
                                                      type="text"
                                                      name={`vehicles[${index}].color`}
                                                      value={vehicle.color}
                                                      className={`form-control ${touched.vehicles?.[index]?.color && errors.vehicles?.[index]?.color ? "is-invalid" : ""}`}
                                                      onChange={(e) => setColor(e.target.value)}
                                                    />
                                                  </div>
                                                </div>

                                                <div className="col-md-3">
                                                  <div className="form-group">
                                                    <label>USDOT#<span>*</span></label>
                                                    <Field
                                                      type="text"
                                                      name={`vehicles[${index}].usdot`}
                                                      value={vehicle.usdot}
                                                      className="form-control"
                                                      onChange={(e) => setVehicle(prev => ({ ...prev, usdot: e.target.value }))}
                                                    />
                                                  </div>
                                                </div>

                                                <div className="col-md-3">
                                                  <div className="form-group">
                                                    <label>TAG<span>*</span></label>
                                                    <Field
                                                      type="text"
                                                      name={`vehicles[${index}].tag`}
                                                      value={vehicle.tag}
                                                      className="form-control"
                                                      onChange={(e) => setVehicle(prev => ({ ...prev, tag: e.target.value }))}
                                                    />
                                                  </div>
                                                </div>

                                                <div className="col-md-3">
                                                  <div className="form-group">
                                                    <label>Other Identifying Info<span>*</span></label>
                                                    <Field
                                                      type="text"
                                                      name={`vehicles[${index}].otherIdentifyingInfo`}
                                                      value={vehicle.otherIdentifyingInfo}
                                                      className="form-control"
                                                      onChange={(e) => setVehicle(prev => ({ ...prev, otherIdentifyingInfo: e.target.value }))}
                                                    />
                                                  </div>
                                                </div>

                                                <div className="col-md-4">
                                                  {index > 0 && (
                                                    <button type="button" className="button-2" onClick={() => remove(index)}>Delete</button>
                                                  )}
                                                </div>