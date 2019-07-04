function validate(payload, schema) {
  const result = schema.validate(payload);

  if (result.error) {
    const error = new Error(result.error.message);
    error.code = 'VALIDATION_ERROR';
    throw error;
  }

  return result.value;
}

module.exports = validate;