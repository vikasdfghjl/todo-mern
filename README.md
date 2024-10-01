# TODO-MERN APP

## Docker

Create `DB.env` in the same directory of `docker-compose.yaml` which should contain the `MONGODB_URL`

### Example of `DB.env`

```env
MONGODB_URL2=


```

```yaml
docker-compose up -d 
```

---

## Terraform

Edit `terraform.tfvars.txt` to `terraform.tfvars` and edit the configurations.

```hcl
terraform init
terraform plan
terraform apply
---
terraform destroy
```
