import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: false,
  },
});

const employeeAddressSchema = new mongoose.Schema({
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

const assignmentAddressSchema = new mongoose.Schema({
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

const EmployeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
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
  employeeAddress: {
    type: employeeAddressSchema,
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

  assignmentAddress : {
    type: assignmentAddressSchema,
    default: null,
  },
},
{
  timestamps: true
}
);

// Define the model
const Employee = mongoose.models.Employee || mongoose.model('Employee', EmployeeSchema);

export default Employee;