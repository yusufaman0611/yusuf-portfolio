export const projects = [
  {
    id: 'performance',
    icon: 'fa-solid fa-graduation-cap',
    badges: ['Python', 'Scikit-learn', 'Pandas'],
    title: 'Student Performance Prediction',
    description:
      'A regression model that predicts final exam scores from study habits, attendance, and prior grades — helping identify at-risk students early.',
    results: ['91% R² on held-out test data', 'Feature importance dashboard for educators'],
    aosDelay: 0,
    codeUrl: 'https://github.com/yusufaman0611',
    liveUrl: '#projects',
    liveLabel: 'Live Preview',
    liveIcon: 'fa-solid fa-up-right-from-square',
    isLiveInternal: true
  },
  {
    id: 'house',
    icon: 'fa-solid fa-house-chimney',
    badges: ['Python', 'XGBoost', 'Matplotlib'],
    title: 'House Price Prediction',
    description:
      'Gradient-boosted regression pipeline estimating property prices from location, size, and amenities, with full outlier handling and cross-validation.',
    results: ['RMSE reduced 24% vs. baseline linear model', 'Automated feature engineering pipeline'],
    aosDelay: 80,
    codeUrl: 'https://github.com/yusufaman0611',
    liveUrl: '#projects',
    liveLabel: 'Live Preview',
    liveIcon: 'fa-solid fa-up-right-from-square',
    isLiveInternal: true
  },
  {
    id: 'segmentation',
    icon: 'fa-solid fa-users-viewfinder',
    badges: ['Python', 'K-Means', 'Seaborn'],
    title: 'Customer Segmentation',
    description:
      'Unsupervised clustering on retail transaction data to group customers by spend, frequency, and recency for targeted marketing strategy.',
    results: ['5 distinct customer personas identified', 'Silhouette score of 0.62 across clusters'],
    aosDelay: 0,
    codeUrl: 'https://github.com/yusufaman0611',
    liveUrl: '#projects',
    liveLabel: 'Live Preview',
    liveIcon: 'fa-solid fa-up-right-from-square',
    isLiveInternal: true
  },
  {
    id: 'dashboard',
    icon: 'fa-solid fa-chart-column',
    badges: ['Python', 'Plotly Dash', 'SQL'],
    title: 'Sales Dashboard',
    description:
      'An interactive analytics dashboard surfacing revenue trends, top SKUs, and regional performance from a normalized SQL sales database.',
    results: ['Live filters across 12 months of sales data', 'Query time cut from 4s to under 400ms'],
    aosDelay: 80,
    codeUrl: 'https://github.com/yusufaman0611',
    liveUrl: '#projects',
    liveLabel: 'Live Preview',
    liveIcon: 'fa-solid fa-up-right-from-square',
    isLiveInternal: true
  },
  {
    id: 'movie',
    icon: 'fa-solid fa-clapperboard',
    badges: ['Python', 'Cosine Similarity', 'Flask'],
    title: 'Movie Recommendation System',
    description:
      'Content-based and collaborative filtering hybrid engine recommending films from user rating history and metadata similarity.',
    results: ['Top-10 precision of 78% in offline evaluation', 'Served through a lightweight Flask API'],
    aosDelay: 0,
    codeUrl: 'https://github.com/yusufaman0611',
    liveUrl: '#projects',
    liveLabel: 'Live Preview',
    liveIcon: 'fa-solid fa-up-right-from-square',
    isLiveInternal: true
  },
  {
    id: 'portfolio',
    icon: 'fa-solid fa-cube',
    badges: ['Three.js', 'GSAP', 'Node.js'],
    title: 'This Portfolio',
    description:
      'A cinematic, 3D-driven personal site built from scratch — WebGL particle systems, scroll-choreographed motion, and an Express backend.',
    results: ['Custom Three.js neural network scene', '95+ target Lighthouse performance score'],
    aosDelay: 80,
    codeUrl: 'https://github.com/yusufaman0611',
    liveUrl: '#hero',
    liveLabel: "You're on it",
    liveIcon: 'fa-solid fa-arrow-up',
    isLiveInternal: false
  }
]
