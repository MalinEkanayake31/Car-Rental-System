import mongoose from "mongoose";

const { Schema } = mongoose;

const contact_formschema = new Schema({
    comment: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    }
});

const Contact_form = mongoose.model("Contact_form", contact_formschema);

export default Contact_form;