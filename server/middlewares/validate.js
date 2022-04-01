const validate = (schema) => (req, res, next) => {
  const {value,error} = schema.validate(req.body);
  if (error) {
    // [message:"",message:"",message:""]
    const errorMessage = error.details?.map(detail => detail.message).join(", ")
    // ["","","",""] => "aaaa,bbb,ccc"
    res.status(400).json({error: errorMessage});
    return;
  }

  Object.assign(req,value);
  return next();
}

module.exports = validate