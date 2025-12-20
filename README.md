# Bub-It

A modern URL shortener application built with Next.js, Tailwind CSS, and TypeScript.

## Features

- **Shorten URLs**: Create short, memorable links from long URLs
- **Custom URLs**: Optionally set custom short codes for your URLs
- **QR Codes**: Auto-generate QR codes for each shortened URL
- **Analytics**: Track clicks, referrers, user agents, and geographic data
- **User Authentication**: Secure email-based verification and login
- **Dashboard**: View and manage all your shortened URLs in one place

## Tech Stack

- **Frontend**: Next.js 16+, React, TypeScript
- **Styling**: Tailwind CSS, Sass
- **State Management**: TanStack React Query
- **Icons**: React Icons
- **HTTP Client**: Custom `apiFetch` wrapper

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/moyinoluwa-10/bub-it.git
cd bub-it
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables (create a `.env.local` file):
```
NEXT_PUBLIC_API_URL=your_api_url
NEXTAUTH_URL=your_app_url
NEXTAUTH_DEBUG=true
NEXTAUTH_SECRET=your_nextauth_secret
```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
src/
├── app/              # Next.js app directory
├── components/       # React components
│   ├── auth/        # Authentication components
│   ├── layout/      # Layout components
│   └── website/     # Page components
├── lib/             # Utilities and helpers
└── assets/          # Images and SVGs
```

## Key Components

- **Auth**: Email verification and user authentication
- **URLs**: Manage and view shortened URLs with analytics
- **URL Card**: Display individual URL data and interactions

## API Integration

The app communicates with a backend API for:
- User authentication
- URL creation and management
- Analytics data retrieval

Ensure your backend returns proper HTTP status codes (200, 400, 401, 500, etc.) for error handling.

Here's the link to the API repository: [Bub-It API](https://github.com/moyinoluwa-10/bub-it-api)

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is open source and available under the MIT License.
