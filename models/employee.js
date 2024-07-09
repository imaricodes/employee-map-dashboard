import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: false,
  },
});

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },
  zip: {
    type: String,
    required: false,
  },
});

const geoSchema = new mongoose.Schema({
  lat: {
    type: Number,
    required: false,
  },
  lng: {
    type: Number,
    required: false,
  },
});

const EmployeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  contact: {
    type: contactSchema,
    default: null,
  },
  address: {
    type: addressSchema,
    default: null,
  },
  locationName: {
    type: String,
    required: false,
  },
  locationId: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },
  geo: {
    type: geoSchema,
    default: null,
  },
});

// Define the model
const Employee = mongoose.models.Employee || mongoose.model('Employee', EmployeeSchema);

export default Employee;