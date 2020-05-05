# HTTP Status Codes

HTTP status codes are used to indicate how a request was handled by the server. Status codes are a part of the response.  Status codes are separated into 5 categories by their hundreds numeral.

# Categories

* 100s - Informational Status Codes
* 200s - Success Status Codes
* 300s - Redirects
* 400s - Client Failures
* 500s - Server Failures

## Useful Status Codes

* 200 - Success
* 201 - Created - Used when the server has created a new resource based on user request.  Frequently the response code to a successful POST request.  May also be used with PUT if the object did not already exist.
* 302 - Found - Most common status code for redirects.  In express you can just use send.redirect('url');  Redirects function by using a redirect status code (300s) and a 'Location' header that contains the url to be redirected to.
* 400 - Generic client side problem
* 401 - Unauthorized - We don't know who you are. Maybe login and try again.
* 403 - Forbidden - Stop trying.
* 404 - Not Found
* 405 - Method Not Allowed - The HTTP method of the request is not allowed.
* 415 - Unsupported Media Type - Often used for wrong request body type
* 422 - Unprocessable Entity - The requester sent data in the body, but the data is invalid, malformed, or doesn't match the object specification.
* 500 - Generic Server failure - If your express server encounters an error while processing the request, it will send a 500 error. 