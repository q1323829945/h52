# Replace

### Chart.yaml

```yaml
name: your repository name
```

### Makefile

NAME := **your repository name**

sed -i -e "s|repository:.*|repository: $(DOCKER_REGISTRY)\/**(your registry org name)**\/**(your repository name)**|" values.yaml

