# Ambika Kapoor Makeup Studio - GCP Deployment

This directory contains everything needed to deploy the Ambika Kapoor makeup studio website to Google Cloud Platform.

## 📁 Structure

```
ak/
├── terraform/
│   ├── main.tf                    # Main infrastructure configuration
│   ├── variables.tf               # Variable definitions
│   ├── outputs.tf                 # Output definitions
│   ├── terraform.tfvars.example   # Example variables (copy to .tfvars)
│   └── .gitignore                 # Terraform gitignore
│
├── deploy.sh                      # Deployment script
├── update.sh                      # Update script
├── GCP_DEPLOYMENT_GUIDE.md       # Complete deployment guide
├── GCP_QUICK_START.md            # 10-minute quick start
└── README_GCP.md                 # This file
```

## 🚀 Quick Start

### Option 1: Automated Deployment (Recommended)

```bash
# 1. Configure variables
cp terraform/terraform.tfvars.example terraform/terraform.tfvars
nano terraform/terraform.tfvars  # Update with your GCP project ID

# 2. Deploy
./deploy.sh

# 3. Configure DNS with the provided IP address
```

### Option 2: Manual Terraform

```bash
cd terraform

# Initialize
terraform init

# Plan
terraform plan

# Apply
terraform apply

# Upload files
cd ..
gsutil -m rsync -r . gs://BUCKET_NAME/
```

## 🌐 Deployment Details

**Domain:** artisansinfotech.com/project/ambikakapoorts

**Infrastructure:**
- Cloud Storage bucket (static files)
- Global Load Balancer (HTTPS/SSL)
- Cloud CDN (caching)
- Cloud Armor (security)

**Free Tier:**
- 5 GB storage (free)
- 1 GB egress (free)
- Load Balancer (~$18/month)
- Total: ~$19-20/month

## 🔧 Configuration

### terraform.tfvars

Required variables:

```hcl
project_id  = "your-gcp-project-id"
region      = "us-central1"
domain_name = "artisansinfotech.com"
```

### Resources Created

1. **google_storage_bucket.website**
   - Static file hosting
   - Public read access
   - CORS configured

2. **google_compute_backend_bucket.website_backend**
   - Links storage to load balancer
   - CDN enabled
   - Cache policy configured

3. **google_compute_url_map.website_url_map**
   - Routes /project/ambikakapoorts to backend
   - Domain: artisansinfotech.com

4. **google_compute_global_address.website_ip**
   - Static external IP
   - For DNS configuration

5. **google_compute_managed_ssl_certificate.website_ssl**
   - Auto-provisioned SSL
   - Domain: artisansinfotech.com

6. **google_compute_security_policy.website_policy**
   - Rate limiting
   - DDoS protection

## 📝 Common Operations

### Deploy Initial Infrastructure

```bash
./deploy.sh
```

### Update Website Files

```bash
./update.sh
```

### View Terraform Outputs

```bash
cd terraform
terraform output
```

### Check Deployment Status

```bash
# SSL certificate
gcloud compute ssl-certificates describe ambikakapoor-ssl-cert --global

# Load balancer
gcloud compute url-maps describe ambikakapoor-url-map

# Bucket
gsutil ls -L gs://$(cd terraform && terraform output -raw bucket_name)
```

### Manual File Upload

```bash
# Get bucket name
BUCKET=$(cd terraform && terraform output -raw bucket_name)

# Upload single file
gsutil cp index.html gs://$BUCKET/

# Upload directory
gsutil -m rsync -r images/ gs://$BUCKET/images/

# Set cache headers
gsutil setmeta -h "Cache-Control:public,max-age=3600" gs://$BUCKET/styles.css
```

### Clear CDN Cache

```bash
gcloud compute url-maps invalidate-cdn-cache ambikakapoor-url-map --path "/*"
```

## 🔍 Troubleshooting

### DNS Not Resolving

```bash
# Check DNS
nslookup artisansinfotech.com

# Should return the IP from terraform output
cd terraform && terraform output website_ip_address
```

### SSL Certificate Not Active

```bash
# Check status
gcloud compute ssl-certificates describe ambikakapoor-ssl-cert --global

# Common statuses:
# - PROVISIONING: Wait 10-15 minutes
# - FAILED_NOT_VISIBLE: Check DNS configuration
# - ACTIVE: Ready to use
```

### 404 Errors

