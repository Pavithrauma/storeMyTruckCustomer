import React, { useEffect, useState } from "react";
import { Field, ErrorMessage } from "formik";

const VehicleDetails = ({ vehicleTypeId, vehicleType, index, remove, vehicleTypeCode }) => {
  const [vehicle, setVehicle] = useState({
    vehicleTypeId,
    year: "",
    make: "",
    model: "",
    color: "",
    usdot: "",
    tag: "",
  });

  // Update vehicle state whenever a field changes
  const handleFieldChange = (field, value) => {
    setVehicle(prevVehicle => ({
      ...prevVehicle,
      [field]: value,
    }));
  };

  useEffect(() => {
    console.log("vehicleTypeCode: ", vehicleTypeCode);
    console.log("-----------------------", vehicle);
  }, [vehicleTypeCode]);

  return (
    <>
      <div className="col-md-2">
        <div className="form-group">
          <label>Year<span>*</span></label>
          <Field
            type="text"
            name={`vehicles[${index}].year`}
            value={vehicle.year}
            className="form-control"
            onChange={(e) => handleFieldChange("year", e.target.value)}
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
            className="form-control"
            onChange={(e) => handleFieldChange("make", e.target.value)}
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
            className="form-control"
            onChange={(e) => handleFieldChange("model", e.target.value)}
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
            className="form-control"
            onChange={(e) => handleFieldChange("color", e.target.value)}
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
            onChange={(e) => handleFieldChange("usdot", e.target.value)}
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
            onChange={(e) => handleFieldChange("tag", e.target.value)}
          />
        </div>
      </div>

      {/* Conditionally render fields based on vehicleTypeCode */}
      {vehicleTypeCode === 'VT4' && (
        <>
          <div className="col-md-3">
            <label>Trailer Length<span>*</span></label>
            <Field as="select" name={`vehicles[${index}].trailerLength`} className="form-control">
              <option value="">Please Select</option>
              <option value="48 ft – 53 ft">48 ft – 53 ft</option>
              <option value="40 ft – 47 ft">40 ft – 47 ft</option>
              <option value="24 ft – 39 ft">24 ft – 39 ft</option>
              <option value="< 24 ft">Less than 24 ft</option>
            </Field>
          </div>
          <div className="col-md-3">
            <label>Trailer Type<span>*</span></label>
            <Field as="select" name={`vehicles[${index}].trailerType`} className="form-control">
              <option value="">Please Select</option>
              <option value="Dry Van">Dry Van</option>
              <option value="Reefer">Reefer</option>
            </Field>
          </div>
        </>
      )}

      {vehicleTypeCode === 'VT2' && (
        <div className="col-md-3">
          <label>Company Name On Tractor<span>*</span></label>
          <Field type="text" name={`vehicles[${index}].companyNameOnTractor`} className="form-control" />
        </div>
      )}

      {['VT5', 'VT6', 'VT3'].includes(vehicleTypeCode) && (
        <div className="col-md-3">
          <label>Other Identifying Info<span>*</span></label>
          <Field type="text" name={`vehicles[${index}].otherIdentifyingInfo`} className="form-control" />
        </div>
      )}

      <div className="col-md-4">
        {index > 0 && (
          <button type="button" className="button-2" onClick={() => remove(index)}>
            Delete
          </button>
        )}
      </div>
    </>
  );
};

export default VehicleDetails;
