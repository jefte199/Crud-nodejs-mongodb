# Crud-nodejs-mongodb

### Hospedando no fly.io

```bash
# Install flyctl
# macOS
brew install flyctl

# linux
curl -L https://fly.io/install.sh | sh

# Hospedando api
# Fazendo login com fly
$ fly auth login

# Deploy
fly launch

# Adicionando variaveis secreta(.env)
fly secrets set VARIAVEL=VALUE
fly secrets set AUTH_USER=new_user

## Deploy
fly deploy
```

### 🛠 Tecnologias

- [Node.js](https://nodejs.org/en/)

