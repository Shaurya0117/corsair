
import { z } from 'zod';

export const JobSchema = z.object({
	id: z.string(),
	status: z.string().optional(),
	created_on: z.string().optional(),
	completed_on: z.string().optional(),
	name: z.string().optional(),
	type: z.string().optional(),
});

export const SubmitJobInputSchema = z.object({
	media_url: z.string().url(),
	metadata: z.string().optional(),
	language: z.string().optional(),
});

export const GetJobInputSchema = z.object({
	id: z.string(),
});

export const GetTranscriptInputSchema = z.object({
	id: z.string(),
	accept: z.enum(['application/vnd.rev.transcript.v1.0+json', 'text/plain']).default('application/vnd.rev.transcript.v1.0+json'),
});

export type SubmitJobInput = z.infer<typeof SubmitJobInputSchema>;
export type GetJobInput = z.infer<typeof GetJobInputSchema>;
export type GetTranscriptInput = z.infer<typeof GetTranscriptInputSchema>;
export type JobResponse = z.infer<typeof JobSchema>;
export type TranscriptResponse = any;

export type RevAIEndpointInputs = {
	submitJob: SubmitJobInput;
	getJob: GetJobInput;
	getTranscript: GetTranscriptInput;
};

export type RevAIEndpointOutputs = {
	submitJob: JobResponse;
	getJob: JobResponse;
	getTranscript: TranscriptResponse;
};

export const RevAIEndpointInputSchemas = {
	submitJob: SubmitJobInputSchema,
	getJob: GetJobInputSchema,
	getTranscript: GetTranscriptInputSchema,
} as const;

export const RevAIEndpointOutputSchemas = {
	submitJob: JobSchema,
	getJob: JobSchema,
	getTranscript: z.any(),
} as const;
