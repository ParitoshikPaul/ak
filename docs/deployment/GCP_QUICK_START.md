# 🚀 GCP Quick Start - 10 Minutes to Live

Deploy Ambika Kapoor website to Google Cloud Platform in 10 minutes.

## Prerequisites (2 minutes)

1. **Install gcloud CLI:**
   ```bash
   # macOS
   brew install --cask google-cloud-sdk

   # Verify
   gcloud --version
   ```

2. **Install Terraform:**
   ```bash
   # macOS
   brew install terraform

   # Verify
   terraform --version
   ```

3. **Create GCP Account:**
   - Go to https://console.cloud.google.com
   - Sign up ($300 free credit)

## Deployment Steps (8 minutes)

### 1. Create GCP Project (2 min)

```bash
# Login to GCP
gcloud auth login

# Create project
gcloud projects create ambikakapoor-website-$(date +%s) --name="Ambika Kapoor Website"

# Set project (use the ID from above)
gcloud config set project YOUR_PROJECT_ID

# Enable billing (required)
# Go to: https://console.cloud.google.com/billing
# Link your project to billing account
```

### 2. Configure Variables (1 min)

```bash
cd /Users/apple/Projects/ak

# Copy example
cp terraform/terraform.tfvars.example terraform/terraform.tfvars

# Edit file
nano terraform/terraform.tfvars
```

Change this line:
```
project_id = "ambikakapoor-website-YOUR_ID"
```

Save: Ctrl+X, Y, Enter

### 3. Deploy (5 min)

```bash
# Make scripts executable
chmod +x deploy.sh update.sh

# Deploy!
./deploy.sh
```

When prompted:
- Press Enter to authenticate
- Type "yes" to confirm deployment
- Wait for completion (~5 minutes)

### 4. Note IP Address

After deployment, you'll see:
```
website_ip_address = "34.120.123.456"
```

**Copy this IP address!**

### 5. Configure DNS

Go to your domain registrar (where you bought artisansinfotech.com):

**Add A Record:**
```
Type: A
Name: @
Value: 34.120.123.456  (your IP)
TTL: 3600
```

**Save and wait 5-60 minutes for DNS propagation**

## ✅ Verification

### Check DNS (after 5-10 minutes):
```bash
nslookup artisansinfotech.com
```

Should show your IP address.

### Check Website:
```
https://artisansinfotech.com/project/ambikakapoorts
```

### Check SSL Certificate:
```bash
gcloud compute ssl-certificates describe ambikakapoor-ssl-cert --global
```

Status should change from `PROVISIONING` to `ACTIVE` (takes 10-15 min after DNS).

## 🔄 Update Website

After making changes:

```bash
./update.sh
```

Done! Changes live in 1-2 minutes.

## 📊 Costs

**Monthly estimate: ~$19-20**

- Load Balancer: ~$18/month
- Storage: $0 (free tier)
- Bandwidth: ~$1-2/month (depends on traffic)

**Free tier includes:**
- 5 GB storage
- 1 GB egress/month
- 1 TB CDN cache

## 🆓 100% Free Alternative

### Use Firebase Hosting Instead:

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# When prompted:
# - Select: Create new project or use existing
# - Public directory: . (current directory)
# - Single page app: No
# - GitHub deployment: No

# Deploy
firebase deploy --only hosting
```

**Firebase Free Tier:**
- 10 GB storage
- 360 MB/day downloads
- Custom domain
- Free SSL
- **$0/month**

## 🐛 Troubleshooting

### Error: "Project not found"
```bash
# List projects
gcloud projects list

# Set correct project
gcloud config set project YOUR_PROJECT_ID
```

### Error: "Billing not enabled"
```bash
# Open billing page
gcloud alpha billing accounts list

# Go to console to enable
https://console.cloud.google.com/billing
```

### Error: "Permission denied"
```bash
# Re-authenticate
gcloud auth login

# Grant permissions
gcloud auth application-default login
```

### Website shows 404
```bash
# Check bucket files
gsutil ls gs://$(terraform output -raw bucket_name)

# Re-upload
./update.sh
```

### SSL not working
```bash
# Check certificate status
gcloud compute ssl-certificates describe ambikakapoor-ssl-cert --global

# If PROVISIONING, wait more time
# If FAILED_NOT_VISIBLE, check DNS
```

## 📞 Support

**GCP Console:**
https://console.cloud.google.com

**View Logs:**
```bash
gcloud logging read "resource.type=http_load_balancer" --limit 20
```

**View Costs:**
https://console.cloud.google.com/billing

**Documentation:**
- Full guide: `GCP_DEPLOYMENT_GUIDE.md`
- Terraform: https://registry.terraform.io/providers/hashicorp/google/latest

## 🎯 Next Steps

After deployment:

1. ✅ Test website on mobile
2. ✅ Update content/images
3. ✅ Set up Google Analytics
4. ✅ Submit to Google Search Console
5. ✅ Set up monitoring alerts
6. ✅ Enable payment gateway

## 🗑️ Destroy Everything

To remove all infrastructure:

```bash
cd terraform
terraform destroy
```

Type "yes" to confirm.

---

## 📋 Command Reference

```bash
# Deploy
./deploy.sh

# Update files
./update.sh

# View outputs
cd terraform && terraform output

# View bucket contents
gsutil ls gs://$(terraform output -raw bucket_name)

# Destroy
cd terraform && terraform destroy
```

---

**Need help? Check GCP_DEPLOYMENT_GUIDE.md for detailed instructions.**

**Questions? Open an issue or check GCP documentation.**

Good luck! 🚀
