# 🚀 Vercel Deployment Guide - JOJOFX Trading Bot Frontend

## Pre-Deployment Checklist

✅ **Build Status**: All checks passed
- ✓ TypeScript compilation - No errors
- ✓ ESLint check - No warnings
- ✓ Next.js build - Successful
- ✓ Environment configuration - Ready

## Environment Variables Required

Before deploying to Vercel, ensure these environment variables are set in your Vercel project dashboard:

### Required Variables:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_API_BASE_URL=https://your-backend-api.com
```

**Note**: All `NEXT_PUBLIC_*` variables are public and safe to expose to the browser.

## Step-by-Step Deployment

### 1. Connect Your Repository to Vercel
```bash
1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import your GitHub/GitLab repository
4. Select the "frontend" folder as the root directory
```

### 2. Configure Environment Variables
```
1. In Vercel project settings, go to "Settings" → "Environment Variables"
2. Add all three variables listed above
3. Ensure variables are added to all environments (Production, Preview, Development)
```

### 3. Configure Build Settings
```
Build Command:     npm run build
Output Directory:  .next
Install Command:   npm install
```

### 4. Deploy
```
1. Click "Deploy" button
2. Wait for build to complete (typically 2-3 minutes)
3. Your app will be live at your Vercel URL
```

## Post-Deployment Testing

### Test These Routes:
- [ ] Home page: `/`
- [ ] Dashboard: `/dashboard`
- [ ] How It Works: `/how-it-works`
- [ ] Health check: `/api/health`

### Test These Features:
- [ ] Navigation works correctly
- [ ] Carousel auto-rotates on home page
- [ ] Live Signals button redirects to dashboard
- [ ] All images load (logo)
- [ ] Responsive design on mobile

## Backend API Configuration

**Important**: Update `NEXT_PUBLIC_API_BASE_URL` to point to your production backend:

```env
# Example production backend URL:
NEXT_PUBLIC_API_BASE_URL=https://api.jojofx.com
```

## Troubleshooting

### Build Fails?
1. Check all required environment variables are set
2. Verify Next.js version compatibility (currently 14.2.35)
3. Clear build cache and retry

### API Calls Fail?
1. Verify `NEXT_PUBLIC_API_BASE_URL` is correct
2. Check CORS headers on backend
3. Ensure backend is accessible from Vercel

### Static Assets Not Loading?
1. Verify logo.png exists in `public/` folder
2. Check image paths are relative to public folder
3. Clear Vercel cache and redeploy

## Performance Metrics

Current build produces:
- Home Page: 98.2 KB
- Dashboard: 115 KB
- How It Works: 88.7 KB
- First Load JS (shared): 87.3 KB

## Recommended Vercel Settings

1. **Framework**: Next.js (auto-detected)
2. **Node Version**: 18.x or higher
3. **Edge Middleware**: Disabled (not needed)
4. **Analytics**: Enable for performance monitoring
5. **Serverless Functions**: Enabled for API routes

## Continuous Deployment

After initial deployment:
1. Any push to your main branch automatically deploys
2. Pull requests create preview deployments
3. Monitor deployments in Vercel Dashboard

## Support & Rollback

### Monitor Deployments:
- Go to Vercel Dashboard → Deployments
- View build logs, metrics, and analytics
- Rollback to previous deployment if issues occur

### Need to Rollback?
1. Vercel Dashboard → Deployments
2. Find previous working deployment
3. Click "Redeploy"

---

**Ready to Deploy?** 🎉  
Follow the steps above and your JOJOFX Trading Bot will be live!

For more help: https://vercel.com/docs/frameworks/nextjs
