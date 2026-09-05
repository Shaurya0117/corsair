
import { logEventFromContext } from 'corsair/core';
import type { RevAIEndpoints } from '..';
import type { RevAIEndpointOutputs } from './types';
import { makeRevAIRequest } from '../client';

export const submitJob: RevAIEndpoints['submitJob'] = async (ctx, input) => {
	const response = await makeRevAIRequest<RevAIEndpointOutputs['submitJob']>(
		'/jobs',
		ctx.key,
		{ method: 'POST', body: input },
	);
	await logEventFromContext(ctx, 'revai.jobs.submit', { ...input }, 'completed');
	return response;
};

export const getJob: RevAIEndpoints['getJob'] = async (ctx, input) => {
	const response = await makeRevAIRequest<RevAIEndpointOutputs['getJob']>(
		`/jobs/${input.id}`,
		ctx.key,
		{ method: 'GET' },
	);
	await logEventFromContext(ctx, 'revai.jobs.get', { ...input }, 'completed');
	return response;
};

export const getTranscript: RevAIEndpoints['getTranscript'] = async (ctx, input) => {
	const response = await makeRevAIRequest<RevAIEndpointOutputs['getTranscript']>(
		`/jobs/${input.id}/transcript`,
		ctx.key,
		{ 
            method: 'GET',
            headers: { 'Accept': input.accept || 'application/vnd.rev.transcript.v1.0+json' }
        },
	);
	await logEventFromContext(ctx, 'revai.jobs.getTranscript', { ...input }, 'completed');
	return response;
};
