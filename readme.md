# Upload Server

This app is designed to be a stupid-simple way to be able to write files to a HTTP server.

## Install

```bash
$ npm install -g uploadserver
```

## Start

```bash
$ uploadserver [--port=3000] [--uploadsDir=/path/to/dir]
```

Executing without any options starts a server on a random port that saves to the current directory.

## Example use

```bash
$ uploadserver --port=3000 --uploadsDir=/path/to/dir&
$ curl -d @filename.txt localhost:3000/filename.txt
saved /path/to/dir/filename.txt
```

## To Do

- Play with it in real life and see what I overlooked
