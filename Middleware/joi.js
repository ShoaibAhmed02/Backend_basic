const Joi = require("@hapi/joi");
const JoiValidation = async (req, res) => {
  // Define the Joi schema for input validation
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .strict(),
  });
  // Validate the request body against the schema
  const { error, value } = schema.validate(req.body);

  // Check for validation errors
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // If validation passes, you can use the validated data (value) for further processing
  // For demonstration purposes, just echoing the validated data in the response
  res.json({ message: "Validation successful", data: value });
};


module.exports={JoiValidation}