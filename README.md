Translates JSON into a Python data class. [Check it out!](http://channelcat.github.io/json-to-python)

This is based off of [json-to-go](https://mholt.github.io/json-to-go), which converts json to Go code.

Things to note:

- The script sometimes has to make some assumptions, so give the output a once-over.
- In an array of objects, it is assumed that the first object is representative of the rest of them.
- The output is indented, but not formatted. Use `black`!

Contributions are welcome! Open a pull request to fix a bug, or open an issue to discuss a new feature or change.

### Credits

JSON-to-Python is brought to you by Channel Cat.
JSON-to-Go is brought to you by Matt Holt ([mholt6](https://twitter.com/mholt6)).
