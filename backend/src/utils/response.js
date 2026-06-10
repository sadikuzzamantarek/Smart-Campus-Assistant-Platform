export function responseReturn(res, success, status_code, message, data) {
  const constructedResponse = {
    success: success,
    code: status_code,
    message: message,
    data: data ?? null,
  };

  res.status(status_code).json(constructedResponse);
}
