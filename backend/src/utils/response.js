export function responseReturn(res, data, status_code, message) {
  const constructedResponse = {
    code: status_code,
    message: message,
    data: data ?? null,
  };
  res.json(constructedResponse);
}
