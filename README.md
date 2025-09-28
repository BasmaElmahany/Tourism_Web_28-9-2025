# Minya Tourism Website - Angular 17

A comprehensive tourism website for Minya, Egypt, built with Angular 17. This website showcases the rich cultural heritage and attractions of Minya with an outstanding Egyptian-themed design.

## 🌟 Features

### Core Tourism Features
- **Home Page**: Hero section with featured attractions carousel and quick actions
- **Attractions**: Comprehensive listing with grid/list views, search, and filtering
- **Attraction Details**: Detailed pages with image galleries and visitor information
- **Hotels**: Hotel listings with star ratings, amenities, and booking information
- **Restaurants**: Local cuisine and dining options (coming soon)
- **Events**: Cultural festivals and seasonal celebrations (coming soon)
- **Itineraries**: Trip planning tools (coming soon)
- **Visitor Info**: Essential travel information (coming soon)
- **Blog**: Travel stories and cultural insights (coming soon)
- **Interactive Map**: Location-based exploration (coming soon)

### Design & User Experience
- **Egyptian Heritage Theme**: Deep blue colors representing the Nile River, golden sand tones
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI Components**: Material Design-inspired interface with smooth animations
- **Professional Typography**: Poppins font family for excellent readability
- **Interactive Elements**: Hover effects, smooth transitions, and micro-interactions

### Technical Features
- **Angular 17**: Latest Angular framework with standalone components
- **TypeScript**: Type-safe development with modern JavaScript features
- **SCSS Styling**: Advanced styling with CSS variables and mixins
- **Component Architecture**: Modular, reusable components
- **Routing**: Client-side navigation with Angular Router
- **Responsive Grid**: CSS Grid and Flexbox for flexible layouts
- **Performance Optimized**: Lazy loading and optimized assets

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v17)

### Installation

1. **Clone or extract the project**
   ```bash
   cd minya-tourism-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   Navigate to `http://localhost:4200`

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 📁 Project Structure

```
src/
├── app/
│   ├── components/           # Angular components
│   │   ├── home/            # Home page component
│   │   ├── attractions/     # Attractions listing
│   │   ├── attraction-details/ # Individual attraction pages
│   │   ├── hotels/          # Hotels listing
│   │   ├── navigation/      # Navigation component
│   │   ├── footer/          # Footer component
│   │   └── splash/          # Splash screen
│   ├── models/              # TypeScript interfaces
│   ├── services/            # Data services
│   ├── app.component.ts     # Root component
│   └── app.routes.ts        # Routing configuration
├── assets/
│   └── images/              # Tourism images and icons
├── styles.scss              # Global styles
├── index.html               # Main HTML file
└── main.ts                  # Application bootstrap
```

## 🎨 Design System

### Color Palette
- **Primary**: #1A365D (Deep Blue - Nile River)
- **Secondary**: #2D5A87 (Medium Blue)
- **Accent**: #B85450 (Terracotta - Ancient pottery)
- **Golden Sand**: #D4A574 (Desert heritage)
- **Background**: #F7F5F3 (Light Cream - Papyrus)

### Typography
- **Font Family**: Poppins (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Icons**: Material Icons

### Components
- **Buttons**: Primary, Secondary, Accent variants with hover effects
- **Cards**: Elevated cards with hover animations
- **Navigation**: Responsive navigation with mobile menu
- **Forms**: Styled inputs with focus states
- **Animations**: Fade-in, slide-in, and hover effects

## 🏛️ Tourism Content

### Featured Attractions
1. **Beni Hassan Tombs**: Middle Kingdom rock-cut tombs with ancient wall paintings
2. **Tuna el-Gebel**: Greco-Roman necropolis with unique architectural blend
3. **Tell el-Amarna**: Akhenaten's ancient capital city ruins
4. **Minya Corniche**: Beautiful Nile River waterfront promenade

### Hotel Categories
- **Luxury Hotels**: 4-5 star accommodations with premium amenities
- **Mid-range Hotels**: Comfortable 3-star options with good value
- **Budget Hotels**: Affordable 2-star accommodations for budget travelers

### Cultural Highlights
- **Ancient Egyptian History**: 4,000+ years of civilization
- **Nile River Heritage**: Traditional felucca boats and river culture
- **Local Crafts**: Traditional pottery, textiles, and handicrafts
- **Authentic Cuisine**: Traditional Egyptian dishes and local specialties

## 🔧 Development

### Available Scripts
- `npm start`: Start development server
- `npm run build`: Build for production
- `npm run test`: Run unit tests
- `npm run lint`: Run linting checks

### Component Development
All components are standalone Angular 17 components with:
- TypeScript for type safety
- SCSS for styling
- Responsive design patterns
- Accessibility considerations

### Adding New Features
1. Create component: `ng generate component feature-name`
2. Add route in `app.routes.ts`
3. Update navigation in `navigation.component.ts`
4. Add data models in `tourism.models.ts`
5. Update service in `tourism.service.ts`

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px

### Mobile Features
- Touch-friendly navigation
- Optimized image sizes
- Simplified layouts
- Fast loading times

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

### Static Hosting
The built application can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Firebase Hosting

### Build Optimization
- Tree shaking for smaller bundle sizes
- Lazy loading for improved performance
- Image optimization
- CSS minification
- JavaScript compression

## 📊 Performance

### Optimization Features
- Lazy loading of images
- Component-based architecture
- Efficient change detection
- Optimized bundle sizes
- Fast loading animations

### SEO Considerations
- Semantic HTML structure
- Meta tags for social sharing
- Structured data markup
- Fast loading times
- Mobile-friendly design

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Egyptian Tourism Authority** for cultural information
- **Google Fonts** for typography
- **Material Icons** for iconography
- **Angular Team** for the excellent framework
- **Minya Governorate** for tourism content inspiration

## 📞 Support

For questions or support, please contact:
- Email: info@minya-tourism.com
- Website: https://minya-tourism.com
- Phone: +20 86 xxx-xxxx

---

**Built with ❤️ for Minya Tourism - Discover Ancient Egypt's Hidden Treasures**
