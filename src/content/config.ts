import { z, defineCollection, reference } from "astro:content";

// Every collection must reflect Decap's config.yml collection schema
// In order to be able to optimize images with Astro built-in components, like <Image />, we first must use this image helper 
// Doc: https://docs.astro.build/en/guides/images/#images-in-content-collections

const detailsCollection = defineCollection({
	type: "data",
	schema: () =>
		z.object({
			name: z.string(),
			abbreviation: z.string(),
			email: z.string(),
			phone: z.string(),
			description: z.string(),
			link_website: z.string(),
			link_facebook: z.string(),
			link_instagram: z.string(),
			link_venmo: z.string(),
			band_video: z.string(),
			homepage_content: z.string(),
			keywords: z.array(z.string()).optional(),
		}),
});

const showsCollection = defineCollection({
	type: "content",
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			member: z.array(reference("member")),
			date: z.date(),
			tags: z.array(z.string()).optional(),
			image: image(),
			imageAlt: z.string().optional(),
		}),
});

const membersCollection = defineCollection({
	type: "content",
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			real_name: z.string().optional(),
			adjective: z.string().optional(),
			instrument: z.string().optional(),
			bio: z.string(),
			order: z.number(),
			photo: image().or(z.string()),
		}),
});

export const collections = {
	details: detailsCollection,
	show: showsCollection,
	member: membersCollection,
};