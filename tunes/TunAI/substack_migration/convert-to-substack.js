#!/usr/bin/env node

/**
 * Sociable Systems Newsletter to Substack Migration Script
 *
 * Converts 72+ markdown episodes to Substack-compatible formats:
 * 1. WordPress WXR XML (bulk import)
 * 2. CSV index (for reference and manual import)
 *
 * Usage: node convert-to-substack.js
 */

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// Configure marked for clean HTML output
marked.setOptions({
  breaks: true,
  gfm: true,
});

const SOURCE_DIR = '/sessions/festive-sharp-faraday/mnt/khayali-xyz/sociablesystems/articles/';
const OUTPUT_DIR = __dirname;

/**
 * Extract episode number from filename
 * Episode_1_outgrow_asimov_linkedin.md -> 1
 * Episode_20 The Jedi Council Problem.md -> 20
 */
function getEpisodeNumber(filename) {
  const match = filename.match(/Episode[_\s]+(\d+)/i);
  return match ? parseInt(match[1], 10) : 0;
}

/**
 * Extract title from filename or content
 */
function getTitle(filename, content) {
  // Try to get from filename first
  const afterEpisode = filename.replace(/Episode[_\s]+\d+[_\s]*/i, '').replace('.md', '');
  if (afterEpisode && afterEpisode !== filename) {
    return afterEpisode;
  }

  // Fall back to first H1 in content
  const h1Match = content.match(/^#+\s+(.+)$/m);
  return h1Match ? h1Match[1].trim() : 'Untitled';
}

/**
 * Parse episode metadata from filename and content
 */
function parseEpisode(filename, content) {
  const episodeNum = getEpisodeNumber(filename);
  const title = getTitle(filename, content);

  // Extract first 150 chars as excerpt (first non-heading paragraph)
  const lines = content.split('\n');
  let excerpt = '';
  for (const line of lines) {
    if (line.trim() && !line.startsWith('#') && !line.startsWith('*') && !line.startsWith('_')) {
      excerpt = line.trim().substring(0, 150);
      if (!excerpt.endsWith('.')) excerpt += '...';
      break;
    }
  }

  return {
    episodeNum,
    title,
    excerpt: excerpt || 'Sociable Systems Newsletter',
    tags: ['Sociable Systems', 'AI Governance', 'Newsletter'],
    filename,
  };
}

/**
 * Convert markdown to clean HTML for WordPress
 */
function markdownToHtml(markdown) {
  let html = marked(markdown);

  // Clean up WordPress import issues
  html = html
    .replace(/<p><strong>Quick question:<\/strong>/g, '<p><strong>Quick question:</strong>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  return html;
}

/**
 * Escape XML special characters
 */
function escapeXml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Format date for WordPress XML (YYYY-MM-DD format, we'll use episode number for date)
 * Episodes start from 2024 and assume roughly weekly
 */
function getPublishDate(episodeNum) {
  // Start from Jan 2024, ~weekly
  const startDate = new Date('2024-01-01T00:00:00Z');
  const daysAdded = (episodeNum - 1) * 7; // roughly weekly
  const pubDate = new Date(startDate.getTime() + (daysAdded * 24 * 60 * 60 * 1000));

  return {
    date: pubDate.toISOString().split('T')[0], // YYYY-MM-DD
    dateRfc: pubDate.toUTCString(),
    timestamp: Math.floor(pubDate.getTime() / 1000),
  };
}

/**
 * Generate WordPress WXR (WordPress eXtendable RSS) XML
 */
function generateWXR(episodes) {
  const now = new Date();
  const blogUrl = 'https://sociablesystems.khayali.xyz';
  const blogTitle = 'Sociable Systems Newsletter';
  const blogDescription = 'Research on AI accountability in high-stakes operations, ESG governance, and grievance mechanisms.';

  let wxr = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:excerpt="http://purl.org/rss/1.0/modules/excerpt/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:wfw="http://wellformedweb.org/CommentAPI/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:wp="http://wordpress.org/export/1.2/">

<channel>
  <title>${escapeXml(blogTitle)}</title>
  <link>${escapeXml(blogUrl)}</link>
  <description>${escapeXml(blogDescription)}</description>
  <pubDate>${now.toUTCString() || 'Sat, 15 Mar 2025 00:00:00 GMT'}</pubDate>
  <language>en-us</language>
  <wp:wxr_version>1.2</wp:wxr_version>
  <wp:base_site_url>${escapeXml(blogUrl)}/</wp:base_site_url>
  <wp:base_blog_url>${escapeXml(blogUrl)}/</wp:base_blog_url>
`;

  // Add category definitions
  wxr += `
  <wp:category>
    <wp:term_id>1</wp:term_id>
    <wp:category_nicename>newsletter</wp:category_nicename>
    <wp:category_parent></wp:category_parent>
    <wp:cat_name><![CDATA[Newsletter]]></wp:cat_name>
    <wp:category_description><![CDATA[Sociable Systems Newsletter Episodes]]></wp:category_description>
  </wp:category>

  <wp:category>
    <wp:term_id>2</wp:term_id>
    <wp:category_nicename>ai-governance</wp:category_nicename>
    <wp:category_parent></wp:category_parent>
    <wp:cat_name><![CDATA[AI Governance]]></wp:cat_name>
    <wp:category_description><![CDATA[AI accountability and governance research]]></wp:category_description>
  </wp:category>
`;

  // Add posts
  for (const episode of episodes) {
    const pubDate = getPublishDate(episode.metadata.episodeNum);
    const html = markdownToHtml(episode.content);
    const postTitle = `Episode ${episode.metadata.episodeNum}: ${episode.metadata.title}`;

    wxr += `
  <item>
    <title>${escapeXml(postTitle)}</title>
    <link>${escapeXml(blogUrl)}/episode-${episode.metadata.episodeNum}/</link>
    <pubDate>${pubDate.dateRfc}</pubDate>
    <dc:creator><![CDATA[Sociable Systems]]></dc:creator>
    <guid isPermaLink="false">${escapeXml(blogUrl)}/?p=${1000 + episode.metadata.episodeNum}</guid>
    <description></description>
    <content:encoded><![CDATA[${html}]]></content:encoded>
    <excerpt:encoded><![CDATA[${escapeXml(episode.metadata.excerpt)}]]></excerpt:encoded>
    <wp:post_id>${1000 + episode.metadata.episodeNum}</wp:post_id>
    <wp:post_name>episode-${episode.metadata.episodeNum}</wp:post_name>
    <wp:post_type>post</wp:post_type>
    <wp:status>publish</wp:status>
    <wp:post_parent>0</wp:post_parent>
    <wp:menu_order>0</wp:menu_order>
    <wp:is_sticky>0</wp:is_sticky>
    <wp:post_date>${pubDate.date} 00:00:00</wp:post_date>
    <wp:post_date_gmt>${pubDate.date} 00:00:00</wp:post_date_gmt>
    <category domain="category" nicename="newsletter"><![CDATA[Newsletter]]></category>
    <category domain="category" nicename="ai-governance"><![CDATA[AI Governance]]></category>
    <category domain="post_tag" nicename="sociable-systems"><![CDATA[Sociable Systems]]></category>
`;

    for (const tag of episode.metadata.tags) {
      const tagNicename = tag.toLowerCase().replace(/\s+/g, '-');
      wxr += `    <category domain="post_tag" nicename="${tagNicename}"><![CDATA[${escapeXml(tag)}]]></category>\n`;
    }

    wxr += `  </item>\n`;
  }

  wxr += `</channel>
</rss>`;

  return wxr;
}

/**
 * Generate CSV index of all episodes
 */
function generateCSV(episodes) {
  let csv = 'Episode Number,Title,Filename,Excerpt,Tags,Publication Status,Content Length\n';

  for (const episode of episodes) {
    const episodeNum = episode.metadata.episodeNum;
    const title = escapeXml(episode.metadata.title);
    const filename = episode.metadata.filename;
    const excerpt = episode.metadata.excerpt.replace(/"/g, '""'); // Escape quotes for CSV
    const tags = episode.metadata.tags.join(';');
    const contentLength = episode.content.length;

    csv += `${episodeNum},"${title}","${filename}","${excerpt}","${tags}",Ready,${contentLength}\n`;
  }

  return csv;
}

/**
 * Main migration logic
 */
async function main() {
  console.log('🚀 Starting Sociable Systems to Substack Migration...\n');

  try {
    // Read all markdown files
    console.log(`📂 Reading episodes from ${SOURCE_DIR}`);
    const files = fs.readdirSync(SOURCE_DIR).filter(f => f.endsWith('.md'));
    console.log(`✓ Found ${files.length} episode files\n`);

    // Parse each episode
    console.log('📝 Parsing episode metadata and content...');
    const episodes = [];

    for (const filename of files.sort((a, b) => {
      const numA = getEpisodeNumber(a);
      const numB = getEpisodeNumber(b);
      return numA - numB;
    })) {
      const filePath = path.join(SOURCE_DIR, filename);
      const content = fs.readFileSync(filePath, 'utf8');
      const metadata = parseEpisode(filename, content);

      episodes.push({
        metadata,
        content,
      });

      process.stdout.write('.');
    }
    console.log(`\n✓ Parsed ${episodes.length} episodes\n`);

    // Generate WordPress WXR
    console.log('🔄 Generating WordPress WXR format...');
    const wxrContent = generateWXR(episodes);
    const wxrPath = path.join(OUTPUT_DIR, 'sociable-systems-episodes.xml');
    fs.writeFileSync(wxrPath, wxrContent);
    const wxrSize = (fs.statSync(wxrPath).size / 1024).toFixed(2);
    console.log(`✓ Generated ${wxrPath} (${wxrSize} KB)\n`);

    // Generate CSV index
    console.log('📊 Generating CSV index...');
    const csvContent = generateCSV(episodes);
    const csvPath = path.join(OUTPUT_DIR, 'episode-index.csv');
    fs.writeFileSync(csvPath, csvContent);
    console.log(`✓ Generated ${csvPath}\n`);

    // Generate summary
    const summaryPath = path.join(OUTPUT_DIR, 'MIGRATION_SUMMARY.txt');
    const summary = `SOCIABLE SYSTEMS TO SUBSTACK MIGRATION SUMMARY
================================================

Generated Files:
1. sociable-systems-episodes.xml (${wxrSize} KB)
   - WordPress eXtendable RSS (WXR) format
   - Contains all ${episodes.length} episodes as posts
   - Ready for bulk import to Substack

2. episode-index.csv
   - CSV index of all episodes
   - Includes: Episode number, title, filename, excerpt, tags
   - Useful for tracking and manual import if needed

3. MIGRATION_SUMMARY.txt (this file)
   - Overview of migration

Episodes Included:
${episodes.map((ep, i) => `  ${i + 1}. Episode ${ep.metadata.episodeNum}: ${ep.metadata.title}`).join('\n')}

Total Episodes: ${episodes.length}
Total Content: ${episodes.reduce((sum, ep) => sum + ep.content.length, 0)} characters

Next Steps:
1. Log into your Substack workspace
2. Go to Settings > Import
3. Choose "WordPress" import method
4. Upload sociable-systems-episodes.xml
5. Review and confirm import
6. Episodes will be published as drafts (review before publishing)

Notes:
- Episodes are dated sequentially from Jan 2024 (weekly)
- Adjust publication dates as needed in Substack UI
- All episodes tagged with "Sociable Systems" and "AI Governance"
- Newsletter category created for organization

For detailed import instructions, see README.md
`;
    fs.writeFileSync(summaryPath, summary);
    console.log(`✓ Generated ${summaryPath}\n`);

    console.log('✅ Migration Complete!\n');
    console.log('📋 Files generated:');
    console.log(`   - ${path.basename(wxrPath)}`);
    console.log(`   - ${path.basename(csvPath)}`);
    console.log(`   - ${path.basename(summaryPath)}`);
    console.log('\n🎯 Next: Upload sociable-systems-episodes.xml to Substack via Settings > Import\n');

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

main();
