# Echo server

Use POST or PATCH on any endpoints from this server,

When you later call the same endpoint with GET, you'll get the original request details: headers, body...

## Storing data

You can use POST or PATCH on any endpoint you want.

```sh
curl \
    -XPOST \
    -H "Content-Type:application/json" \
    http://echo.anyfetch.com/sample_identifier \
    -d '{"foo": "bar"}'
```

## Retrieving data

Use GET on the same endpoint:

```sh
curl \
    -XGET \
    http://echo.anyfetch.com/sample_identifier \
```

Will result in:

```json
{  
   "url":"/sample_identifier",
   "headers":{  
      "host":"echo.anyfetch.com",
      "connection":"close",
      "user-agent":"curl/7.35.0",
      "accept":"*/*",
      "content-type":"application/json",
      "x-request-id":"03edfbc8-dac9-428a-ae1c-9f5dd0e00d51",
      "x-forwarded-for":"5.39.237.147",
      "x-forwarded-proto":"http",
      "x-forwarded-port":"80",
      "via":"1.1 vegur",
      "connect-time":"0",
      "x-request-start":"1417097805526",
      "total-route-time":"0",
      "content-length":"14"
   },
   "query":{  

   },
   "body":{  
      "foo":"bar"
   },
   "date":"2014-11-27T14:16:45.528Z"
}
```

## FAQ

* Is there any security?
    - No. Anyone can overwite or access your data. Don'ty use this for sensitive stuff, only to test your queries.
* Is it a long term storage?
    - No. Only the 50 last keys are stored. If you use the default implementation at `http://echo.anyfetch.com`, the cache can be emptied at any time. Don't use it for anything requiring high reliability.
* I want a custom reply to my GET, not a simple `{"stored":true}`?
    - Use `_echo_reply` as a parameter to your POST request. This can either be a number (status code) or a value that will be returned.
