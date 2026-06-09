export function responseReturn(res, status_code, message, data) {
  const constructedResponse = {
    code: status_code,
    message: message,
    data: data ?? null,
  };

  res.status(status_code).json(constructedResponse);
}
