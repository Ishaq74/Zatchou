// Définition de la collection "posts" avec le schéma spécifié
import { z, defineCollection, reference} from 'astro:content';

const blog = defineCollection({
    type: 'content',
    schema: z.object({
        id: z.string().optional(),
        title: z.string(),
       // slug: z.string().optional().transform((title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')),
        excerpt: z.string(),
        date: z.date(),
        lastModified: z.string().optional(),
        author: reference('authors'), // Référence à un auteur unique de la collection `authors`
        relatedPosts: z.array(reference("posts")).optional(), // Référence à un tableau d'articles liés de la collection `blog`
        tags: z.enum([
            "technology",
            "Entretiens",
            "CV & Lettre",
            "Marque Pro",
            "Carrière",
        ]),
        imagesrc: z.string(),
        imagealt: z.string(),
        status: z.string().optional().default("draft"),
        readingTime: z.number().optional(),
        commentsEnabled: z.boolean().optional().default(true),
        featured: z.boolean().optional().default(false),
        seo: z.object({
            title: z.string().optional(),
            description: z.string().optional(),
            keywords: z.array(z.string()).optional(),
            canonicalUrl: z.string().optional()
        }).optional(),
        meta: z.object({
            likes: z.number().optional().default(0),
            views: z.number().optional().default(0),
            shares: z.number().optional().default(0)
        }).optional(),
        relatedArticles: z.array(z.string()).optional(),
        bibliography: z.array(z.object({
            title: z.string(),
            author: z.string(),
            url: z.string(),
            publisher: z.string(),
            year: z.number()
        })).optional(),
        attachments: z.array(z.object({
            fileName: z.string(),
            fileUrl: z.string(),
            fileType: z.string(),
            description: z.string().optional()
        })).optional(),
        translations: z.array(z.object({
            language: z.string(),
            url: z.string()
        })).optional()
    })
});

const authors = defineCollection({
    type: 'data',
    schema: ({image}) => z.object({
        name: z.string(),
        bio: z.string(),
        email: z.string(),
        role: z.enum(["author", "editor", "admin"]),
        avatar: image().optional(),
    })
});

export const collections = { blog, authors };
