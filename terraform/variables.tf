# contains all the variables and their descriptions

variable "access_key" {
	description = "access key of the aws account"
	type = string
}

variable "secret_key" {
        description = "secret key of the aws account"
        type = string
}

variable "region" {
        description = "instance region"
        type = string
  
}

variable "availability_zone" {
        description = "availability zone"
        type = string  
}

variable "vpc_id" {
        description = "The VPC the instance(s) will be created in"
        type = string
  
}

variable "instance_name" {
        description = "name of the instance"
        type = string
        default = " "
}

variable "instance_type" {
        description = "Instance type"
        type = string
}

variable "volume_type" {
        description = "volume type"
        type = string
  
}

variable "volume_size" {
        description = "volume size"
        type = number
  
}

variable "subnet_id" {
        description = "The VPC subnet the instance(s) will be created in"
        type = string
}

variable "ami_id" {
        description = "ID of the AMI to use for the instance"
        type = string
}

variable "number_of_instances"{
        description = "number of instances to be created"
        type = number
}


variable "ami_key_pair_name"{
        description = "value of the key pair name"
        type = string
}

variable "aws_security_group_name" {
        description = "security group name"
        type = string
  
}

variable "ingress_rules" {
  description = "List of ingress rules"
  type        = list(object({
    from_port   = number
    to_port     = number
    protocol    = string
    cidr_blocks = list(string)
  }))
  default = []
}

variable "egress_rules" {
  description = "List of egress rules"
  type        = list(object({
    from_port   = number
    to_port     = number
    protocol    = string
    cidr_blocks = list(string)
  }))
  default = []
}
