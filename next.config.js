/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images:{domains:["image.tmdb.org"]},
  async rewrites () {return([{
    source:`/movie/all`,
    destination:`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.APP_KEY}`
  },
  {
    source:`/movie/:id`,
    destination:`https://api.themoviedb.org/3/movie/:id?api_key=${process.env.APP_KEY}` 
  }
])}
}

module.exports = nextConfig
