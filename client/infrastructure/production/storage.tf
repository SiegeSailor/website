#######################################
# Terraform State
#######################################
module "tf_state_s3_bucket" {
  source  = "terraform-aws-modules/s3-bucket/aws"
  version = "~> 5.9.1"

  bucket        = "${local.project}-${local.environment}-tf-state"
  force_destroy = true

  versioning = {
    status = true
  }

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true

  tags = local.shared_tags
}

#######################################
# CloudFront Logs (Optional - can be removed to save more)
#######################################
module "cloudfront_log_s3_bucket" {
  source  = "terraform-aws-modules/s3-bucket/aws"
  version = "~> 5.9.1"

  bucket        = "${local.project}-${local.environment}-cloudfront-log"
  force_destroy = true

  control_object_ownership = true
  object_ownership         = "ObjectWriter"

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true

  lifecycle_rule = [
    {
      id      = "general-expiration"
      enabled = true

      expiration = {
        days = 30 # Reduced from 90 to save storage costs
      }
    }
  ]

  tags = local.shared_tags
}
