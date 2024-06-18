import z from 'zod'

const envSchema = z.object({
	NEXT_PUBLIC_API_URL: z.string().url(),
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
	console.log(
		'env variables not configured',
		parsedEnv.error.flatten().fieldErrors,
	)

	throw new Error('env variables not configured')
}

export const ENV = parsedEnv.data
