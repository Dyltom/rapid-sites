import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Import collections
import {
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
} from './payload/collections'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
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
