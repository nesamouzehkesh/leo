# Leonardo.Anime

A Next.js application for discovering anime and manga, built with Leonardo.AI's design aesthetic.

## 👨‍💻 Author

**Nesa Mouzehkesh** 

Built for the Leonardo.AI coding challenge. July 2025.

## ✨ Features

- 📺 **Anime Listing** - Browse anime and manga with pagination
- 🔍 **Search** - Search through anime with real-time filtering
- 👤 **Profile Persistence** - User profiles stored in cookies
- 🎨 **Leonardo.AI Design** - Purple glassy aesthetic matching Leonardo's brand

## 🚀 Getting Started

#### 🛠️ Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📝 TypeScript Organization

I followed a **hybrid approach** for type organization:

#### **Shared Types** (`/lib/definitions.ts`)
- Domain entities: `AnimeData`, `UserProfile`
- API responses: `AnimePageResponse`
- Common interfaces: `PaginationInfo`

#### **Local Types** (Component files)
- Component props: `AnimeModalProps`, `PaginationProps`
- Server actions: `ProfileState`
- Utility-specific types

**Benefits**: Single source of truth for domain types, better developer experience with co-located component types, and improved maintainability.

## 🏗️ Layout Architecture

I implemented a **layered layout strategy** for optimal component separation:

#### **Root Layout** (`/app/layout.tsx`)
- Global background elements (grid, gradients)
- Header and Footer components
- Shared across all pages

#### **Page-Specific Layouts** (`/app/animes/layout.tsx`)
- Search bar container unique to `/animes` route

#### **Home Page** (`/app/page.tsx`)
- Leonardo logo watermark (not put in Root Layout to avoid the overlapping with tiles loading skeleton at the time of page load)
- Profile form

## ⏳ Loading States

I implemented **strategic loading skeletons** for optimal user experience:

#### **Global Loading** (`/app/loading.tsx`)
- **When shown**: During server-side rendering and initial page loads. (Spinning colorful square with Leonardo logo overlay ispired by what I saw on the website!)

#### **Anime Grid Skeleton** (`/ui/animes/skeletons.tsx`)
- **When shown**: While fetching anime data on `/animes` page and while changing pages.

#### **Modal Skeleton** (`/ui/animes/skeletons.tsx`)
- **When shown**: While loading individual anime details in modal

## ⚙️ Technical Decisions

#### 🍪 Cookies vs localStorage
I chose cookies over localStorage for user profile persistence because:
- **Server-side access**: Cookies are available in middleware and server actions
- **Automatic expiration**: Built-in security with configurable expiration
- **SEO friendly**: Server-side rendering can access user data
- **Middleware integration**: Route protection works seamlessly

#### 🛡️ Middleware Implementation
Next.js middleware protects `/animes` route by checking for `user_profile` cookie:
- **Redirects to `/`** if no profile exists
- **Allows access** if valid profile cookie is present (so if you are on `/animes` and go to `/` via the profile icon click then from `/` manually enter `/animes` you can still be redirected to `/animes` and see everything because you still have your valid cookies)
- **Enables profile editing**: Users with cookies can still access `/` to edit their profile

#### 🔐 Server-Side Authentication Architecture
I implemented a **hybrid server/client architecture** for optimal performance and security:

**Server Components** (`UserProfileDisplay`):
- **Server-side rendering** - User profile reads from cookies server-side
- **No client hydration** - User info displays immediately without loading states
- **Better SEO** - User data available in initial HTML
- **Performance** - Reduced client bundle size

**Client Components** (`SignOutButton`):
- **Interactive functionality** - Handles click events and loading states
- **API integration** - Calls server-side logout endpoint
- **Error handling** - Manages failed logout attempts

**API Route** (`/api/logout`):
- **httpOnly cookies** - Prevents JavaScript access (XSS protection)
- **Server-side clearing** - Immediate middleware recognition
- **Production pattern** - Matches real-world authentication flows

#### ⚠️ Error Boundaries & Not Found
Combined global and route-specific error handling:
- **Global error boundary** (`/app/error.tsx`) catches unexpected errors
- **Route-specific errors** (`/animes/error.tsx`) handle anime-specific issues
- **Not found page** (`/app/not-found.tsx`) for 404 scenarios

## 🐛 API Limitations & Development Roadblocks

#### 🔌 AniList GraphQL API Challenges
During development, I encountered several limitations with the AniList GraphQL API that required workarounds:

##### **📄 Pagination Inconsistencies**
The API has a unique pagination behavior where `lastPage` and `total` values change dynamically:
- **Example**: Searching for "ki" returns 3 pages of results in actuality, but API shows "208" as last page
- **Impact**: Users can navigate to non-existent pages (e.g., page 4 of "ki" search)

##### **📊 Dynamic Total Count**
The API's `total` field represents the entire anime database, not filtered results:
- **Problem**: `total: 5000` for "ki" search (should be ~72 results)
- **Challenge**: Cannot calculate accurate page count for search results

##### **💥 Development Impact**
These API limitations created several development roadblocks:
- **Inconsistent UX**: Users see misleading page counts
- **Navigation issues**: Invalid page numbers in search results
- **Testing challenges**: Hard to predict API behavior across different search terms

**Example Scenario**: A user searches for "ki", sees "Page 1 of 208", clicks page 4, and gets a "page doesn't exist" error because there are only 3 pages of "ki" results in reality. This required implementing custom pagination logic to handle search vs. browse scenarios differently.

## 🚧 Development Roadmap

#### 🧪 Phase 1: Testing & Quality (Priority: High)
- [ ] Set up Jest + React Testing Library
- [ ] Add unit tests for hooks and utilities
- [ ] Component testing for forms and UI
- [ ] E2E testing with Playwright
- [ ] Add Prettier and Husky for code quality

#### ⚡ Phase 2: Performance & Monitoring (Priority: High)
- [ ] Bundle analysis and optimization
- [ ] Core Web Vitals monitoring
- [ ] Error tracking with Sentry
- [ ] API response caching
- [ ] Image optimization

#### 🎨 Phase 3: Features & UX (Priority: Medium)
- [ ] Dark/light theme switching
- [ ] Enhanced accessibility
- [ ] Mobile optimization
- [ ] Ran out of time to implement prefilling of the form with user data from cookies if they land on `/` by clicking on profile icon.
- [ ] Ran out of time to do the full in brand stayling for error pages 🥀
- [ ] Needed more time to investigate the issues related to pagination numbers and what api was returning (which I still believe is the cause) and how it also interferes with search results as I have explained above in `API Limitations & Development Roadblocks` section.

## 📸 Screenshots

### 🏠 Home Page
![Home Page](/public/screenshots/homepage.png)
*User profile form*

### 📺 Anime Grid
![Anime Grid](/public/screenshots/animes-list.png)
*Browse anime with search functionality and pagination*

### 🎬 Anime Modal
![Anime Modal](/public/screenshots/anime-modal.png)
*Detailed anime information in modal*

## 🔗 Link to project
https://leo-anime-pi.vercel.app/

