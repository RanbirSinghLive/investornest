# 🚀 Complete Vercel Deployment Guide for InvestOrNest

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Deployment Methods](#deployment-methods)
3. [Configuration](#configuration)
4. [Post-Deployment](#post-deployment)
5. [Advanced Features](#advanced-features)
6. [Troubleshooting](#troubleshooting)
7. [Best Practices](#best-practices)

---

## Prerequisites

### 1. Vercel Account Setup

**Option A: Sign up with GitHub (Recommended)**
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub account

**Option B: Sign up with Email**
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Enter your email and create password
4. Verify your email

### 2. Install Vercel CLI (Optional but Recommended)

```bash
npm i -g vercel
# or
npm install -g vercel
```

Verify installation:
```bash
vercel --version
```

### 3. Verify Your Project

Ensure your project builds successfully:
```bash
npm run build
```

Check that `out/` directory is created (for static export).

---

## Deployment Methods

### Method 1: GitHub Integration (Recommended for Continuous Deployment)

This is the **best method** for production as it automatically deploys on every push.

#### Step 1: Push to GitHub

Ensure your code is on GitHub:
```bash
# If not already pushed
git remote -v  # Check if remote exists
git push origin main
```

#### Step 2: Import Project in Vercel

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "Add New..." → "Project"

2. **Import from GitHub**
   - Select your GitHub account
   - Find `investornest` repository
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `out` (for static export)
   - **Install Command**: `npm install` (auto-detected)

4. **Environment Variables**
   - For this project: **None required** (all client-side)
   - Click "Deploy" without adding any

5. **Deploy**
   - Click "Deploy"
   - Wait 1-3 minutes for build to complete
   - Your site will be live at `investornest.vercel.app`

#### Step 3: Automatic Deployments

- **Every push to `main` branch** → Production deployment
- **Pull requests** → Preview deployments (optional)
- **Other branches** → Preview deployments

---

### Method 2: Vercel CLI (Quick Deploy)

Best for quick testing or one-off deployments.

#### Step 1: Login to Vercel

```bash
vercel login
```

Choose your preferred login method (browser or email).

#### Step 2: Deploy

**First Deployment:**
```bash
cd /Users/ranbirsingh/Documents/Programming/investornest
vercel
```

You'll be prompted:
- **Set up and deploy?** → `Y`
- **Which scope?** → Select your account/team
- **Link to existing project?** → `N` (first time)
- **Project name?** → `investornest` (or press Enter for default)
- **Directory?** → `./` (press Enter)
- **Override settings?** → `N` (Vercel auto-detects Next.js)

**Subsequent Deployments:**
```bash
vercel  # Deploys to preview
vercel --prod  # Deploys to production
```

#### Step 3: Verify Deployment

After deployment, you'll get:
- **Preview URL**: `https://investornest-xxxxx.vercel.app`
- **Production URL**: `https://investornest.vercel.app`

---

### Method 3: Vercel Dashboard (Manual Upload)

Not recommended for production, but useful for testing.

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Click "Browse" and select your project folder
4. Configure settings (same as Method 1)
5. Deploy

---

## Configuration

### 1. Vercel Configuration File (Optional)

Create `vercel.json` in project root for advanced configuration:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "out",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/about",
      "destination": "/about"
    }
  ]
}
```

**Note**: For static export, most of this is auto-detected. Only add if you need custom headers or rewrites.

### 2. Project Settings in Vercel Dashboard

After deployment, configure in Dashboard → Project → Settings:

#### General Settings
- **Project Name**: `investornest`
- **Framework Preset**: Next.js
- **Root Directory**: `./`
- **Build Command**: `npm run build`
- **Output Directory**: `out`
- **Install Command**: `npm install`

#### Build & Development Settings
- **Node.js Version**: `20.x` (or latest LTS)
- **Environment Variables**: None needed (all client-side)

#### Git Settings
- **Production Branch**: `main`
- **Preview Deployments**: Enabled
- **Automatic Deployments**: Enabled

---

## Post-Deployment

### 1. Verify Deployment

**Check Your Live Site:**
1. Visit your deployment URL (e.g., `https://investornest.vercel.app`)
2. Test all features:
   - Input sliders work
   - Calculations run
   - Charts display
   - Mobile responsive
   - No console errors

**Check Build Logs:**
1. Go to Vercel Dashboard → Your Project → Deployments
2. Click on latest deployment
3. Review "Build Logs" for any warnings

### 2. Custom Domain Setup

#### Step 1: Add Domain in Vercel

1. Go to Project → Settings → Domains
2. Click "Add Domain"
3. Enter your domain (e.g., `investornest.ca`)
4. Click "Add"

#### Step 2: Configure DNS

Vercel will show you DNS records to add:

**For Root Domain (investornest.ca):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For WWW (www.investornest.ca):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**For Subdomain (app.investornest.ca):**
```
Type: CNAME
Name: app
Value: cname.vercel-dns.com
```

#### Step 3: Update DNS at Your Registrar

1. Log into your domain registrar (GoDaddy, Namecheap, etc.)
2. Go to DNS Management
3. Add the records Vercel provided
4. Wait 24-48 hours for DNS propagation

#### Step 4: SSL Certificate

- Vercel automatically provisions SSL certificates
- HTTPS is enabled automatically
- No additional configuration needed

### 3. Environment Variables (If Needed Later)

If you add features requiring environment variables:

1. Go to Project → Settings → Environment Variables
2. Add variables:
   - **Name**: `NEXT_PUBLIC_ANALYTICS_ID`
   - **Value**: `your-analytics-id`
   - **Environment**: Production, Preview, Development
3. Redeploy for changes to take effect

**Note**: For this project, no environment variables are needed.

---

## Advanced Features

### 1. Preview Deployments

**Automatic Preview URLs:**
- Every PR gets a unique preview URL
- Example: `https://investornest-git-feature-branch.vercel.app`
- Perfect for testing before merging

**Manual Preview:**
```bash
vercel  # Creates preview deployment
```

### 2. Branch Protection

1. Go to Project → Settings → Git
2. Enable "Production Branch Protection"
3. Requires PR approval before production deploy

### 3. Deployment Hooks

Set up webhooks for notifications:

1. Go to Project → Settings → Git
2. Scroll to "Deployment Hooks"
3. Add webhook URL (Slack, Discord, etc.)
4. Get notified on every deployment

### 4. Analytics (Optional)

**Vercel Analytics:**
1. Go to Project → Analytics
2. Enable "Web Analytics"
3. View page views, performance metrics

**Or use Plausible (Privacy-friendly):**
1. Sign up at [plausible.io](https://plausible.io)
2. Add script to `app/layout.tsx`:
```tsx
<Script
  defer
  data-domain="investornest.ca"
  src="https://plausible.io/js/script.js"
/>
```

### 5. Performance Monitoring

**Vercel Speed Insights:**
1. Go to Project → Speed Insights
2. Enable "Speed Insights"
3. View Core Web Vitals, performance scores

### 6. Edge Functions (Not Needed for Static Export)

Since you're using static export, Edge Functions aren't available. If you need server-side features later, remove `output: 'export'` from `next.config.js`.

---

## Troubleshooting

### Issue 1: Build Fails

**Error**: "Build failed" or TypeScript errors

**Solution**:
```bash
# Test build locally first
npm run build

# Fix any errors
# Then redeploy
vercel --prod
```

### Issue 2: 404 Errors on Routes

**Error**: Routes return 404 after deployment

**Solution**: 
- For static export, ensure `trailingSlash: true` in `next.config.js` ✅ (already set)
- Check that all pages are in `app/` directory
- Verify `out/` directory contains all routes

### Issue 3: Assets Not Loading

**Error**: Images, CSS, or JS files return 404

**Solution**:
- Ensure `images: { unoptimized: true }` in `next.config.js` ✅ (already set)
- Check that all assets are in `public/` directory
- Verify build completed successfully

### Issue 4: Environment Variables Not Working

**Error**: Environment variables undefined

**Solution**:
- For client-side: Use `NEXT_PUBLIC_` prefix
- Add in Vercel Dashboard → Settings → Environment Variables
- Redeploy after adding variables

### Issue 5: Slow Builds

**Error**: Builds take > 5 minutes

**Solution**:
- Check build logs for bottlenecks
- Consider upgrading Vercel plan (Hobby is fine for most)
- Optimize dependencies (remove unused packages)

### Issue 6: Domain Not Working

**Error**: Domain shows "Not Found" or doesn't resolve

**Solution**:
1. Check DNS records are correct
2. Wait 24-48 hours for DNS propagation
3. Verify domain is added in Vercel Dashboard
4. Check SSL certificate status (should be automatic)

---

## Best Practices

### 1. Git Workflow

**Recommended Branch Strategy:**
```
main (production)
  └── feature/new-feature (preview)
  └── bugfix/fix-calculation (preview)
```

- Work on feature branches
- Create PRs for review
- Preview deployments test changes
- Merge to `main` → Production deployment

### 2. Deployment Checklist

Before deploying to production:
- [ ] `npm run build` succeeds locally
- [ ] `npm run lint` passes
- [ ] Test on preview deployment
- [ ] Check mobile responsiveness
- [ ] Verify all features work
- [ ] No console errors
- [ ] Performance is acceptable

### 3. Monitoring

**Set Up Alerts:**
1. Go to Project → Settings → Notifications
2. Enable email notifications for:
   - Failed deployments
   - Successful deployments
   - Domain issues

### 4. Performance Optimization

**Already Optimized:**
- ✅ Static export (fastest)
- ✅ Client-side calculations (no server latency)
- ✅ Code splitting (Next.js automatic)
- ✅ Image optimization disabled (for static export)

**Future Optimizations:**
- Add service worker for offline support
- Implement code splitting for large components
- Lazy load charts (if needed)

### 5. Security

**Already Secure:**
- ✅ No server-side code (no attack surface)
- ✅ No API keys or secrets
- ✅ All data stays client-side
- ✅ HTTPS automatically enabled

**Additional Security Headers** (optional):
Add to `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
        }
      ]
    }
  ]
}
```

### 6. Cost Management

**Vercel Hobby Plan (Free):**
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Custom domains
- ✅ SSL certificates
- ✅ Preview deployments
- ✅ Perfect for this project

**When to Upgrade:**
- Need > 100GB bandwidth/month
- Need team collaboration
- Need advanced analytics

---

## Quick Reference Commands

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View deployments
vercel ls

# View logs
vercel logs

# Remove deployment
vercel remove

# Link to existing project
vercel link

# Unlink project
vercel unlink
```

---

## Deployment Workflow Summary

### First Time Setup:
1. ✅ Push code to GitHub
2. ✅ Import project in Vercel Dashboard
3. ✅ Configure build settings (auto-detected)
4. ✅ Deploy
5. ✅ Add custom domain (optional)
6. ✅ Verify deployment

### Ongoing:
1. ✅ Push to `main` → Auto-deploy to production
2. ✅ Create PR → Auto-deploy preview
3. ✅ Monitor deployments in dashboard
4. ✅ Check analytics (if enabled)

---

## Support Resources

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Deployment**: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- **Vercel Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
- **Status Page**: [vercel-status.com](https://vercel-status.com)

---

## Your Project-Specific Notes

**Current Configuration:**
- ✅ Static export (`output: 'export'`)
- ✅ Images unoptimized (required for static export)
- ✅ Trailing slash enabled
- ✅ No environment variables needed
- ✅ No API routes
- ✅ All calculations client-side

**Deployment Settings:**
- **Build Command**: `npm run build`
- **Output Directory**: `out`
- **Framework**: Next.js 16
- **Node Version**: 20.x (auto)

**Ready to Deploy!** 🚀