```bash
# Verify files in bucket
BUCKET=$(cd terraform && terraform output -raw bucket_name)
gsutil ls gs://$BUCKET/

# Re-upload
./update.sh
```

### High Costs

```bash
# Check billing
gcloud billing accounts list
gcloud billing budgets list --billing-account=ACCOUNT_ID

# Set budget alert
gcloud billing budgets create \
  --billing-account=ACCOUNT_ID \
  --display-name="Website Budget" \
  --budget-amount=25USD
```

## 📊 Monitoring

### Set Up Monitoring

```bash
# Create uptime check
gcloud monitoring uptime-configs create ambikakapoor-uptime \
  --display-name="Ambika Kapoor Website" \
  --resource-type=uptime-url \
  --monitored-resource-labels=host=artisansinfotech.com,path=/project/ambikakapoorts

# List uptime checks
gcloud monitoring uptime-configs list
```

### View Logs

```bash
# Load balancer logs
gcloud logging read "resource.type=http_load_balancer" --limit 50 --format=json

# Storage access logs
gcloud logging read "resource.type=gcs_bucket" --limit 50

# Error logs
gcloud logging read "severity>=ERROR" --limit 20
```

## 🔒 Security

### Rate Limiting

Default: 100 requests per minute per IP

Update in `terraform/main.tf`:
```hcl
rate_limit_threshold {
  count        = 100  # Adjust this
  interval_sec = 60
}
```

### IP Blocking

Add to security policy in `terraform/main.tf`:
```hcl
rule {
  action   = "deny(403)"
  priority = "500"
  match {
    versioned_expr = "SRC_IPS_V1"
    config {
      src_ip_ranges = ["1.2.3.4/32"]  # Block specific IP
    }
  }
  description = "Block malicious IP"
}
```

Apply changes:
```bash
cd terraform
terraform apply
```

## 🗑️ Cleanup

### Destroy Infrastructure

```bash
cd terraform
terraform destroy
```

This will:
- Delete load balancer
- Delete SSL certificate
- Delete storage bucket and all files
- Release IP address
- Remove all resources

⚠️ **This is permanent and cannot be undone!**

### Partial Cleanup

```bash
# Remove only specific resources
terraform destroy -target=google_compute_security_policy.website_policy
```

## 📚 Documentation

- **GCP_QUICK_START.md** - 10-minute deployment guide
- **GCP_DEPLOYMENT_GUIDE.md** - Comprehensive guide
- **terraform/** - Infrastructure as code

## 🎯 Next Steps

After successful deployment:

1. ✅ Configure DNS A record
2. ✅ Wait for SSL certificate (10-15 min)
3. ✅ Test website: https://artisansinfotech.com/project/ambikakapoorts
4. ✅ Set up monitoring alerts
5. ✅ Configure budget alerts
6. ✅ Submit to Google Search Console
7. ✅ Enable Google Analytics
8. ✅ Set up payment gateway (see PAYMENT_INTEGRATION_GUIDE.md)

## 💡 Tips

**Cost Optimization:**
- Use Cloud CDN (included)
- Optimize images before upload
- Set proper cache headers
- Monitor bandwidth usage

**Performance:**
- Enable Cloud CDN (already configured)
- Use compressed assets
- Optimize image sizes
- Leverage browser caching

**Security:**
- Enable Cloud Armor (already configured)
- Set up rate limiting
- Monitor access logs
- Use strong SSL/TLS settings

## 🔗 Useful Links

- [GCP Console](https://console.cloud.google.com)
- [Terraform Google Provider](https://registry.terraform.io/providers/hashicorp/google/latest)
- [Cloud Storage Docs](https://cloud.google.com/storage/docs)
- [Load Balancing Docs](https://cloud.google.com/load-balancing/docs)

## 📞 Support

**GCP Issues:**
- Console: https://console.cloud.google.com
- Support: https://cloud.google.com/support
- Community: https://www.googlecloudcommunity.com

**Terraform Issues:**
- Docs: https://www.terraform.io/docs
- Registry: https://registry.terraform.io

**Website Issues:**
- Check logs: `gcloud logging read`
- Check status: Terraform outputs
- Review documentation in this directory

---

**Ready to deploy? Run `./deploy.sh`**

**Questions? Check GCP_DEPLOYMENT_GUIDE.md**

**Updates? Run `./update.sh`**
