# Kaguya

A automated currency exchange system with machine learning

# Packages

| Packages                    | Description  |
| :---------------------------| :----------- |
| **[kaguya](./kaguya_nn)**   | ML           |
| **[@scea/core](./core)**     | Domain       |
| **[@scea/web](./web)**       | Web frontend |
| **[@scea/server](./server)** | Backend      |
| **[@scea/api](./api)**       | Client       |
| **[@scea/cli](./cli)**       | CLI          |

# Setup

1. Manually setup .env.

```
```

2. Build local environment image

```
docker-compose build app
```

3. Install node dependecies

```
docker compose run --rm app yarn install
```
