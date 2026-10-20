//thrown when the body of an API answer does not have the expected shape
export class ApiParseError extends Error {
  constructor(
    readonly url: string,
    readonly status: number,
    details: string,
  ) {
    super(`Unexpected body from ${url} (status ${status})\n${details}`);
    this.name = "ApiParseError";
  }
}
