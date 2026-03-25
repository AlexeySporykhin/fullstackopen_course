/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
const info = (...params: string[]) => {
  console.log(...params);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const requestLogger = (request: any, _response: any, next: any) => {
  info("Method:", request.method);
  info("Path:  ", request.path);
  info("Body:  ", request.body);
  info("---");
  next();
};
