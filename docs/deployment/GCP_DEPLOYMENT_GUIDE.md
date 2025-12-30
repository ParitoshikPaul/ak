# GCP Deployment Guide - Ambika Kapoor Makeup Studio

Complete guide to deploying your website on Google Cloud Platform (GCP) Free Tier using Terraform.

## 🎯 What You'll Get

- ✅ **Free Tier Eligible** - Uses GCP free tier services
- ✅ **Custom Domain** - Hosted at artisansinfotech.com/project/ambikakapoorts
- ✅ **HTTPS/SSL** - Automatic SSL certificate
- ✅ **CDN** - Fast loading worldwide
- ✅ **DDoS Protection** - Cloud Armor security
- ✅ **Auto-scaling** - Handles high traffic
- ✅ **99.95% Uptime** - Google's infrastructure

## 📋 Prerequisites

### 1. Google Cloud Account
- Sign up at: https://cloud.google.com
- $300 free credit for new users
- Credit card required (won't be charged in free tier)

### 2. Install Required Tools

**Google Cloud SDK (gcloud)**
```bash
# macOS
brew install --cask google-cloud-sdk

# Or download from:
# https://cloud.google.com/sdk/docs/install
```

**Terraform**
```bash
# macOS
brew install terraform

# Or download from:
# https://www.terraform.io/downloads
```

**Verify installations:**
```bash
gcloud --version
terraform --version
```

## 🚀 Quick Start (5 Steps)

### Step 1: Create GCP Project

1. Go to https://console.cloud.google.com
2. Click "Select a project" → "New Project"
3. Project name: `ambikakapoor-website`
4. Click "Create"
5. Note your Project ID (e.g., `ambikakapoor-website-123456`)

### Step 2: Enable Billing

1. Go to https://console.cloud.google.com/billing
2. Link your project to a billing account
3. ⚠️ Don't worry - we stay within free tier limits

### Step 3: Configure Terraform Variables

```bash
cd /Users/apple/Projects/ak

# Copy the example file
cp terraform/terraform.tfvars.example terraform/terraform.tfvars

# Edit with your project ID
nano terraform/terraform.tfvars
```

Update these values:
```hcl
project_id  = "ambikakapoor-website-123456"  # Your GCP project ID
region      = "us-central1"                   # Or your preferred region
domain_name = "artisansinfotech.com"          # Your domain
```

Save and exit (Ctrl+X, then Y, then Enter)

### Step 4: Deploy to GCP

```bash
# Run the deployment script
./deploy.sh
```

The script will:
- ✅ Authenticate with GCP
- ✅ Enable required APIs
- ✅ Create Cloud Storage bucket
- ✅ Set up Load Balancer
- ✅ Configure SSL certificate
- ✅ Upload your website files
- ✅ Enable CDN

**This takes about 5-10 minutes**

### Step 5: Configure DNS

After deployment, you'll get an IP address (e.g., `34.120.123.456`)

**Update DNS for artisansinfotech.com:**

Go to your domain registrar (GoDaddy, Namecheap, etc.) and add:

```
Type: A
Host: @
Value: 34.120.123.456  (your IP from deployment)
TTL: 3600
```

**DNS propagation takes 5-60 minutes**

## 📁 Architecture

```
artisansinfotech.com/project/ambikakapoorts
                    ↓
            Load Balancer (HTTPS)
                    ↓
            Backend Bucket
                    ↓
        Cloud Storage Bucket
                    ↓
            Your Website Files
```

## 💰 Cost Breakdown (Free Tier)

| Service | Free Tier | Typical Usage | Cost |
|---------|-----------|---------------|------|
| Cloud Storage | 5 GB | ~1 MB | **$0** |
| Load Balancer | Not free | 5 rules | ~$18/month |
| Egress (Data out) | 1 GB/month | ~10 GB | ~$1.20/month |
| Cloud CDN | 1 TB cache | ~5 GB | **$0** |

**Total: ~$19-20/month**

### 💡 Free Tier Alternative

To stay 100% free, you can:
1. Use Cloud Storage website hosting only (no Load Balancer)
2. Access via: `storage.googleapis.com/bucket-name/index.html`
3. Redirect your domain to this URL

See "Alternative: Free Tier Only Deployment" section below.

## 🔧 Infrastructure Details

### What Terraform Creates:

1. **Cloud Storage Bucket**
   - Stores website files
   - Public read access
   - Configured for static website hosting

2. **Global Load Balancer**
   - HTTPS/SSL termination
   - HTTP to HTTPS redirect
   - Path-based routing
   - DDoS protection

3. **Backend Bucket**
   - Links storage bucket to load balancer
   - CDN enabled
   - Cache settings optimized

4. **SSL Certificate**
   - Auto-provisioned by Google
   - Auto-renewed
   - Free

5. **Security Policy**
   - Rate limiting (100 req/min)
   - IP-based banning
   - DDoS protection

## 📝 Common Operations

### Update Website Files

After making changes to your website:

```bash
./update.sh
```

This will:
- Upload changed files
- Update cache headers
- Clear CDN cache
- Changes live in 1-2 minutes

### Manual File Upload

```bash
# Upload single file
gsutil cp index.html gs://your-bucket-name/

# Upload all files
gsutil -m rsync -r . gs://your-bucket-name/

# Upload with cache control
gsutil -h "Cache-Control:public, max-age=3600" cp styles.css gs://your-bucket-name/
```

### View Logs

```bash
# Load balancer logs
gcloud logging read "resource.type=http_load_balancer" --limit 50

# Access logs
gcloud logging read "resource.type=gcs_bucket" --limit 50
```

### Check SSL Certificate Status

```bash
gcloud compute ssl-certificates describe ambikakapoor-ssl-cert --global
```

Status should be `ACTIVE` after DNS is configured.

### Clear CDN Cache

```bash
gcloud compute url-maps invalidate-cdn-cache ambikakapoor-url-map --path "/*"
```

## 🔍 Troubleshooting

### Website not accessible

**Check DNS:**
```bash
nslookup artisansinfotech.com
```

Should return your GCP IP address.

**Check SSL certificate:**
```bash
gcloud compute ssl-certificates describe ambikakapoor-ssl-cert --global
```

If `PROVISIONING`, wait 10-15 minutes.

### 404 Errors

**Check bucket files:**
```bash
gsutil ls gs://your-bucket-name/
```

**Re-upload files:**
```bash
./update.sh
```

### High Costs

**Check usage:**
```bash
gcloud billing accounts list
gcloud billing projects describe PROJECT_ID
```

**View costs:**
https://console.cloud.google.com/billing

### SSL Certificate Issues

Common causes:
- DNS not pointing to Load Balancer IP
- Domain validation pending (can take 24 hours)
- Certificate in PROVISIONING state

**Fix:**
1. Verify DNS is correct
2. Wait 24 hours for validation
3. Check certificate status regularly

## 🎛️ Advanced Configuration

### Custom Domain with Subdomain

To use `www.artisansinfotech.com`:

1. Update `terraform/variables.tf`:
```hcl
domain_name = "www.artisansinfotech.com"
```

2. Add DNS A record:
```
Type: A
Host: www
Value: YOUR_IP_ADDRESS
```

### Multiple Domains

Add to `terraform/main.tf` in the SSL certificate:

```hcl
managed {
  domains = [
    "artisansinfotech.com",
    "www.artisansinfotech.com"
  ]
}
```

### Custom Error Pages

Create `404.html` and upload:

```bash
gsutil cp 404.html gs://your-bucket-name/
```

Update bucket in Terraform:
```hcl
website {
  main_page_suffix = "index.html"
  not_found_page   = "404.html"
}
```

### Enhanced Security

Add to `terraform/main.tf`:

```hcl
# Block specific countries
rule {
  action   = "deny(403)"
  priority = "900"
  match {
    expr {
      expression = "origin.region_code == 'CN'"
    }
  }
  description = "Block traffic from China"
}
```

## 🆓 Alternative: Free Tier Only Deployment

To avoid Load Balancer costs:

### Option A: Direct Bucket URL

1. Deploy only the storage bucket:
```bash
cd terraform
terraform apply -target=google_storage_bucket.website
```

2. Access via:
```
https://storage.googleapis.com/BUCKET_NAME/index.html
```

3. Redirect your domain to this URL

### Option B: Firebase Hosting (Free)

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Initialize:
```bash
firebase init hosting
```

3. Deploy:
```bash
firebase deploy --only hosting
```

Firebase hosting is 100% free for:
- 10 GB storage
- 360 MB/day downloads
- Custom domains
- Free SSL

## 📊 Monitoring

### Set up Monitoring

```bash
# View uptime checks
gcloud monitoring uptime-configs list

# Create uptime check
gcloud monitoring uptime-configs create ambikakapoor-uptime \
  --display-name="Ambika Kapoor Website" \
  --resource-type=uptime-url \
  --monitored-resource-labels=host=artisansinfotech.com
```

### View Metrics

Go to: https://console.cloud.google.com/monitoring

Track:
- Request count
- Latency
- Error rates
- Bandwidth usage

## 🗑️ Cleanup / Destroy

To remove all infrastructure:

```bash
cd terraform
terraform destroy
```

This will:
- Delete Load Balancer
- Delete SSL certificate
- Delete Cloud Storage bucket
- Remove all DNS entries

⚠️ **Warning:** This is permanent!

## 📚 Additional Resources

**GCP Documentation:**
- Cloud Storage: https://cloud.google.com/storage/docs
- Load Balancing: https://cloud.google.com/load-balancing/docs
- Cloud CDN: https://cloud.google.com/cdn/docs

**Terraform:**
- Google Provider: https://registry.terraform.io/providers/hashicorp/google/latest/docs

**Support:**
- GCP Support: https://cloud.google.com/support
- Community: https://www.googlecloudcommunity.com

## ✅ Deployment Checklist

- [ ] GCP account created
- [ ] Billing enabled
- [ ] gcloud SDK installed
- [ ] Terraform installed
- [ ] Project created in GCP
- [ ] terraform.tfvars configured
- [ ] ./deploy.sh executed successfully
- [ ] IP address noted
- [ ] DNS A record added
- [ ] DNS propagated (check nslookup)
- [ ] SSL certificate active
- [ ] Website accessible via HTTPS
- [ ] All pages working
- [ ] Images loading
- [ ] Forms working
- [ ] Mobile responsive
- [ ] Monitoring set up

## 🎉 Success!

Your website is now hosted on Google Cloud Platform!

**Live URL:** https://artisansinfotech.com/project/ambikakapoorts

**To update:** `./update.sh`

**To monitor:** https://console.cloud.google.com

**Questions?** Check the troubleshooting section above.

---

**Pro Tip:** Set up a monthly budget alert in GCP to avoid unexpected charges:

```bash
# Create budget alert for $25/month
gcloud billing budgets create \
  --billing-account=BILLING_ACCOUNT_ID \
  --display-name="Ambika Kapoor Website Budget" \
  --budget-amount=25USD
```
