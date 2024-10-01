provider "aws" {
        access_key = "${var.access_key}"
        secret_key = "${var.secret_key}"
        region = "${var.region}"
}

resource "aws_instance" "ec2_instance" { # ec2_instance - this is just a local variable
        ami = "${var.ami_id}"
        count = "${var.number_of_instances}"
        subnet_id = "${var.subnet_id}"
        instance_type = "${var.instance_type}"
        key_name = "${var.ami_key_pair_name}"
        vpc_security_group_ids = [aws_security_group.sg.id] # Replace with your security group ID

        root_block_device {
                volume_type = "${var.volume_type}"
                volume_size = "${var.volume_size}"
        }

        tags = {
                Name = "${var.instance_name}-${count.index}"
        }
}

resource "aws_security_group" "sg" { # demo - This is just a local variable
        name = "${var.aws_security_group_name}"
        description = "security group for EC2 instance"
}
resource "aws_security_group_rule" "ingress_ssh" {
        security_group_id = aws_security_group.sg.id
        type = "ingress"
        from_port   = "${var.ingress_rules[0].from_port}"
        to_port     = "${var.ingress_rules[0].to_port}"
        protocol    = "${var.ingress_rules[0].protocol}"
        cidr_blocks = "${var.ingress_rules[0].cidr_blocks}"
  }

resource "aws_security_group_rule" "ingress_http" {
        security_group_id = aws_security_group.sg.id
        type = "ingress"
        from_port   = "${var.ingress_rules[1].from_port}"
        to_port     = "${var.ingress_rules[1].to_port}"
        protocol    = "${var.ingress_rules[1].protocol}"
        cidr_blocks = "${var.ingress_rules[1].cidr_blocks}"
  }

resource "aws_security_group_rule" "ingress_https" {
        security_group_id = aws_security_group.sg.id
        type = "ingress"
        from_port   = "${var.ingress_rules[2].from_port}"
        to_port     = "${var.ingress_rules[2].to_port}"
        protocol    = "${var.ingress_rules[2].protocol}"
        cidr_blocks = "${var.ingress_rules[2].cidr_blocks}"
  }

resource "aws_security_group_rule" "egress" {
        security_group_id = aws_security_group.sg.id
        type = "egress"
        from_port   = "${var.egress_rules[0].from_port}"
        to_port     = "${var.egress_rules[0].to_port}"
        protocol    = "${var.egress_rules[0].protocol}"
        cidr_blocks = "${var.egress_rules[0].cidr_blocks}"
}
