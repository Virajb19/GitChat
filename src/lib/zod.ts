import {z} from 'zod'

export const SignUpSchema = z.object({
    username: z.string().min(3, {message: 'username must be atleast 3 letters long'}).max(10, {message: 'username cannot be more than 10 letters'}).trim(),
    email: z.string().email({message: 'Please enter a valid email'}).trim(),
    password: z.string().min(8, {message: 'Password must be atleast 8 letters long'}).max(15)
              .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/, {message: 'Password must contain atleast one special char and one number'}).trim()
})  

export const SignInSchema = z.object({
    email: z.string().email({message: 'Please enter a valid email'}).trim(),
    password: z.string().min(8, {message: 'Password must be atleast 8 letters long'}).max(15, { message: 'Password cannot exceed 15 characters'})
              .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/, {message: 'Password must contain atleast one special char and one number'}).trim()
})

const githubRepoUrl = /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+$/
const githubAccessToken = /^[a-zA-Z0-9_-]{40}$/

export const createProjectSchema = z.object({
    name: z.string().min(1, {message: 'Provide a project name'}).max(25, { message: 'Project name cannot exceed 15 letters'}).trim(),
    repoURL: z.string().regex(githubRepoUrl, { message: 'Provide a valid repo URL'}).trim(),
    githubToken: z.string().regex(githubAccessToken, { message: 'Provide a valid access token'}).trim().optional()
})

export const askQuestionSchema = z.object({
    question: z.string().trim().min(1, { message: 'Ask a question !'}).max(500)
})