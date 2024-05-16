<p align="center">
  <img src="https://github.com/suyeonme/Tell-me-about-your-career/assets/55128990/0f60903d-b421-47aa-8ea0-8c3e5caa18ed" width="20%" height="20%">
</p>

# Tell me about your career.
> Description

## Getting started

### Prerequisites
- An account and app password on Gmail

### Setup Gmail App password
Follow [Sign in with app passwords](https://support.google.com/accounts/answer/185833?hl=en) by Google Account Help.

### Install

Add the following env variables to `.development.env` in packages/backend directory.

```
JWT_SECRET_KEY=YOUR_OWN
JWT_ACCESS_SECRET=YOUR_OWN
JWT_REFRESH_SECRET=YOUR_OWN
JWT_ACCESS_EXPIRE_TIME=1h
JWT_REFRESH_EXPIRE_TIME=14d

TIME_TO_LIVE_MILLISEC=60000
LIMIT_REQUEST_TIME_TO_LIVE=10

MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=YOUR_OWN
MAIL_PASSWORD=YOUR_OWN
```

 Install packages with pnpm

```bash
pnpm install

# Run husky
pnpm run prepare
```

Start backend server on development mode

```bash
pnpm run backend-dev

# or run the command in packages/backend
pnpm run start:dev
```
### Swagger UI
If you want to run Swagger UI, run the command.
```
http://localhost:3300/api
```


