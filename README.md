# TODO-MERN APP

## Docker

Create `DB.env` in the same directory of `docker-compose.yaml`

### Example of `DB.env`

```env
MONGODB_URL=MONGODB_URI=mongodb://root:password@database:27017/todo-mern?authSource=admin

MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=password
MONGO_INITDB_DATABASE=admin
```

```yaml
docker-compose up -d 
```

---

## Terraform

Edit `terraform.tfvars.txt` to `terraform.tfvars` and edit the configurations.
then RUN these commands

```hcl
terraform init
terraform plan
terraform apply
---
terraform destroy
```
