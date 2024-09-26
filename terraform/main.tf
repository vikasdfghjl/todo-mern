provider "aws" {
        access_key = "${var.access_key}"
        secret_key = "${var.secret_key}"
        region = "ap-south-1"
}

resource "aws_instance" "ec2_instance" { # ec2_instance - this is just a local variable
        ami = "${var.ami_id}"
        count = "${var.number_of_instances}"
        subnet_id = "${var.subnet_id}"
        instance_type = "${var.instance_type}"
        key_name = "${var.ami_key_pair_name}"

        vpc_security_group_ids = ["sg-04dcb1e5a6e5e5b1c"] # Replace with your security group ID


        tags = {
                Name = "todo-app-project"
        }
}

resource "aws_security_group" "todo-sg" { # terraform-demo-sg - This is just a local variable
        name = "todo-app-sg"
        description = "Example security group for EC2 instance"

        ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
