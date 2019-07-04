function validate(payload, schema) {
  const result = schema.validate({a, b});

  if (result.error) {
    const error = new Error(result.error.message);
    error.code = 'VALLIDATION_ERROR';
    throw error;
  }
}