# Deployment Guide: Moving to abhimanyuswaroop.com

## Step 1: DNS Configuration

### If staying with GitHub Pages:
1. **Add CNAME record** in your domain registrar's DNS settings:
   ```
   Type: CNAME
   Name: @ (or leave blank)
   Value: your-github-username.github.io
   ```

2. **Add A records** for apex domain:
   ```
   Type: A
   Name: @ (or leave blank)
   Value: 185.199.108.153
   Value: 185.199.109.153
   Value: 185.199.110.153
   Value: 185.199.111.153
   ```

### If using a different hosting service:
Follow your hosting provider's DNS configuration instructions.

## Step 2: GitHub Pages Configuration (if applicable)

1. Go to your GitHub repository
2. Navigate to Settings → Pages
3. Under "Custom domain", enter: `abhimanyuswaroop.com`
4. Check "Enforce HTTPS"
5. Save the settings

## Step 3: Deploy Your Files

### Option A: GitHub Pages
1. Push all files to your GitHub repository
2. The CNAME file is already created in the repository
3. GitHub Pages will automatically deploy your site

### Option B: Other Hosting Services

#### Netlify:
1. Connect your GitHub repository to Netlify
2. Set build command: (leave empty for static site)
3. Set publish directory: `/` (root)
4. Add custom domain in Netlify dashboard

#### Vercel:
1. Connect your GitHub repository to Vercel
2. Vercel will auto-detect it's a static site
3. Add custom domain in Vercel dashboard

## Step 4: Verify Deployment

1. **Wait for DNS propagation** (up to 48 hours, usually much faster)
2. **Test your domain**: Visit `https://abhimanyuswaroop.com`
3. **Check HTTPS**: Ensure it redirects automatically
4. **Test all features**: Contact form, chatbot, etc.

## Step 5: Update Environment Variables

If you're using the chatbot backend, update your environment variables:
- `ALLOWED_ORIGINS`: Include `https://abhimanyuswaroop.com`

## Troubleshooting

### DNS Issues:
- Use tools like `nslookup abhimanyuswaroop.com` to check DNS propagation
- Check with your domain registrar's DNS checker

### HTTPS Issues:
- GitHub Pages automatically provides HTTPS
- Other services may require SSL certificate setup

### CORS Issues:
- Ensure your backend allows requests from `https://abhimanyuswaroop.com`
- Check browser console for CORS errors

## SEO Benefits

Your site now has:
- ✅ Custom domain for better branding
- ✅ Professional email addresses possible
- ✅ Better search engine ranking
- ✅ Enhanced credibility
- ✅ Full SEO optimization with structured data 