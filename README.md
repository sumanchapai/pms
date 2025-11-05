This is an incremental, lightweight PMS for (small) hotels. Database is a `JSON` file, therefore the assumption
is that there won't be many users of this app. Database backup and versioning is supposed to be done using `git` and `Github`.
Check the [gw](https://github.com/sumanchapai/gw) project for a webserver that provides `git commit` and `git push` features
from the browser. This app is supposed to be self-hosted, and the code modified as per your need. You should be able to host
using the instructions below (requires Docker installed).

![Analytics charts on homepage](images/image1.jpeg)

**Features TODO:**

- [x] Note monthly analytics.

**Architecture:**

Backend is a [json-server](https://github.com/typicode/json-server) instance that uses a `.json` file as a database.

**Usage:**

1. Clone this repo.
1. Run `cp .env.example .env` and set the environment variables.
   1. Create `db.json` in some folder (Use the provided `db.json` as template).
   1. Provide that folder's abolute path in `DB_REPO` environment file.
   1. If you already have json file, make sure the format is the same as in the [example file](./db.json).
1. Run `docker compose up`. Add `-d` flag at the end if you want to run in detached mode.
