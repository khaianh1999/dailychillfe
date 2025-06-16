// serverMiddleware/sitemap.js
const axios = require('axios');

module.exports = async function (req, res, next) {
  if (req.url !== '/sitemap.xml') return next();

  const hostname = process.env.DOMAIN?.replace(/\/$/, '') || 'https://dailychill.vn';
  const apiURL = process.env.DOMAIN_API?.replace(/\/$/, '') || 'http://103.159.51.131:3001';
  const limit = 50;

  let page = 1;
  let totalPages = 1;
  const urls = [];

  try {
    do {
      const response = await axios.get(`${apiURL}/articles?limit=${limit}&page=${page}`);
      const data = response.data.data || [];
      const meta = response.data.meta || {};
      totalPages = meta.last_page || 1;

      data.forEach(article => {
        urls.push(`
  <url>
    <loc>${hostname}/detail/${article.id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
      });

      page++;
    } while (page <= totalPages);

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${hostname}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${urls.join('\n')}
</urlset>`;

    res.setHeader('Content-Type', 'application/xml');
    res.end(sitemap);
  } catch (error) {
    console.error('Lỗi tạo sitemap:', error.message);
    res.statusCode = 500;
    res.end('Lỗi tạo sitemap');
  }
};
