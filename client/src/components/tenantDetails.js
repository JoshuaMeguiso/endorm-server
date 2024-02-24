import { add, format } from "date-fns";

const tenantDetails = ({ state }) => {
  return (
    <div className="tenant-details">
      <p>
        <strong>Name:</strong>
        <span style={{ float: "right" }}>{state.name}</span>
      </p>
      <p>
        <strong>Address:</strong>
        <span style={{ float: "right" }}>{state.address}</span>
      </p>
      <p>
        <strong>Motorcycle Brand:</strong>
        <span style={{ float: "right" }}>{state.motorcycle_brand}</span>
      </p>
      <p>
        <strong>Motorcycle Name:</strong>
        <span style={{ float: "right" }}>{state.motorcycle_name}</span>
      </p>
      <p>
        <strong>Plate Number:</strong>
        <span style={{ float: "right" }}>{state.plate_no}</span>
      </p>
      <p>
        <strong>Contact Number:</strong>
        <span style={{ float: "right" }}>{state.contact_no}</span>
      </p>
    </div>
  );
};

export default tenantDetails;
