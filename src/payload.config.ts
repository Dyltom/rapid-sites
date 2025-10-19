import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Import collections directly (TypeScript resolves extensions)
import { Users } from './payload/collections/Users'
import { Media } from './payload/collections/Media'
import { Pages } from './payload/collections/Pages'
import { Posts } from './payload/collections/Posts'
import { Categories } from './payload/collections/Categories'
import { Tenants } from './payload/collections/Tenants'
import { TeamMembers } from './payload/collections/TeamMembers'
import { TestimonialsCollection } from './payload/collections/TestimonialsCollection'
import { Gallery } from './payload/collections/Gallery'
import { Products } from './payload/collections/Products'
import { Newsletter } from './payload/collections/Newsletter'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Pages,
    Posts,
    Categories,
    Tenants,
    TeamMembers,
    TestimonialsCollection,
    Gallery,
    Products,
    Newsletter,
  ],
  editor: lexicalEditor({}),
  secret: process.env['PAYLOAD_SECRET'] || 'your-secret-key-here',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env['DATABASE_URL'] || '',
    },
  }),
  sharp,
  plugins: [],
})
