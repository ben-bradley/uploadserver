# Upload Server

A stupid-simple way to be able to write files to a HTTP server.

__IMPORTANT__

> If you're running versions before `v0.1.0`, please update as it's possible to save files anywhere on the filesystem that the execution user has permission to.

## Install

```bash
$ npm install -g uploadserver
```

## Start

```bash
$ uploadserver [--port=3000] [--uploadsDir=/path/to/dir] [--cors] [--verbose]
```

Executing without any options starts a server on a random port that saves to the current directory and has no cors support.

## Example use

```bash
$ uploadserver --port=3000 --uploadsDir=/path/to/dir&
$ curl -d @filename.txt localhost:3000/filename.txt
saved /path/to/dir/filename.txt
```

## To Do

- Play with it in real life and see what I overlooked

## Versions

- 0.2.0 - Support `--cors` and `--verbose` flags.
- 0.1.0 - Filtered out `../` in file path to prevent saving files above the intended folder.
