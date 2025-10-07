# Ma Services Solution Website Assets

This folder contains all static assets for the Ma Services Solution website.

## 📁 Folder Structure

```
assets/
├── images/
│   ├── team/           # Team member photos and profile images
│   ├── services/       # Service-related images and icons
│   ├── company/        # Company logos, certificates, and branding
│   └── blog/           # Blog post images and featured images
└── README.md          # This file
```

## 📸 Image Guidelines

### File Naming Convention
- Use lowercase letters and hyphens: `team-member-name.jpg`
- Include descriptive names: `investment-consulting-hero.jpg`
- Add size suffix for multiple sizes: `logo-small.png`, `logo-large.png`

### Image Formats
- **Photos**: JPG or WebP (smaller file size)
- **Graphics/Logos**: PNG or SVG (transparent backgrounds)
- **Icons**: SVG (scalable vector graphics)

### Recommended Sizes
- **Team Photos**: 400x400px (square aspect ratio)
- **Service Icons**: 64x64px or 128x128px
- **Hero Images**: 1920x1080px (16:9 aspect ratio)
- **Blog Thumbnails**: 600x400px
- **Company Logos**: 300x100px (flexible height)

### Optimization
- Compress images for web (under 500KB per image)
- Use WebP format for better compression
- Include alt text in components for accessibility

## 🚀 Usage in Components

```typescript
// Import images in components
import teamPhoto from '../assets/images/team/alebachew-sitotaw.jpg';

// Use in JSX
<img src={teamPhoto} alt="Alebachew Sitotaw - CEO" />
```

## 📝 Adding New Images

1. Place images in the appropriate subfolder
2. Follow naming conventions
3. Optimize file size
4. Update component imports if needed
5. Test responsive display

## 🏷️ Categories

### Team Folder (`images/team/`)
- alebachew-sitotaw.jpg - CEO profile photo
- melsew-hailemariam.jpg - Deputy CEO profile photo
- tiruwork-tizazu.jpg - Head of Business Development photo
- team-group-photo.jpg - Company team photo

### Services Folder (`images/services/`)
- investment-consulting-icon.svg
- business-development-hero.jpg
- tax-customs-diagram.png
- consulting-process-infographic.jpg

### Company Folder (`images/company/`)
- ma-consulting-logo.svg
- iso-certification.png
- ethiopia-flag-icon.png
- office-building.jpg

### Blog Folder (`images/blog/`)
- business-strategy-thumbnail.jpg
- investment-tips-featured.jpg
- market-analysis-chart.png